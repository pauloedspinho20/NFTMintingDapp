import { useState, useEffect } from 'react';
import { number, string } from 'prop-types';

import Button from 'components/Button/Button';

import useModal from 'hooks/useModal';
import useContracts from 'hooks/useContracts';

import useBepro from 'hooks/useBepro';

const ButtonMint = ({ amount, contractAddress, ...props }) => {
  const { open } = useModal('mint');
  const { ethBalance } = useBepro();

  const {
    enabled,
    erc20Enabled,
    erc20Minimum,
    erc20Balance,
    paused,
    cost,
    symbol,
    whitelistMintEnabled,
    isAddressWhitelisted,
    whitelistClaimed,
    operation,
  } = useContracts(contractAddress);

  const onClick = async () => {
    open({
      amount,
      contractAddress,
      cost,
      symbol,
      paused,
      isAddressWhitelisted,
      whitelistMintEnabled,
      whitelistClaimed,
      operation,
    });
  };

  const [ label, setLabel ] = useState('');

  useEffect(() => {
    let lb = 'Mint';
    if (paused && whitelistMintEnabled) {
      lb = 'Whitelist Mint';
    }
    else if (operation === 'minting') {
      lb = 'Minting...';
    }

    setLabel(lb);
  }, [ whitelistMintEnabled, paused, operation ]);

  return (
    <Button
      className="btn--size-min-150 btn-mint"
      disabled={
        (paused && !whitelistMintEnabled)
        || (erc20Enabled && erc20Balance < erc20Minimum)
        || !enabled
        || (!isAddressWhitelisted && whitelistMintEnabled)
        || (paused && whitelistClaimed)
        || operation
        || ethBalance < (cost * amount)
      }
      onClick={ onClick }
      size="m"
      theme="orange"
      { ...props }
    >
      { label }
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
