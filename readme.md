# Kayla Host Application - React  

## Prerequisites

* [node](https://nodejs.org/en/)
    ```sh
    brew install node
    ```
* [meteor](https://www.meteor.com/install)
    ```sh
    curl https://install.meteor.com/ | sh
    ```
* [mgp](https://github.com/DispatchMe/mgp) (meteor git package dependencies)
    ```sh
    npm install -g mgp
    ```

## Setup

You'll need to be running the mongo database (the `hometime-mongo` docker container) from [platform](https://github.com/kayla-tech/platform) and have it available on `localhost:27017`. Some prepopulated information is needed in the db (you may get an error about Suburbs if you haven't imported initial data).

Use `mgp` to install the [`kayla-packages`](https://github.com/kayla-tech/kayla-packages) dependency into `/packages` (the dependencies for `mgp` are specified in [`git-packages.json`](./git-packages.json)). This might require authentication for git on the command line.

```sh
mgp --https
```

## Run

```sh
npm start
```

## Overview

This is a rebuild of the Host application using [React](https://facebook.github.io/react/index.html) as the frontend view engine (replacing Blaze). It also uses [FlowRouter](https://github.com/kadirahq/flow-router) instead of iron:Router.

## Tests

Unit test run via [Jasmine 2.3](http://jasmine.github.io/2.3/introduction.html). you want to make sure you enable/disable the correct test types in your environment variables:

```
export JASMINE_SERVER_UNIT=0
export JASMINE_SERVER_INTEGRATION=0
export JASMINE_CLIENT_INTEGRATION=0
export JASMINE_CLIENT_UNIT=1
```
Currently, we only use client side unit tests.
