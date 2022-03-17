import Button from 'components/Button/Button';
import Price from 'components/Price';
import ButtonAddress from 'components/Button/Address';
import useBepro from 'hooks/useBepro';
import useModal from 'hooks/useModal';

import './Wallet.scss';

const Wallet = () => {
  const { open } = useModal('connect-wallet');
  const { address, ethBalance } = useBepro();

  const onClick = () => {
    if (!address) {
      open();
    }
  };

  if (address) {
    return (
      <>

        <div className="wallet-balance">
          Balance:
          { ' ' }
          <strong>
            <Price
              eth={ ethBalance }
              options={ { exact: true } }
              output="eth"
              showLabel
            />
          </strong>

        </div>
        <div className="wallet-connected-status">
          <ButtonAddress>{ address }</ButtonAddress>
        </div>
      </>
    );
  }

  return (
    <Button
      className="btn-connect-wallet"
      onClick={ onClick }
      size="s"
      theme="blue-gradient"
    >
      Connect Wallet
    </Button>
  );
};

export default Wallet;
