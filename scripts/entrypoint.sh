#!/bin/bash

DOMAIN="sample"
set -e

function setup() {
    cd /app/ \
    && npm install
}

function watch() {
    cd /app/ \
    && npm run watch
}

function build() {
    cd /app/ \
    && npm build:prod
}

function certbot-certificate() {
    /etc/init.d/nginx stop \
    && mkdir -p /app/ssl/letsencrypt \
    && certbot certonly --standalone -d www.$DOMAIN.com -d $DOMAIN.com\
    && /etc/init.d/nginx start
}

function certbot-renew() {
    certbot renew --quiet
}

function start() {
    nginx -g "daemon off;"
}

function devserver() {
    nginx && npm start
}

export -f setup
export -f watch
export -f build
export -f certbot-certificate
export -f certbot-renew
export -f start

$@
