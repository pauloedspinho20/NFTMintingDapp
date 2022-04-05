/* eslint-disable react/jsx-indent */
import {
  bool, number, string,
} from 'prop-types';
import { useEffect, useState } from 'react';
import classnames from 'classnames';

import Button from 'components/Button/Button';
import ButtonApprove from 'components/Button/Approve';
import ButtonMint from 'components/Button/Mint';
import CollectionButtons from 'components/Button/CollectionButtons';
import Placeholder from 'components/Placeholder';
import Price from 'components/Price';
import Wallet from 'components/Wallet/Wallet';

import useBepro from 'hooks/useBepro';

const MintWidget = ({
  approved,
  enabled,
  contractAddress,
  paused,
  revealed,
  cost,
  maxSupply,
  totalSupply,
  maxMintAmountPerTx,
  whitelistMintEnabled,
  isAddressWhitelisted,
}) => {
  const { address, ethBalance } = useBepro();
  const [ amount, setAmount ] = useState(1);
  const [ status, setStatus ] = useState(null);
  const [ total, setTotal ] = useState(cost);
  const ready = !paused !== null;

  useEffect(() => {
    setTotal(cost * amount);
  }, [ amount, cost ]);

  useEffect(() => {
    let st;
    if (paused && !whitelistMintEnabled) {
      st = 'Closed';
    }
    else if (paused && whitelistMintEnabled) {
      st = 'Whitelist';
    }
    else if (!paused) {
      st = 'Open';
    }

    setStatus(st);
  }, [ whitelistMintEnabled, paused ]);

  return (
    <div className={ classnames('minting--container', 'minting--main-container', {}) }>
      { typeof window !== 'undefined' && (
        <>
          <div className="minting-container--title">

            <div className="minting-container--title-txt">
              <h4 className="mb-3">
                Mint
              </h4>

              <CollectionButtons contractAddress={ contractAddress } />
            </div>
          </div>

          { enabled && (
            <div>
              <div className="container minting-items">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="minting-item">
                      <div className="minting-item-subtitle minting-item-lbl">Sale Status</div>
                      <div className="minting-item-amount">
                        <Placeholder ready={ status }>
                        { status }
                        </Placeholder>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="minting-item">
                      <div className="minting-item-subtitle minting-item-lbl">Revealed</div>
                      <div className="minting-item-amount">
                        <Placeholder ready={ ready }>
                        { revealed ? 'Yes' : 'No' }
                        </Placeholder>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="minting-item">
                      <div className="minting-item-subtitle minting-item-lbl">Supply</div>
                      <div className="minting-item-amount">
                        <Placeholder ready={ ready }>
                        { `${totalSupply}/${maxSupply}` }
                        </Placeholder>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="minting-item">
                      <div className="minting-item-subtitle minting-item-lbl">Max tokens per mint</div>
                      <div className="minting-item-amount">
                        <Placeholder ready={ ready }>
                        { maxMintAmountPerTx }
                        </Placeholder>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="minting-item">
                      <div className="minting-item-subtitle minting-item-lbl">Balance</div>
                      <div className="minting-item-amount">
                        <Placeholder ready={ ready }>
                        <Price
                          eth={ ethBalance }
                          options={ { exact: true } }
                          output="eth"
                          showLabel
                        />
                        </Placeholder>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="minting-item">
                      <div className="minting-item-subtitle minting-item-lbl">NFT Price</div>
                      <div className="minting-item-amount">
                        <Placeholder ready={ ready }>
                        <Price
                          eth={ cost }
                          options={ { exact: true } }
                          output="eth"
                          showLabel
                        />
                        </Placeholder>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={ classnames('row', 'minting-actions', {
                    /*   'minting-actions--status-disabled': (address && ready) || (whitelistMintEnabled && address),
                  'minting-actions--blurred': (address && ready) || (whitelistMintEnabled && address), */
                  }) }
                >

                  { /*     { !!address && whitelistMintEnabled && !isAddressWhitelisted && (
                <span className="minting-actions--notice">
                  This address is not whitelisted
                </span>
                ) } */ }

                  <div className="col">
                    { !address && ready && <Wallet size="m" /> }

                    { !!address && ready && !approved && contractAddress && (
                    <ButtonApprove
                      contractAddress={ contractAddress }
                    />
                    ) }

                    { !!address && ready && approved && (
                    <div className="minting-item minting-action-wrapper">
                      <div className="minting-amount-title">Amount</div>
                      <div className="minting-amount-wrapper">
                        <Button
                          disabled={ amount <= 1 }
                          onClick={ () => {
                            if (amount >= 1) {
                              setAmount(amount - 1);
                            }
                          } }
                          theme="blue"
                          size="s"
                        >
                          -
                        </Button>

                        <div className="minting-amount">{ amount }</div>

                        <Button
                          disabled={ amount >= maxMintAmountPerTx }
                          onClick={ () => {
                            if (amount <= maxMintAmountPerTx) {
                              setAmount(amount + 1);
                            }
                          } }
                          theme="blue"
                          size="s"
                        >
                          +
                        </Button>
                      </div>

                      <div className="minting-info">
                        <div>
                          <strong>Total: </strong>
                          { ' ' }
                          <Price
                            eth={ total }
                            options={ { exact: true } }
                            output="eth"
                            showLabel
                          />
                        </div>

                        <div className="minting-notices">
                          { total > ethBalance && (
                            <span className="red">Insufficient ETH balance</span>
                          ) }
                        </div>
                      </div>

                      <div className="minting-button-wrapper">
                        <ButtonMint amount={ amount } contractAddress={ contractAddress } />

                      </div>
                      { !isAddressWhitelisted && whitelistMintEnabled && (
                      <small>Yout address is not whitelisted</small>
                      ) }
                    </div>
                    ) }
                  </div>
                </div>
              </div>
            </div>
          ) }

          { !enabled && (
            <div className="minting-items minting-items--coming-soon">
              <div>
                <span className="white-grad-title white-grad-title-35">MINTING COMING SOON</span>
                <p>Please check later</p>
              </div>
            </div>
          ) }
        </>
      ) }
    </div>
  );
};

MintWidget.propTypes = {
  approved: bool,
  enabled: bool,
  contractAddress: string,
  paused: bool,
  revealed: bool,
  cost: number,
  maxSupply: number,
  totalSupply: number,
  maxMintAmountPerTx: number,
  whitelistMintEnabled: bool,
  isAddressWhitelisted: bool,
};

MintWidget.defaultProps = {
  approved: null,
  enabled: null,
  contractAddress: null,
  paused: null,
  revealed: null,
  cost: null,
  maxSupply: null,
  totalSupply: null,
  maxMintAmountPerTx: null,
  whitelistMintEnabled: null,
  isAddressWhitelisted: null,
};

export default MintWidget;
