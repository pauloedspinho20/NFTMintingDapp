import { useEffect, useState } from 'react';

import Button from 'components/Button/Button';
import FormNumber from 'components/Form/Number';
import Modal from 'components/Modal/Modal';
import Price from 'components/Price';

import useBepro from 'hooks/useBepro';
import useContracts, { updateContracts } from 'hooks/useContracts';
import useModal from 'hooks/useModal';

const ModalMint = () => {
  const { ethBalance, mintCollection } = useBepro();
  const [ value, setValue ] = useState(0);
  const { setOperation } = useContracts();
  const confirm = useModal('mint');
  const follow = useModal('confirm-transaction');
  const show = useModal('transaction-successful');

  const {
    amount,
    contractAddress,
    cost,
    paused,
    symbol,
    isAddressWhitelisted,
    whitelistMintEnabled,
  } = confirm.show || {};

  const whitelistMint = (paused && isAddressWhitelisted && whitelistMintEnabled);
  const title = whitelistMint ? 'Confirm Whitelist Mint' : 'Confirm Mint';
  const insufficientBalance = ethBalance < cost;

  useEffect(() => {
    if (!confirm.show) {
      setValue(0);
    }
  }, [ confirm.show ]);

  useEffect(() => {
    if (cost) {
      setValue(cost * amount);
    }
  }, [ cost, amount ]);

  if (insufficientBalance) {
    return (
      <Modal name="mint">
        <div className="popup--title">
          MINT
        </div>
        <div className="popup--desc">
          <h3 className="color-gradient-purple">
            Insufficient ETH Balance
          </h3>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="minting-item">
              <h4 className="green">
                My balance
              </h4>
              <div className="white-grad-title white-grad-title-30 minting-item-amount">
                <Price
                  eth={ ethBalance }
                  options={ { exact: true } }
                  output="eth"
                  showLabel
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="minting-item">
              <h4 className="green">
                Cost per NFT
              </h4>
              <div className="white-grad-title white-grad-title-30 minting-item-amount">
                <Price
                  eth={ cost }
                  options={ { exact: true } }
                  output="eth"
                  showLabel
                />
              </div>
            </div>
          </div>
        </div>

        <ul className="popup--actions incuficient-balance">
          <li>
            <Button
              className="btn-primary btn-block"
              size="m"
              theme="blue-gradient"
              onClick={ () => console.log('') }
            >
              Insufficient Balance
            </Button>
          </li>
          <li>
            <Button
              className="btn-secondary"
              onClick={ confirm.close }
              size="m"
            >
              Cancel
            </Button>
          </li>
        </ul>
      </Modal>
    );
  }

  return (
    <Modal name="mint">
      <div className="popup--title">{ title }</div>
      <div className="popup--desc">
        Do you want to mint
        { ' ' }
        { amount }
        { ' ' }
        { symbol }
        { amount > 1 && 's' }
        ?
        <ul className="eth-price-exchange-display">
          <li className="eth-price-indication">
            <Price
              eth={ FormNumber.number(value) }
              options={ { exact: true } }
              output="eth"
              showLabel
            />
          </li>
        </ul>
      </div>

      <ul className="popup--actions">
        <li>
          <Button
            className="btn-primary"
            onClick={ async () => {
              confirm.close();
              setValue();
              setOperation('minting');

              follow.open({ title });

              if (!await mintCollection(
                value,
                amount,
                contractAddress,
                whitelistMint,
              ).then(request => {
                follow.close();
                if (request) {
                  show.open({ title: 'NFT Minted', transactionHash: request.transactionHash });
                }
              })) {
                // If operation succeeds, this variable will be set when fetching new pool data
                setOperation('');
              }

              follow.close();
              updateContracts();
            } }
            size="m"
            theme="orange"
          >
            Confirm
          </Button>
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

export default ModalMint;
