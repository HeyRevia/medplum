

set -e

check_port() {
  local port=$1
  netstat -tuln | grep ":$port " > /dev/null
  return $?
}

start_service() {
  local name=$1
  local port=$2
  local command=$3
  local dir=$4

  echo "Checking $name service (port $port)..."
  if check_port $port; then
    echo "$name is already running on port $port"
  else
    echo "Starting $name on port $port..."
    cd $dir
    eval "$command" &
    sleep 5
    if check_port $port; then
      echo "$name started successfully"
    else
      echo "Failed to start $name"
      exit 1
    fi
  fi
}

create_tunnel() {
  local name=$1
  local port=$2
  local subdomain="medplum-$name"

  echo "Creating tunnel for $name (port $port) at $subdomain.loca.lt..."
  lt --port $port --subdomain $subdomain &
  sleep 2
  echo "Tunnel created for $name: https://$subdomain.loca.lt"
}

MEDPLUM_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd $MEDPLUM_DIR

echo "Starting Docker services (Redis and PostgreSQL)..."
if ! docker ps | grep -q "postgres\|redis"; then
  docker compose up -d
  sleep 5
  echo "Docker services started"
else
  echo "Docker services are already running"
fi

start_service "server" 8103 "npm run dev" "$MEDPLUM_DIR/packages/server"

echo "Checking server health..."
curl -s http://localhost:8103/healthcheck
echo ""

start_service "main-app" 3000 "npm run dev" "$MEDPLUM_DIR/packages/app"
start_service "provider-app" 3001 "npm run dev" "$MEDPLUM_DIR/examples/medplum-provider"
start_service "chart-app" 3002 "npm run dev" "$MEDPLUM_DIR/examples/medplum-chart-demo"
start_service "foomedical-app" 3003 "npm run dev" "$MEDPLUM_DIR/examples/foomedical"

create_tunnel "server" 8103
create_tunnel "main-app" 3000
create_tunnel "provider-app" 3001
create_tunnel "chart-app" 3002
create_tunnel "foomedical-app" 3003

echo "Tunnel password: $(curl -s https://loca.lt/mytunnelpassword)"

echo "All Medplum apps are running and accessible via localtunnel"
echo "Use the tunnel password above to access the apps"
echo ""
echo "Server: https://medplum-server.loca.lt"
echo "Main App: https://medplum-main-app.loca.lt"
echo "Provider App: https://medplum-provider-app.loca.lt"
echo "Chart Demo: https://medplum-chart-app.loca.lt"
echo "FooMedical: https://medplum-foomedical-app.loca.lt"
