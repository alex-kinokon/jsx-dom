#!/bin/bash
alias() {
  echo "export { default } from './lib/$1'
export * from './lib/$1'" > "$1.js"
  echo 'export * from "./index"' > "$1.d.ts"
}

alias "svg"
alias "min"
yarn build
#yarn test
rm svg.d.ts
rm svg.js
rm min.d.ts
rm min.js