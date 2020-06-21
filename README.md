# espjs

ESP configuration template.<br/>

## Available Scripts

### `yarn start`

Runs the app in the development mode.<br />
The development server redirect all `/api` requests to `cube.local`. <br/>
If your ESP is running on a different address, you can adjust the proxy server in the `webpack.config.js`

### `yarn test` - Compile and lint the code - unit tests are missiong.
### `yarn lint` - Launches the ESLint (lint:code) and the StyleLint (lint:css) together.
### `yarn lint:code` - ESLint - Code linter
### `yarn lint:css` - Stylelint - Code linter

### `yarn build` - Builds the app for production to the `build` folder.
### `yarn build:tsc` - Compile typescript code.