# Chainguard hardened nginx from the entitled OpenLoop catalog.
# The -dev variant ships a shell so docker-entrypoint.sh can do its runtime
# env substitution (sh + sed + find). Chainguard nginx runs as nonroot uid 65532.
FROM cgr.dev/openloophealth.com/nginx:latest-dev

# Start off as user root so we have permissions to chown
USER root

# Copy nginx configuration
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 3000;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
EOF

# Copy and extract the app tarball
ADD ./medplum-app.tar.gz /usr/share/nginx/html

# Copy the entrypoint script
COPY ./docker-entrypoint.sh /docker-entrypoint.sh

# Grant ownership of the html dir and the entrypoint to the nginx nonroot user (uid 65532)
RUN chown -R 65532:65532 /usr/share/nginx/html && \
    chown 65532:65532 /docker-entrypoint.sh && \
    chmod +x  /docker-entrypoint.sh

EXPOSE 3000

# Switch back to the 65532 UID (non-root user)
USER 65532

ENTRYPOINT ["/docker-entrypoint.sh"]
