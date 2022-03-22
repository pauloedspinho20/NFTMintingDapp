const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");

const {
  animationBaseUri,
  baseUri,
  hiddenBaseUri,
  isInteractive,
  description,
  namePrefix,
  network,
  solanaMetadata,
} = require(`${basePath}/src/config.js`);

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

data.forEach((item) => {
  if (network == NETWORK.sol) {
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.creators = solanaMetadata.creators;
  } else {
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.image = `${baseUri}/${item.edition}.png`;
    if (isInteractive) {
      item.animation_url = `${animationBaseUri}/${item.edition}.gif`;
    }
  }
  fs.writeFileSync(
    `${basePath}/build/json/${item.edition}.json`,
    JSON.stringify(item, null, 2)
  );
});

fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(data, null, 2)
);


var hiddenMetadataList = {
  name: `${namePrefix}`,
  description: description,
  image: `${hiddenBaseUri}/hidden.png`,
};

fs.writeFileSync(
  `${basePath}/build/hidden_json/hidden.json`,
  JSON.stringify(hiddenMetadataList, null, 2)
);
console.log(`Updated hidden metadata for images to ===> ${hiddenBaseUri}`);

if (network == NETWORK.sol) {
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
  console.log(
    `Updated creators for images to ===> ${JSON.stringify(
      solanaMetadata.creators
    )}`
  );
} else {
  if (isInteractive) {
    console.log(`Updated animationUrl for images to ===> ${animationBaseUri}`);
  }
  console.log(`Updated baseUri for images to ===> ${baseUri}`);
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);

}
