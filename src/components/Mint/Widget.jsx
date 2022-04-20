/* eslint-disable react/jsx-indent */
import {
  bool, number, string,
} from 'prop-types';
import { useEffect, useState } from 'react';
import classnames from 'classnames';

import Button from 'components/Button/Button';
// import ButtonApprove from 'components/Button/Approve';
import ButtonMint from 'components/Button/Mint';
import CollectionButtons from 'components/Button/CollectionButtons';
import Placeholder from 'components/Placeholder';
import Price from 'components/Price';
import Wallet from 'components/Wallet/Wallet';

import useBepro from 'hooks/useBepro';

const MintWidget = ({
  balanceOf,
  erc20Name,
  erc20Symbol,
  erc20Enabled,
  erc20Minimum,
  erc20Balance,
  enabled,
  contractAddress,
  paused,
  revealed,
  cost,
  maxSupply,
  totalSupply,
  maxMintAmountPerTx,
  maxMintAmountPerWallet,
  whitelistMintEnabled,
  isAddressWhitelisted,
}) => {
  const { address, ethBalance } = useBepro();
  const [ amount, setAmount ] = useState(1);
  const [ status, setStatus ] = useState(null);
  const [ total, setTotal ] = useState(cost);
  const ready = !paused !== null;

  const maxMintAllowed = maxMintAmountPerWallet === -1
    ? '&#8734;'
    : maxMintAmountPerWallet - balanceOf;

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
              <h3 className="mb-3">
                Mint
              </h3>

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
                      <div className="minting-item-subtitle minting-item-lbl">Max per Wallet</div>
                      <div className="minting-item-amount">
                        <Placeholder ready={ ready }>
                          { maxMintAmountPerWallet === -1
                            ? <div>&#8734;</div>
                            : maxMintAmountPerWallet }
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
                  className="row minting-actions"
                >
                  <div className="col">
                    { !address && ready && <Wallet size="m" /> }

                    { !!address && ready /*  && approved */ && (
                    <div className="minting-item minting-action-wrapper">
                      <div className="minting-amount-title">Amount</div>
                      <div className="minting-amount-wrapper">
                        <Button
                          className="btn-amount"
                          disabled={ amount <= 1 }
                          onClick={ () => {
                            if (amount >= 1) {
                              setAmount(amount - 1);
                            }
                          } }
                          theme="yellow"
                          size="s"
                        >
                          -
                        </Button>

                        <div className="minting-amount">{ amount }</div>

                        <Button
                          className="btn-amount"
                          disabled={ amount >= maxMintAmountPerTx || amount >= maxMintAllowed }
                          onClick={ () => {
                            if (amount <= maxMintAmountPerTx || amount >= maxMintAllowed) {
                              setAmount(amount + 1);
                            }
                          } }
                          theme="yellow"
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
                          { erc20Enabled && erc20Balance < erc20Minimum && ready && (
                            <span className="red">
                              { `Your ${erc20Name} balance is ${erc20Balance} ${erc20Symbol}.` }
                              <br />
                              { ` You need a least ${erc20Minimum} ${erc20Symbol} to be able to mint.` }
                            </span>
                          ) }

                          { (balanceOf >= maxMintAmountPerWallet && maxMintAmountPerWallet !== -1) && (
                            <span className="red">
                              { `You can't mint more than ${maxMintAmountPerWallet} NFTs.` }
                            </span>
                          ) }

                          { !isAddressWhitelisted && whitelistMintEnabled && (
                            <small className="red">Your address is not whitelisted</small>
                          ) }
                        </div>
                      </div>

                      <div className="minting-button-wrapper">
                        <ButtonMint amount={ amount } contractAddress={ contractAddress } />
                      </div>
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
  /* approved: bool, */
  balanceOf: number,
  erc20Name: string,
  erc20Symbol: string,
  erc20Enabled: bool,
  erc20Minimum: number,
  erc20Balance: number,
  enabled: bool,
  contractAddress: string,
  paused: bool,
  revealed: bool,
  cost: number,
  maxSupply: number,
  totalSupply: number,
  maxMintAmountPerTx: number,
  maxMintAmountPerWallet: number,
  whitelistMintEnabled: bool,
  isAddressWhitelisted: bool,
};

MintWidget.defaultProps = {
  /* approved: null, */
  balanceOf: number,
  erc20Name: null,
  erc20Symbol: null,
  erc20Enabled: null,
  erc20Minimum: null,
  erc20Balance: null,
  enabled: null,
  contractAddress: null,
  paused: null,
  revealed: null,
  cost: null,
  maxSupply: null,
  totalSupply: null,
  maxMintAmountPerTx: null,
  maxMintAmountPerWallet: null,
  whitelistMintEnabled: null,
  isAddressWhitelisted: null,
};

export default MintWidget;
