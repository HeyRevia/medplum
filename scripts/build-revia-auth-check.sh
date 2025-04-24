#!/usr/bin/env bash

if [[ -z "${SERVER_DOCKERHUB_REPOSITORY}" ]]; then
  echo "SERVER_DOCKERHUB_REPOSITORY is missing"
  exit 1
fi

if [[ -z "${GITHUB_SHA}" ]]; then
  echo "GITHUB_SHA is missing"
  exit 1
fi

# Fail on error
set -e

# Echo commands
set -x

cat ~/.docker/config.json

docker info

# Build foomedical tarball
# The -C flag rewrites the base path from packages/app/dist/ to ./
# tar \
#   --no-xattrs \
#   -czf ./examples/foomedical/medplum-foomedical.tar.gz \
#   -C examples/foomedical/dist .

# Supply chain attestations
# See: https://docs.docker.com/scout/policy/#supply-chain-attestations
ATTESTATIONS="--provenance=true --sbom=true"

# Target platforms
PLATFORMS="--platform linux/amd64,linux/arm64"

# If this is a release, get version information
# Release is specified with a "--release" argument
IS_RELEASE=false




# Build and push foomedical Docker images
FOOMEDICAL_TAGS="--tag $FOOMEDICAL_DOCKERHUB_REPOSITORY:latest --tag $FOOMEDICAL_DOCKERHUB_REPOSITORY:$GITHUB_SHA"
if [[ "$IS_RELEASE" == "true" ]]; then
  FOOMEDICAL_TAGS="$FOOMEDICAL_TAGS --tag $FOOMEDICAL_DOCKERHUB_REPOSITORY:$FULL_VERSION --tag $FOOMEDICAL_DOCKERHUB_REPOSITORY:$MAJOR_DOT_MINOR"
fi
pushd examples/foomedical
docker buildx build $ATTESTATIONS $PLATFORMS $FOOMEDICAL_TAGS --push .
popd
