import { string } from 'prop-types';
import useBepro from 'hooks/useBepro';
import Button from './Button';

const CollectionButtons = ({ contractAddress, ...props }) => {
  const {
    networkWanted,
  } = useBepro();

  const ethercanUrl = (networkWanted === 'rinkeby') ? `https://rinkeby.etherscan.io/address/${contractAddress}` : `https://etherscan.io/address/${contractAddress}`;
  const envOpenSea = process.env.NEXT_PUBLIC_ERC721_OPENSEA_URL;
  let openSeaUrl;

  if (envOpenSea !== '') {
    openSeaUrl = networkWanted === 'rinkeby'
      ? `https://testnets.opensea.io/collection/${envOpenSea}`
      : `https://opensea.io/collection/${envOpenSea}`;
  }
  return (
    <div { ...props }>
      { envOpenSea !== '' ? (
        <Button
          className="me-2 mb-4"
          to={ openSeaUrl }
          target="_blank"
          theme="yellow"
          size="xxs"
          external
        >
          View on OpenSea
        </Button>
      ) : '' }

      <Button
        to={ ethercanUrl }
        target="_blank"
        theme="yellow"
        size="xxs"
        external
      >
        View on Etherscan
      </Button>
    </div>

  );
};

CollectionButtons.propTypes = {
  contractAddress: string,
};

CollectionButtons.defaultProps = {
  contractAddress: '',
};
export default CollectionButtons;
