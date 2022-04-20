# SPADE LABS MINTING DAPP

Next.js app.

## Requirements

- Node.js >= 16.2.0 or use NVM (`nvm use 16.2.0`)
- yarn

## Smart Contract Deployment

cd smart-contract

# On Rinkeby Testnet

- Create a .env file on 'smart-contract' folder. Copy the contents of .env.example to the new file.
- Place your private key on NETWORK_TESTNET_URL and NETWORK_MAINNET_PRIVATE_KEY variables on .env (Keep this file safe)
- Check the values smart-contract/config/CollectionConfig.ts on 'ERC721' key (line 13 to 36)
- Run `yarn compile`
- Run `yarn deploy --network rinkeby`
- Copy the deployed contract address to:
- - smart-contract/config/CollectionConfig.ts on 'contractAddress' of 'ERC721' key (line 33)
- - NEXT_PUBLIC_ERC721_CONTRACT_ADDRESS_RINKEBY variable on .env file of the project root (only if you will run the website locally)
- Run `yarn verify-erc721 CONTRACTADDRESS --network rinkeby`
- Check the whitelist addresses array on src/whitelist.json)
- `yarn whitelist-open --network rinkeby`
- Place the contract address on OpenSea to get the collection page. The URL must be something like this https://opensea.io/collection/pyes-wild-one. Copy the last part (pyes-wild-one) and place on smart-contract/config/CollectionConfig.ts on 'marketplaceIdentifier' of 'ERC721' key (line 34) AND on NEXT_PUBLIC_ERC721_OPENSEA_URL variable of .env file on project root.

If everything is ok, deploy the contract on mainnet

# On Ethereum Mainnet

- Run `yarn deploy --network ethereum`
- Copy the deployed contract address to:
- - smart-contract/config/CollectionConfig.ts on 'contractAddress' of 'ERC721' key (line 33)
- - NEXT_PUBLIC_ERC721_CONTRACT_ADDRESS_RINKEBY variable on .env file of the project root (only if you will run the website locally)
- Run `yarn verify-erc721 CONTRACTADDRESS --network ethereum`
- Check the whitelist addresses array on src/whitelist.json)
- `yarn whitelist-open --network ethereum`
- Place the contract address on OpenSea to get the collection page. The URL must be something like this https://opensea.io/collection/pyes-wild-one. Copy the last part (pyes-wild-one) and place on smart-contract/config/CollectionConfig.ts on 'marketplaceIdentifier' of 'ERC721' key (line 34) AND on NEXT_PUBLIC_ERC721_OPENSEA_URL variable of .env file on project root.

APP DEPLOYMENT

Build command: yarn && yarn build && yarn export
Publish Directory: out

You only need to deploy the 'out' folder on the server.
Check this .env variables and change the smart contract addresses, and OpenSea URL

Staging .env
NEXT_PUBLIC_DAPP_NAME=Spade Labs Minting Dapp
NEXT_PUBLIC_ERC721_COLLECTION_ENABLED=true
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_IPFS_URL=https://ipfs.io/ipfs
NEXT_PUBLIC_RPC_ETHEREUM=https://mainnet.infura.io/v3/bbff2a52aa094c41b1fe7819ccaa7a2c
NEXT_PUBLIC_RPC_RINKEBY=https://rinkeby.infura.io/v3/bbff2a52aa094c41b1fe7819ccaa7a2c
NEXT_PUBLIC_CONTRACT_TYPE=ERC721
NEXT_PUBLIC_ERC721_CONTRACT_ADDRESS_RINKEBY= TESTNET ADDRESS
NEXT_PUBLIC_ERC721_CONTRACT_ADDRESS_ETHEREUM= MAINNET ADDRESS
NEXT_PUBLIC_ERC721_OPENSEA_URL=spade-labs-minting-dapp

Production .env
NEXT_PUBLIC_DAPP_NAME=Spade Labs Minting Dapp
NEXT_PUBLIC_ERC721_COLLECTION_ENABLED=true
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_IPFS_URL=https://ipfs.io/ipfs
NEXT_PUBLIC_RPC_ETHEREUM=https://mainnet.infura.io/v3/bbff2a52aa094c41b1fe7819ccaa7a2c
NEXT_PUBLIC_RPC_RINKEBY=https://rinkeby.infura.io/v3/bbff2a52aa094c41b1fe7819ccaa7a2c
NEXT_PUBLIC_CONTRACT_TYPE=ERC721
NEXT_PUBLIC_ERC721_CONTRACT_ADDRESS_RINKEBY= TESTNET ADDRESS
NEXT_PUBLIC_ERC721_CONTRACT_ADDRESS_ETHEREUM= MAINNET ADDRESS
NEXT_PUBLIC_ERC721_OPENSEA_URL=spade-labs-minting-dapp

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
