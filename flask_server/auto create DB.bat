docker network create -d bridge test
docker run -p 49154:5432 --name postgres -e POSTGRES_PASSWORD=1234 -d postgres
docker network connect test postgres