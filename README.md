# Freewater

<!--
[![Build Status](https://travis-ci.org/PolymerElements/polymer-starter-kit.svg?branch=master)](https://travis-ci.org/PolymerElements/polymer-starter-kit)
-->





## tech side
apps using a drawer-based


`polymer-cli` toolchain
The PRPL pattern, in a nutshell:

* **Push** components required for the initial route
* **Render** initial route ASAP
* **Pre-cache** components for remaining routes
* **Lazy-load** and progressively upgrade next routes on-demand


## development

### Setup

##### Prerequisites

Install [polymer-cli](https://github.com/Polymer/polymer-cli):
    npm install -g bower
    npm install -g polymer-cli

### Build steps
    bower install

### Start the development server

This command serves the app at `http://localhost:8080` and provides basic URL
routing for the app:


    polymer serve --open

    firebase serve


### tools

    google-chrome https://console.firebase.google.com/project/free-water/overview --no-first-run --profile-directory=Tester
                  https://console.firebase.google.com/project/free-water/database/data
### Build

H2/push-compatible servers or to clients that do not support H2/Push.

    polymer build

### Preview the build

This command serves the minified version of the app at `http://localhost:8080`
in an unbundled state, as it would be served by a push-compatible server:

    polymer serve build/unbundled

This command serves the minified version of the app at `http://localhost:8080`
generated using fragment bundling:

      polymer serve build/bundled

### Run tests

This command will run
[Web Component Tester](https://github.com/Polymer/web-component-tester) against the
browsers currently installed on your machine:

      polymer test

There is another way to the Test and see the Test interface
[Test Interface](http://localhost:8080/test)
For Running the Test cases first start the serve:

      polymer serve

and them open browser on (http://localhost:8080/test)
or (http://localhost:8080/components/<my-el>/test/<my-el_test.html>)


### deploy test

    firebase deploy
    https://free-water.firebaseapp.com

### deploy prod

    ./deploy.sh
    https://freewater.tecla5.com
    https://tecla5.github.io/freewater
