import {
  number, string,
} from 'prop-types';

import Button from 'components/Button/Button';

// import useModal from 'hooks/useModal';
import useContracts from 'hooks/useContracts';

// import useBepro from 'hooks/useBepro';

const ButtonMintUpload = ({
  amount,
  contractAddress,
  name,
  description,
  ...props

}) => {
  // const { open } = useModal('mint');
  // const { ethBalance } = useBepro();

  const {
    /*     approved,
    enabled,
    paused,
    cost,
    whitelistMintEnabled,
    isAddressWhitelisted,
    whitelistClaimed, */
    operation,
  } = useContracts(contractAddress);

  return (
    <Button
      className="btn--size-min-150 btn-mint"
      disabled={
        // (paused && !whitelistMintEnabled)
         // || !approved
        // || !enabled
        // || (!isAddressWhitelisted && whitelistMintEnabled)
        // || (paused && whitelistClaimed)
        operation
        // || ethBalance < (cost * amount)
      }
      size="m"
      theme="orange"
      { ...props }
    >
      { operation ? 'Minting...' : 'Mint & IPFS upload' }
    </Button>
  );
};

ButtonMintUpload.propTypes = {
  amount: number,
  name: string,
  description: string,
  contractAddress: string,
};

ButtonMintUpload.defaultProps = {
  amount: 1,
  name: '',
  description: '',
  contractAddress: null,
};

export default ButtonMintUpload;
