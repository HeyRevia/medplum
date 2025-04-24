#!/bin/sh

# Error on bad command
set -e

# Start nginx
exec nginx -g 'daemon off;'
