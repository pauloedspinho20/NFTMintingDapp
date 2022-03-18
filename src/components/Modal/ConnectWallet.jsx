import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ButtonConnectWallet from 'components/Button/ConnectWallet';
import IconMetamask from 'components/Icon/Metamask/Metamask';
import IconTrustWallet from 'components/Icon/TrustWallet/TrustWallet';
import IconWalletConnect from 'components/Icon/WalletConnect/WalletConnect';
import Modal from 'components/Modal/Modal';

import useBepro from 'hooks/useBepro';
import useModal from 'hooks/useModal';

const ModalConnectWallet = () => {
  const {
    address, networkActive, networkWanted, switchNetwork,
  } = useBepro();
  const { close, open, show } = useModal('connect-wallet');

  const onClose = useCallback(() => {
    if (show.onClose) {
      show.onClose();
    }
    close();
  }, [ close, show ]);

  useEffect(() => {
    if (show) {
      if (networkActive && networkActive !== networkWanted) {
        if (!show.wrongNetwork) {
          open({
            ...show,
            wrongNetwork: true,
          });

          switchNetwork(networkWanted);
        }
      }

      else if (address) {
        onClose();
      }
    }
  }, [ address, networkActive, networkWanted, onClose, open, show, switchNetwork ]);

  return (
    <Modal
      name="connect-wallet"
      onClose={ onClose }
    >
      { show?.wrongNetwork && (
        <>
          <div className="popup--title">Wrong network</div>
          <div className="popup--desc">
            <br />
            Switch your wallet network to
            { ' ' }
            <strong>
              { networkWanted === 'eth' && 'Ethereum' }
              { networkWanted === 'rinkeby' && 'Rinkeby' }
            </strong>
            .
          </div>
        </>
      ) }

      { !show?.wrongNetwork && (
        <>
          <div className="popup--title">Connect your wallet</div>
          <div className="popup--desc">
            { 'By connecting your wallet, you agree to our ' }
            <Link to="/terms-conditions">Terms of Service</Link>
            { ' and our ' }
            <Link to="/privacy-policy">Privacy Policy</Link>
            .
          </div>

          <div className="wallet-actions">
            <ul className="popup--actions">
              <li>
                <ButtonConnectWallet
                  label="MetaMask"
                  theme="metamask-gradient"
                  wallet="metamask"
                >
                  <IconMetamask />
                </ButtonConnectWallet>
              </li>

              <li>
                <ButtonConnectWallet
                  label="WalletConnect"
                  theme="walletconnect-gradient"
                  wallet="walletConnect"
                >
                  <IconWalletConnect />
                </ButtonConnectWallet>
              </li>

              <li>
                <ButtonConnectWallet
                  label="Trust Wallet"
                  theme="trustwallet-gradient"
                  wallet="trustWallet"
                >
                  <IconTrustWallet />
                </ButtonConnectWallet>
              </li>
            </ul>
          </div>
        </>
      ) }
    </Modal>
  );
};

export default ModalConnectWallet;
