const sdk = require('api')('@opensea/v1.0#1e41yo45l0vihg6s');

const openSeaUrl = process.env.NEXT_PUBLIC_ERC721_OPENSEA_URL;

const getOpenSea = () => {
  sdk['retrieving-a-single-collection']({ collection_slug: openSeaUrl })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.error(err));
};

export default getOpenSea;
