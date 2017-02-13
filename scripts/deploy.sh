APP_ENV=$1

echo "Pulling app from git repo"
(cd ~/src/app && git fetch --all && git reset --hard origin/$APP_ENV)

if [ "$1" == "rebuild" ]; then
    docker-compose build
fi

echo "Starting app server"
docker-compose -f production.yml up -d

echo "Building assets.."
docker-compose run --rm app build

