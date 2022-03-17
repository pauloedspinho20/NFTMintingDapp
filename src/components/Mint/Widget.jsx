import {
  bool, number, string,
} from 'prop-types';
import classnames from 'classnames';

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

  const ready = !paused !== null;

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
        'pool-status--active': revealed,
        'pool-status--full': paused,
        'pool-status--ended': paused,
        'pool-status--whitelist': whitelistMintEnabled && !paused,
      }) }
    >
      { !paused && (
        <div className="pool-status-badge">
          <span>{ paused ? 'Paused' : '' }</span>
        </div>
      ) }

      <div className="minting-container--title">

        <div className="minting-container--title-txt">
          <h2 className="">
            Mint
            { ' ' }
            { symbol }
            { ' ' }
            NFT
          </h2>
          <div className="minting-item-subtitle minting-item-subtitle--smaller">
            { contractAddress }
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
                <div className="minting-item-subtitle minting-item-lbl">Minted</div>
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
                <div className="minting-item-subtitle minting-item-lbl">Minting Price</div>
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
              <div>
                <ButtonMint amount={ 1 } contractAddress={ contractAddress } />
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
