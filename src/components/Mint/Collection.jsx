import {
  arrayOf, bool, number, string, shape,
} from 'prop-types';
import classnames from 'classnames';

import ButtonAddress from 'components/Button/Address';
import Image from 'components/Image';
import Placeholder from 'components/Placeholder';

import './Collection.scss';

const MintCollection = ({
  balanceOf,
  contractAddress,
  name,
  isAddressWhitelisted,
  paused,
  revealed,
  symbol,
  userTokens,
  whitelistMintEnabled,
}) => (
  <div
    className={ classnames('minting--container', 'minting--main-container', 'minting--main-container', {
      /*   'collection-status--active': revealed,
        'collection-status--paused': paused,
        'collection-status--whitelist': whitelistMintEnabled && !paused, */
    }) }
  >

    <div className="minting-container--title">
      <div className="minting-container--title-txt">
        <h4 className="">
          My Collection of
          { ' ' }
          { name }
        </h4>

        { paused && whitelistMintEnabled && isAddressWhitelisted && (
          <p className="yellow mb-2">Whitelist collection</p>
        ) }

        { !revealed && (
          <p className="yellow mb-2">This collection has not been revealed yet.</p>
        ) }

        <div className="minting-item-subtitle minting-item-subtitle--smaller mb-3">
          <small>
            <ButtonAddress format>
              { contractAddress }
            </ButtonAddress>
          </small>
        </div>
        <h6>{ `Balance: ${balanceOf} ${symbol}` }</h6>
      </div>
    </div>

    <div className="container collection-items">
      <div className="row">
        { userTokens.map(token => (
          <div key={ `collection-item-${token?.tokenId}` } className="col-12 col-md-6 mb-4">
            <div className="collection-item text-center">
              <div className="collection-item-image mb-2">
                <Placeholder ready={ token?.image }>
                  <a href={ token?.image } target="_blank" rel="noreferrer">
                    <Image src={ token?.image } alt={ token?.tokenName } />
                  </a>
                </Placeholder>
              </div>
              <div className="collection-item-name">{ token?.tokenName }</div>
              <a href={ token?.image } target="_blank" rel="noreferrer">OpenSea</a>
            </div>
          </div>
        )) }

      </div>
    </div>

  </div>
);
MintCollection.propTypes = {
  balanceOf: number,
  name: string,
  contractAddress: string,
  isAddressWhitelisted: bool,
  paused: bool,
  revealed: bool,
  symbol: string,
  userTokens: arrayOf(shape({
    description: string,
    image: string,
    tokenId: string,
    tokenName: string,
    tokenURI: string,
  })),
  whitelistMintEnabled: bool,
};

MintCollection.defaultProps = {
  balanceOf: null,
  name: string,
  contractAddress: null,
  isAddressWhitelisted: null,
  paused: null,
  revealed: null,
  symbol: null,
  userTokens: null,
  whitelistMintEnabled: null,
};

export default MintCollection;
