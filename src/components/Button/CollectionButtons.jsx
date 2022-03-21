import useBepro from 'hooks/useBepro';
import Button from './Button';

const CollectionButtons = () => {
  const {
    address,
    networkActive,
  } = useBepro();

  const ethercanUrl = networkActive === 'rinkeby' ? `https://rinkeby.etherscan.io/address/${address}` : `https://etherscan.io/address/${address}`;
  const envOpenSea = process.env.NEXT_PUBLIC_OPENSEA_URL;
  const openSeaUrl = (
    (networkActive === 'rinkeby' && envOpenSea !== '')
      ? `https://testnets.opensea.io/collection/${envOpenSea}`
      : `https://opensea.io/collection/${envOpenSea}`
  );
  return (
    <div>
      { openSeaUrl !== '' && (
      <Button
        className="me-2 mb-4"
        to={ openSeaUrl }
        target="_blank"
        theme="white"
        size="xxs"
        external
      >
        View on OpenSea
      </Button>
      ) }
      <Button
        to={ ethercanUrl }
        target="_blank"
        theme="white"
        size="xxs"
        external
      >
        View on Ethersacan
      </Button>
    </div>
  );
};

export default CollectionButtons;
