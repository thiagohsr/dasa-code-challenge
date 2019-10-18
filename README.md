[![CircleCI](https://circleci.com/gh/thiagohsr/dasa-code-challenge.svg?style=svg&circle-token=939fb71518096927333b4209c604997b4c3184b5)](https://circleci.com/gh/thiagohsr/dasa-code-challenge)
# Dasa Code Challenge frontend
App to retrieve repositories to given user of github platform.

## Dependencies to run and test the project
[Install dev dependencies](#install-dev-dependencies)

- Nodejs v11.10.1 - I recommend [NVM](https://github.com/creationix/nvm#installation) to install and manage node js versions.
- Docker - [Overview, Install and guides](https://docs.docker.com/install/overview/).
- Compose - [Overview, Install and guides](https://docs.docker.com/compose/).

## Install dev dependencies
The command above wil install needed dependencies to local run and develop the project.
```
make setup
```

### Compiles, hot-reloads for development
Before compile it will serve application by default in http://localhost:8080
```
make dev
```

### Run your unit tests or run tests and watch for modifications
```
make test
or
make test:watch
```

### Compiles and minifies for production
This will compile and building artifacts of our source files that's we simple publish on some static server and use the application. After this command runs, the `dist` folder contains our deliverable.
```
make production
```


## Containerized
Build the docker container and run container
```
make docker-build
make docker-run
```

If you prefer develop the project inside a running container, exec this one:
```
make docker-run-dev
```

### Customize configuration
Because this application has his base code generated/based in vue cli, I'll drop this link as reference here.
See [Configuration Reference](https://cli.vuejs.org/config/).
