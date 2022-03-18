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

const MintCollection = ({
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

  return (
    <div
      className={ classnames('minting--container', 'minting--main-container', 'minting--main-container' {
      /*   'collection-status--active': revealed,
        'collection-status--paused': paused,
        'collection-status--whitelist': whitelistMintEnabled && !paused, */
      }) }
    >

      <div className="minting-container--title">
        <div className="minting-container--title-txt">
          <h4 className="">
            My Collection
          </h4>
          <div className="minting-item-subtitle minting-item-subtitle--smaller">
            <ButtonAddress>{ contractAddress }</ButtonAddress>
          </div>
        </div>
      </div>

      { enabled && (
      <div>
        <div className="container minting-items">

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

          <div className="row">
            <div className="col-md-6">
              <div className="collection-item">
              <Placeholder ready={ ready }>
                    { revealed ? 'Yes' : 'No' }
                  </Placeholder>
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

MintCollection.propTypes = {
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

MintCollection.defaultProps = {
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

export default MintCollection;
