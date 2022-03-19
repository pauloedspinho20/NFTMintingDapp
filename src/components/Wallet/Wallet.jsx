import { bool } from 'prop-types';
import Button from 'components/Button/Button';
import Price from 'components/Price';
import ButtonAddress from 'components/Button/Address';
import useBepro from 'hooks/useBepro';
import useModal from 'hooks/useModal';

const Wallet = ({ withBalance }) => {
  const { open } = useModal('connect-wallet');
  const { address, ethBalance } = useBepro();

  const onClick = () => {
    if (!address) {
      open();
    }
  };

  return (
    <div className="wallet-wrapper">
      { withBalance && (
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
          { ' ' }
        </>
      ) }

      <div className="wallet-connected-status">
        { address ? (
          <ButtonAddress
            className="btn btn-block btn--size-xs btn--bg-white btn--fill"
            alt="Connect Wallet"
            format
          >
            { address }
          </ButtonAddress>
        ) : (
          <Button
            className="btn-connect-wallet btn-block"
            onClick={ onClick }
            size="xs"
            theme="blue"
            alt="Connect Wallet"
          >
            Connect Wallet
          </Button>
        ) }
      </div>
    </div>
  );
};

Wallet.propTypes = {
  withBalance: bool,
};

Wallet.defaultProps = {
  withBalance: false,
};

export default Wallet;
