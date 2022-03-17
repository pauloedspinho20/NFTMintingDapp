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
    symbol,
    balanceOf,
    cost,
    maxSupply,
    maxMintAmountPerTx,
    uriPrefix,
    whitelistMintEnabled,
    whitelistClaimed,
    isAddressWhitelisted,
    operation,
  } = useContracts(contractAddress);

  const onClick = async () => {
    open({
      amount,
      enabled,
      contractAddress,
      name,
      symbol,
      balanceOf,
      cost,
      maxSupply,
      maxMintAmountPerTx,
      uriPrefix,
      whitelistMintEnabled,
      whitelistClaimed,
      isAddressWhitelisted,
      operation,
    });
  };

  return (
    <Button
      className="btn--size-min-150 btn-mint"
      disabled={
        paused
        || !approved
        || !enabled
        || operation
        || ethBalance < (cost * amount)
      }
      onClick={ onClick }
      size="m"
      theme="orange"
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
