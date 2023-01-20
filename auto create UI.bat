docker build -t react01:0.0 -f Dockerfile_react_01 .
docker run -d -p 3000:3000 --network test --name react01 react01:0.0
