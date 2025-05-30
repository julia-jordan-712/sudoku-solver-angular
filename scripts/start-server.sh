#!/bin/bash
set -e

DIST_DIR="${PWD}/dist/sudoku-solver-angular/browser"

NUMBER_REGEX='^[0-9]+$'
if [[ $1 =~ $NUMBER_REGEX ]]
then
  PORT=$1
else
  PORT=9999
fi

echo "Starting http-server on port ${PORT}"

npx http-server ${DIST_DIR} -o -p ${PORT}
