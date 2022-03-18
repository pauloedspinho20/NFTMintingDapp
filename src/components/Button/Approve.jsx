import { string } from 'prop-types';

import Button from 'components/Button/Button';

import useBepro from 'hooks/useBepro';
import useContracts, { updateContracts } from 'hooks/useContracts';
import useModal from 'hooks/useModal';

const ButtonApprove = ({ contractAddress }) => {
  const { approveContract } = useBepro();
  const { operation, setOperation } = useContracts();
  const follow = useModal('confirm-transaction');

  const onClick = async () => {
    setOperation('approve');
    follow.open({ title: 'Confirm approval' });
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
    setOperation('');
    follow.close();
  };

  return (
    <Button
      className="btn-primary"
      external
      size="m"
      disabled={ operation === 'approve' }
      onClick={ onClick }
      theme="blue"
      title="Approve contract"
    >
      { operation ? 'Approving...' : 'Approve contract' }
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
