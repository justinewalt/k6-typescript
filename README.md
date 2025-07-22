<div align="center">
  
  ![banner](docs/ts-js-k6.png)

# Template to use TypeScript with k6

</div>

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation)
- [NodeJS](https://nodejs.org/en/download/)

## Installation

**On Mac**
First you'll need to ad k6 locally. I've found the easist way is by running

```bash
brew install k6
```

**All Other 

**Install dependencies**

Clone the this repository on your local machine, move to the project root folder and install the dependencies defined in [`package.json`](./package.json)

```bash
$ npm i
```

## Running the test

To run a test written in TypeScript, we first have to transpile the TypeScript code into JavaScript and bundle the project

```bash
$ npx webpack
```

This command creates the final test files to the `./dist` folder.

Once that is done, we can run our script the same way we usually do, for instance:

```bash
$ k6 run dist/get-200-status-test.js
```

## Writing own tests

House rules for writing tests:
- The test code is located in `tests` folder
- The entry points for the tests need to have "_test_" word in the name to distinguish them from auxiliary files. You can change the entry [here](./webpack.config.js#L8). 
- If static files are required then add them to `./assets` folder. Its content gets copied to the destination folder (`dist`) along with compiled scripts.

### Transpiling and Bundling

By default, k6 can only run ES5.1 JavaScript code. To use TypeScript, we have to set up a bundler that converts TypeScript to JavaScript code. 

This project uses `Babel` and `Webpack` to bundle the different files - using the configuration of the [`webpack.config.js`](./webpack.config.js) file.

If you want to learn more, check out [Bundling node modules in k6](https://k6.io/docs/using-k6/modules#bundling-node-modules).
