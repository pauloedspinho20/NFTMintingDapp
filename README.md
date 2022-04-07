# NFTMintingDapp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## TODO

- ERC1155 contract with:
  -- Multiple token burn for new nft mint
  -- Upload to IPFS on mint
  -- How to solve contract ipfs base url?
  -- NFT Staking?
- WalletConnect and Trust Wallet integration
- Add Cypress and Github Actions
- Smart contract owner auto mint on deploy
- Max tokens per address?
- Bepro main branch or Moralis provider
- Google Tag Manager
- Roadmap
- KPI section with values from smart contract and OpenSea
- Landing page
- About page with gitdocs
- Add IPFS deployer to project?

## Infrastructure config

- Create a Gmail email for project accounts on all services
- Buy crypto domain https://unstoppabledomains.com/auth
- Create Moralis Test and Production Apps https://admin.moralis.io/
- Create Web3.Storage account and API Token https://web3.storage/account/
- Clone NFT Frontend Dapp

## Project config:

- Run `yarn` on project root, art_engine and hardhat directories
- Create .env
- Change HTML metadata
- Deactivate or remove all unused pages and components
- Style the template layout
- Choose only the wanted networks on `src/helpers/networks.js`
  - If .env environment is 'development' or 'staging' use Network switcher with wanted mainet and testnet;
  - If .env environment is 'production' don't use network switcher and set to mainnet;

## Art Engine (Layers) config:

- Need homebrew to run the following script: `brew install pkg-config cairo pango libpng jpeg giflib librsvg`

## Smart Contract deployment

## Test and App deployment:

- Test all blockchain interactions
- Deploy app to IPFS via provider (Moralis or Fleek)
  - Create staging environment
  - Create production environment

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Debug app on VS Code

- Add a launch.json file inside .vscode folder on project root
- Chose one of the following configs

### Chrome

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

### Brave

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Brave against localhost",
            "runtimeExecutable": "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
            "url": "http://localhost:3000",
            "userDataDir": true,
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```
