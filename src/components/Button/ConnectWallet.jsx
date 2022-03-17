import { useState } from 'react';
import { node, string } from 'prop-types';

import Button from 'components/Button/Button';

import useBepro from 'hooks/useBepro';
import useStorage from 'hooks/useStorage';

const ButtonConnectWallet = ({
  children, label, wallet, ...props
}) => {
  const [ connecting, setConnecting ] = useState(false);
  const { connect } = useBepro();
  const storage = useStorage('essential');

  return (
    <Button
      className="btn-primary"
      disabled={ connecting }
      onClick={ async () => {
        setConnecting(true);
        try {
          // Clicking another wallet means we shouldn't autoconnect anymore, unless connection to
          // the new wallet is successful.
          storage.remove('wallet');

          await connect(wallet);
        }
        catch (ex) {
          // eslint-disable-next-line no-console
          console.error(ex);
        }
        setConnecting(false);
      } }
      size="m"
      { ...props }
    >
      { connecting ? 'Connecting...' : label }
      { children }
    </Button>
  );
};

ButtonConnectWallet.propTypes = {
  label: string.isRequired,
  children: node.isRequired,
  wallet: string.isRequired,
};

export default ButtonConnectWallet;
