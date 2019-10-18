nvm_setup:
	@curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash

node_setup:
	. ~/.nvm/nvm.sh && nvm install v11.10.1

front_setup:
	npm install yarn -g
	yarn install

setup:	nvm_setup	node_setup	front_setup

start:
	yarn start

dev:
	yarn dev

production:
	yarn build

test:
	yarn test:unit

test-watch:
	yarn test:unit:watch

lint:
	yarn lint

docker-build:
	docker build -t dasa-challenge/github-user-repos-app -f Dockerfile .

docker-run:
	docker run -it -p 5000:80 --rm --name github-user-repos-app-1 dasa-challenge/github-user-repos-app

docker-run-dev:
	docker-compose up --build
