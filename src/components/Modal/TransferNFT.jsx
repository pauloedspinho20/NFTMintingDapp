import { useState } from 'react';

import Button from 'components/Button/Button';
import ButtonApprove from 'components/Button/Approve';
import Modal from 'components/Modal/Modal';

import useBepro from 'hooks/useBepro';
import useContracts, { updateContracts } from 'hooks/useContracts';
import useModal from 'hooks/useModal';
import bepro from 'lib/bepro';

const ModalTransferNFT = () => {
  const [ toAddress, setToAddress ] = useState('');
  const [ message, setMessage ] = useState(null);
  const [ isValidAddress, setIsValidAddress ] = useState(null);
  const { address, safeTransferFrom } = useBepro();
  const confirm = useModal('transfer-nft');
  const follow = useModal('confirm-transaction');
  const show = useModal('transaction-successful');
  const { setOperation } = useContracts();

  const {
    approved,
    title,
    tokenId,
    name,
    contractAddress,
  } = confirm.show || {};

  const validateAddress = async value => {
    setToAddress(value);
    const web3 = await bepro.getWeb3();
    try {
      web3.utils.toChecksumAddress(value);
      if (value !== address) {
        setMessage('Valid address!');
        setIsValidAddress(true);
      }
      else {
        setMessage('This is your address');
        setIsValidAddress(false);
      }
    }
    catch (e) {
      setMessage('Invalid address');
      setIsValidAddress(false);
    }
  };

  return (
    <Modal name="transfer-nft">
      <div className="popup--title">{ `Transfer ${name} #${tokenId}` }</div>

      { !approved && contractAddress ? (
        <div className="popup--desc mb-5">
          You must approve first
        </div>
      ) : (
        <>
          <div className="popup--desc mb-3">
            Recipient address
          </div>
          <div className="transfer-address-wrapper">
            <input
              id="transfer-to-address"
              name="transfer-to-address"
              type="text"
              placeholder="0xWF829Rs..35"
              className="form-control mb-4"
              value={ toAddress }
              onChange={ async e => validateAddress(e.target.value) }
            />

            { !isValidAddress
              ? (<div className="mb-3 red">{ message }</div>)
              : (<div className="mb-3 green">{ message }</div>) }
          </div>
        </>
      ) }

      <ul className="popup--actions">
        <li>
          { !approved && contractAddress ? (
            <ButtonApprove
              contractAddress={ contractAddress }
              theme="orange"
            />
          ) : (
            <Button
              className="btn-primary"
              onClick={ async () => {
                confirm.close();
                setToAddress();
                setOperation('transfer-nft');

                follow.open({ title });

                if (!await safeTransferFrom(
                  toAddress, // to
                  tokenId, // tokenId
                  contractAddress,
                ).then(request => {
                  follow.close();
                  show.open({ title: `${name} #${tokenId} Transferred`, transactionHash: request?.transactionHash });
                })) {
                  // If operation succeeds, this variable will be set when fetching new pool data
                  setOperation('');
                }

                follow.close();
                updateContracts();
              } }
              disabled={ !isValidAddress }
              size="m"
              theme="orange"
            >
              Yes
            </Button>
          ) }
        </li>
        <li>
          <Button
            onClick={ confirm.close }
            size="m"
            theme="yellow"
          >
            Cancel
          </Button>
        </li>
      </ul>
    </Modal>
  );
};

export default ModalTransferNFT;
