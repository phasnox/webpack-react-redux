FROM debian:latest

# Update and install stuff
RUN echo "deb http://ftp.debian.org/debian jessie-backports main" > /etc/apt/sources.list.d/jessie-backports.list
RUN apt-get update 
RUN apt-get -y --fix-missing install
RUN apt-get -y install git
RUN apt-get -y install nginx

#Install certbot
RUN apt-get -y install certbot -t jessie-backports

# Install node, npm and dependencies
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
RUN npm install -g webpack


# Add nginx conf file
RUN ln -sf /app/conf/app_nginx.conf /etc/nginx/sites-enabled/
RUN ln -sf /app/ssl/letsencrypt /etc/letsencrypt

# Setup volumes
VOLUME ["/app"]

WORKDIR /app/
ENTRYPOINT ["/app/scripts/entrypoint.sh"]
