import { string } from 'prop-types';
import { useState } from 'react';

import Button from 'components/Button/Button';

import useBepro from 'hooks/useBepro';
import { updateContracts } from 'hooks/useContracts';

const ButtonApprove = ({ contractAddress }) => {
  const [ enabling, setEnabling ] = useState(false);
  const { approveContract } = useBepro();

  const onClick = async () => {
    setEnabling(true);
    try {
      const approve = await approveContract(contractAddress);
      if (approve) {
        await updateContracts();
      }
    }
    catch (ex) {
      // eslint-disable-next-line no-console
      console.error(ex);
    }
    setEnabling(false);
  };

  return (
    <Button
      className="btn-primary"
      external
      size="m"
      disabled={ enabling }
      onClick={ onClick }
      theme="white-gradient"
      title="Approve contract"
    >
      { enabling ? 'Approving...' : 'Approve contract' }
    </Button>
  );
};

ButtonApprove.propTypes = {
  contractAddress: string,
};

ButtonApprove.defaultProps = {
  contractAddress: '',
};

export default ButtonApprove;
