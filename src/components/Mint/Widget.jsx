import {
  bool, number, string,
} from 'prop-types';
import { useEffect, useState } from 'react';
import classnames from 'classnames';

import Button from 'components/Button/Button';
import ButtonAddress from 'components/Button/Address';
import ButtonApprove from 'components/Button/Approve';
import ButtonMint from 'components/Button/Mint';
import Placeholder from 'components/Placeholder';
import Price from 'components/Price';
import Wallet from 'components/Wallet/Wallet';

import useBepro from 'hooks/useBepro';

import './Widget.scss';

const MintWidget = ({
  approved,
  enabled,
  contractAddress,
  name,
  paused,
  revealed,
  symbol,
  balanceOf,
  cost,
  maxSupply,
  totalSupply,
  maxMintAmountPerTx,
  uriPrefix,
  hiddenMetadataUri,
  whitelistMintEnabled,
  whitelistClaimed,
  isAddressWhitelisted,
}) => {
  const { address, ethBalance } = useBepro();
  const [ amount, setAmount ] = useState(1);
  const [ total, setTotal ] = useState(cost);
  const ready = !paused !== null;

  useEffect(() => {
    setTotal(cost * amount);
  }, [ amount, cost ]);

  console.log('MintWidget', approved,
    enabled,
    contractAddress,
    name,
    paused,
    revealed,
    symbol,
    balanceOf,
    cost,
    maxSupply,
    totalSupply,
    maxMintAmountPerTx,
    uriPrefix,
    hiddenMetadataUri,
    whitelistMintEnabled,
    whitelistClaimed,
    isAddressWhitelisted);

  return (
    <div
      className={ classnames('minting--container', 'minting--main-container', {
        'collection-status--active': revealed,
        'collection-status--paused': paused,
        'collection-status--whitelist': whitelistMintEnabled && !paused,
      }) }
    >

      <div className="minting-container--title">

        <div className="minting-container--title-txt">
          <h2 className="">
            { name }
          </h2>
          <div className="minting-item-subtitle minting-item-subtitle--smaller">
            <ButtonAddress>{ contractAddress }</ButtonAddress>
          </div>
        </div>

        { /*  <div className="minting-container--title-badge">
          { name }
        </div> */ }

      </div>

      { enabled && (
      <div>
        <div className="container minting-items">
          <div className="row">
            <div className="col-md-6">
              <div className="minting-item">
                <div className="minting-item-subtitle minting-item-lbl">Sale Status</div>
                <div className="minting-item-amount">
                  <Placeholder ready={ ready }>
                    { paused ? 'Closed' : 'Open' }
                  </Placeholder>
                </div>
              </div>
            </div>

            <div className="col-md-6">
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
            <div className="col">
              <div className="minting-item">
                <div className="minting-item-subtitle minting-item-lbl">Supply</div>
                <div className="minting-item-amount">
                  <Placeholder ready={ ready }>
                    { `${totalSupply}/${maxSupply} ${symbol}` }
                  </Placeholder>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="minting-item">
                <div className="minting-item-subtitle minting-item-lbl">Max NFTs per mint</div>
                <div className="minting-item-amount">
                  <Placeholder ready={ ready }>
                    { maxMintAmountPerTx }
                  </Placeholder>
                </div>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col">
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

            <div className="col">
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
                </div>
              ) }
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h3 className="">
                My collection
              </h3>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="minting-item">
                <div className="minting-item-subtitle minting-item-lbl">Balance</div>
                <div className="minting-item-amount">
                  <Placeholder ready={ ready }>
                    { balanceOf }
                  </Placeholder>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) }

      { !enabled && (
      <div className="minting-items minting-items--coming-soon">
        <div>
          <span className="white-grad-title white-grad-title-35">COLLECTION COMING SOON</span>
          <p>Please check later</p>
        </div>
      </div>
      ) }
    </div>
  );
};

MintWidget.propTypes = {
  approved: bool,
  enabled: bool,
  contractAddress: string,
  name: string,
  paused: bool,
  revealed: bool,
  symbol: string,
  balanceOf: number,
  cost: number,
  maxSupply: number,
  totalSupply: number,
  maxMintAmountPerTx: number,
  uriPrefix: string,
  hiddenMetadataUri: string,
  whitelistMintEnabled: bool,
  whitelistClaimed: bool,
  isAddressWhitelisted: bool,
};

MintWidget.defaultProps = {
  approved: null,
  enabled: null,
  contractAddress: null,
  name: null,
  paused: null,
  revealed: null,
  symbol: null,
  balanceOf: null,
  cost: null,
  maxSupply: null,
  totalSupply: null,
  maxMintAmountPerTx: null,
  uriPrefix: null,
  hiddenMetadataUri: null,
  whitelistMintEnabled: null,
  whitelistClaimed: null,
  isAddressWhitelisted: null,
};

export default MintWidget;
