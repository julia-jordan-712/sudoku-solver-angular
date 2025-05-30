#!/bin/bash
set -e

checkVersions() {
  NODE_VERSION="$(node -v)"
  NPM_VERSION="$(npm -v)"
  NPX_VERSION="$(npx -v)"

  VERSION_REGEX='^v?[0-9]+\.[0-9]+\.[0-9]+$'
  if ! [[ $NODE_VERSION =~ $VERSION_REGEX ]]
  then
    echo "ERROR - No valid node version found. Please install. See https://docs.npmjs.com/downloading-and-installing-node-js-and-npm"
    exit -1;
  fi
  if ! [[ $NPM_VERSION =~ $VERSION_REGEX ]]
  then
    echo "ERROR - No valid npm version found. Please install. See https://docs.npmjs.com/downloading-and-installing-node-js-and-npm"
    exit -1;
  fi
  if ! [[ $NPX_VERSION =~ $VERSION_REGEX ]]
  then
    echo "ERROR - No valid npx version found. Please install. Execute 'npm i -g npx' to install."
    exit -1;
  fi
  echo "OK - node version: ${NODE_VERSION}, npm version: ${NPM_VERSION}, npx version: ${NPX_VERSION}"
}

startServer() {
  DIST_DIR="${PWD}/dist/sudoku-solver-angular/browser"

  INTEGER_REGEX='^[0-9]+$'
  if [[ $1 =~ $INTEGER_REGEX ]]
  then
    PORT=$1
  else
    PORT=9999
  fi

  echo "Starting http-server on port ${PORT}"
  npx http-server ${DIST_DIR} -o -p ${PORT}
}

checkVersions
startServer
