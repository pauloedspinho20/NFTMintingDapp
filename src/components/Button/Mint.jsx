import { number, string } from 'prop-types';

import Button from 'components/Button/Button';

import useModal from 'hooks/useModal';
import useContracts from 'hooks/useContracts';

import useBepro from 'hooks/useBepro';

const ButtonMint = ({ amount, contractAddress }) => {
  const { open } = useModal('mint');
  const { ethBalance } = useBepro();

  const {
    approved,
    enabled,
    name,
    paused,
    revealed,
    symbol,
    balanceOf,
    cost,
    maxSupply,
    maxMintAmountPerTx,
    uriPrefix,
    hiddenMetadataUri,
    whitelistMintEnabled,
    whitelistClaimed,
    isAddressWhitelisted,
    operation,
  } = useContracts(contractAddress);

  console.log('operation', operation, ethBalance < cost, paused);
  const onClick = async () => {
    open({
      amount,
      approved,
      enabled,
      contractAddress,
      name,
      paused,
      revealed,
      symbol,
      balanceOf,
      cost,
      maxSupply,
      maxMintAmountPerTx,
      uriPrefix,
      hiddenMetadataUri,
      whitelistMintEnabled,
      whitelistClaimed,
      isAddressWhitelisted,
    });
  };

  return (
    <Button
      className="btn--size-min-150 btn-mint"
      disabled={
        paused
        || !enabled
        || operation
        || ethBalance < cost
      }
      onClick={ onClick }
      size="m"
      theme="blue-gradient"
    >
      { operation === 'minting' ? 'Minting...' : 'Mint' }
    </Button>
  );
};

ButtonMint.propTypes = {
  amount: number,
  contractAddress: string,
};

ButtonMint.defaultProps = {
  amount: null,
  contractAddress: '',
};

export default ButtonMint;
