#!/bin/sh
yarn build
yarn test
cp alias/*.js ./