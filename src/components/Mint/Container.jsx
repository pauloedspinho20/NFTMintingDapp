import {
  arrayOf, bool, instanceOf, number, string,
} from 'prop-types';
import classnames from 'classnames';

import ExpandableItem from 'components/Mint/Expandable/Item/Item';
import ButtonApprove from 'components/Button/Approve';
import ButtonMint from 'components/Button/Mint';
import IconInfo from 'components/Icon/Info/Info';
import Placeholder from 'components/Placeholder';
import Price from 'components/Price';
import MintImage from 'components/Mint/Image';
import Wallet from 'components/Wallet/Wallet';

import useBepro from 'hooks/useBepro';

import infoIconGreen from './assets/info-icon-green.svg';
import infoIconPurple from './assets/info-icon-purple.svg';
import arrowWhite from './assets/arrow-white.svg';

import './Container.scss';

const MintContainer = ({
  active,
  approved,
  apr,
  balanceOfNFTS,
  closed,
  contractAddress,
  isLpPool,
  contractVersion,
  currentAmount,
  currentWithdrawalFeePercentage,
  description,
  duration,
  enabled,
  endDate,
  fetched,
  full,
  individualMinimumAmount,
  individualMaxAmount,
  isAddressWhitelisted,
  minNfts,
  myFEVREarned,
  myTotalStaked,
  network,
  productId,
  remainingTokensInPool,
  startDate,
  subscribers,
  status,
  title,
  whitelist,
  withdrawalFee,
  totalMaxAmount,
  tokenAddress,
}) => {
  const { address } = useBepro();

  const stakingItemClasses = classnames('minting-item', {
    'minting-item--nodata': !myTotalStaked,
  });

  const ready = active !== null;
  const startDateFormat = startDate?.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const endDateFormatted = endDate?.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  const infoIcon = (full ? infoIconPurple : infoIconGreen);

  return (
    <div
      className={ classnames('minting--container', 'minting--main-container', {
        'collection-status--active': active && !full && !closed && myTotalStaked === 0,
        'collection-status--full': full && !closed,
        'collection-status--ended': closed,
        'collection-status--whitelist': whitelist && !full && !closed && myTotalStaked === 0,
        'collection-status--staked': myTotalStaked > 0 && !closed,
      }) }
    >
      { !!status && (
        <div className="collection-status-badge">
          <span>{ status }</span>
        </div>
      ) }

      { whitelist && !full && !closed && myTotalStaked === 0 && (
        <div className="collection-status-badge">
          <span>Allowlist</span>
        </div>
      ) }

      <div className="minting-container--title">
        { network && (
          <MintImage
            alt={ title }
            isLpPool={ isLpPool }
            network={ network }
          />
        ) }

        <div className="minting-container--title-txt">
          <h3 className="white-grad-title white-grad-title-35">
            { title }
          </h3>
          <div className="minting-item-subtitle minting-item-subtitle--smaller">{ description }</div>
        </div>

        { fetched && (active || closed) && (
          <div className="minting-container--title-badge">
            { duration }
          </div>
        ) }
      </div>

      { (!fetched || active || closed) && enabled && (
      <div>
        <div className="container minting-items">
          <div className="row">
            <div className="col-md-6">
              <div className={ stakingItemClasses }>
                <div className="minting-item-subtitle minting-item-lbl">My FEVR earned</div>
                <div className="white-grad-title white-grad-title-30 minting-item-amount">
                  <Placeholder ready={ ready }>
                    <Price
                      fevr={ myFEVREarned }
                      options={ { exact: true } }
                      output="eth"
                      showLabel
                    />
                  </Placeholder>
                </div>
                <div className="minting-item-subtitle minting-item-exchange">
                  <Placeholder ready={ ready }>
                    <Price
                      fevr={ myFEVREarned }
                      options={ { exact: true } }
                      output="dollar"
                    />
                  </Placeholder>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="minting-item">
                <div className="minting-item-subtitle minting-item-lbl">
                  { isLpPool ? 'Total LP staked' : 'Total staked' }
                </div>
                <div className="white-grad-title white-grad-title-30 minting-item-amount">
                  <Placeholder ready={ ready }>
                    <Price
                      fevr={ currentAmount }
                      options={ { exact: true } }
                      output="eth"
                      showLabel
                    />
                  </Placeholder>
                </div>
                { !isLpPool && (
                  <div className="minting-item-subtitle minting-item-exchange">
                    <Placeholder ready={ ready }>
                      <Price
                        fevr={ currentAmount }
                        options={ { exact: true } }
                        output="dollar"
                        showLabel
                      />
                    </Placeholder>
                  </div>
                ) }
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className={ stakingItemClasses }>
                <div className="minting-item-subtitle minting-item-lbl">
                  { isLpPool ? 'My Total LP staked' : 'My Total staked' }
                </div>
                <div className="white-grad-title white-grad-title-30 minting-item-amount">
                  <Placeholder ready={ ready }>
                    <Price
                      fevr={ myTotalStaked }
                      options={ { exact: true } }
                      output="eth"
                      showLabel
                    />
                  </Placeholder>
                </div>
                { !isLpPool && (
                  <div className="minting-item-subtitle minting-item-exchange">
                    <Placeholder ready={ ready }>
                      <Price
                        fevr={ myTotalStaked }
                        options={ { exact: true } }
                        output="dollar"
                        showLabel
                      />
                    </Placeholder>
                  </div>
                ) }
              </div>
            </div>

            <div className="col-md-6">
              <div className="minting-item">
                <div className="minting-item-subtitle minting-item-lbl">APR</div>
                <div className="white-grad-title white-grad-title-30 minting-item-amount">
                  <Placeholder ready={ ready }>
                    { `${apr}%` }
                  </Placeholder>
                </div>
                <div className="minting-item-subtitle minting-item-exchange" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="minting-item">
                <div className="minting-item-subtitle minting-item-lbl">Remaining tokens in Pool</div>
                <div className="white-grad-title white-grad-title-30 minting-item-amount">
                  <Placeholder ready={ ready }>
                    <Price
                      fevr={ remainingTokensInPool }
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
              'minting-actions--status-disabled': (address && ready && balanceOfNFTS < minNfts) || (whitelist && !isAddressWhitelisted && address),
              'minting-actions--blurred': (address && ready && balanceOfNFTS < minNfts) || (whitelist && !isAddressWhitelisted && address),
            }) }
          >
            { !!address && balanceOfNFTS < minNfts && (
            <span className="minting-actions--notice">
              { `You currently have ${balanceOfNFTS} minted NFTs from a total of ${minNfts} required to stake in this collection.` }
            </span>
            ) }

            { !!address && whitelist && !isAddressWhitelisted && (
            <span className="minting-actions--notice">
              You are not in the allowlist for this collection.
            </span>
            ) }

            <div className="col">
              { !address && ready && <Wallet size="m" /> }

              { !!address && ready && !approved && contractAddress && contractVersion
                  && (
                  <ButtonApprove
                    contractAddress={ contractAddress }
                    contractVersion={ contractVersion }
                    lpErc20contractAddress={ isLpPool ? tokenAddress : null }
                  />
                  ) }

              { !!address && ready && approved && (
              <div>
                <ButtonMint productId={ productId } contractAddress={ contractAddress } />
              </div>
              ) }
            </div>
          </div>
        </div>

        <div>
          <div className="relative">
            <div className="minting-container--complementary-info">
              { !!address && ready && (active || closed) && (
                active ? `POOL ENDS ON ${endDateFormatted}` : `POOL ENDED ON ${endDateFormatted}`
              ) }
            </div>

            { !!address && ready && (
            <ul className="expandable-items--container">
              <ExpandableItem
                title="DETAILS"
                icon={ arrowWhite }
              >
                <div className="container minting-items">
                  <div className="minting-container--complementary-info">
                    { !!address && ready && (
                      `POOL STARTED ON ${startDateFormat}`
                    ) }
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="minting-item">
                        <div className="minting-item-subtitle minting-item-lbl">
                          Min Stake per User
                        </div>
                        <div className="white-grad-title white-grad-title-30 minting-item-amount">
                          <Placeholder ready={ ready }>
                            <Price
                              fevr={ individualMinimumAmount }
                              options={ { exact: true } }
                              output="eth"
                              showLabel
                            />
                          </Placeholder>
                        </div>
                        { !isLpPool && (
                        <div className="minting-item-subtitle minting-item-exchange">
                          <Placeholder ready={ ready }>
                            <Price
                              fevr={ individualMinimumAmount }
                              options={ { exact: true } }
                              output="dollar"
                            />
                          </Placeholder>
                        </div>
                        ) }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="minting-item">
                        <div className="minting-item-subtitle minting-item-lbl">
                          Max Stake per User
                          { contractAddress && productId && (
                          <IconInfo
                            alt="The maximum number of FEVR each user can stake on this specific collection."
                            id={ `max-stake-per-user-${contractAddress}-${productId}` }
                            src={ infoIcon }
                          />
                          ) }
                        </div>
                        <div className="white-grad-title white-grad-title-30 minting-item-amount">
                          <Placeholder ready={ ready }>
                            <Price
                              fevr={ individualMaxAmount }
                              options={ { exact: true } }
                              output="eth"
                              showLabel
                            />
                          </Placeholder>
                        </div>
                        { !isLpPool && (
                        <div className="minting-item-subtitle minting-item-exchange">
                          <Placeholder ready={ ready }>
                            <Price
                              fevr={ individualMaxAmount }
                              options={ { exact: true } }
                              output="dollar"
                            />
                          </Placeholder>
                        </div>
                        ) }
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="minting-item">
                        <div className="minting-item-subtitle minting-item-lbl">Pool subscribers</div>
                        <div className="white-grad-title white-grad-title-30 minting-item-amount">
                          <Placeholder ready={ ready }>
                            { subscribers?.length || 0 }
                            { ' ' }
                            wallets
                          </Placeholder>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="minting-item">
                        <div className="minting-item-subtitle minting-item-lbl">Pool Size</div>
                        <div className="white-grad-title white-grad-title-30 minting-item-amount">
                          <Placeholder ready={ ready }>
                            <Price
                              fevr={ totalMaxAmount }
                              options={ { exact: true } }
                              output="eth"
                              showLabel
                            />
                          </Placeholder>
                        </div>
                        <div className="minting-item-subtitle minting-item-exchange">
                          <Placeholder ready={ ready }>
                            <Price
                              fevr={ totalMaxAmount }
                              options={ { exact: true } }
                              output="dollar"
                            />
                          </Placeholder>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="minting-item">
                        <div className="minting-item-subtitle minting-item-lbl">Withdrawal Fee</div>
                        <div className="white-grad-title white-grad-title-30 minting-item-amount">
                          <Placeholder ready={ ready }>
                            { withdrawalFee ? 'YES' : 'NO' }
                          </Placeholder>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="minting-item">
                        <div className="minting-item-subtitle minting-item-lbl">
                          Current Withdrawal Fee
                          { contractAddress && productId && contractVersion === 2 && (
                            <IconInfo
                              alt="Current Withdrawal Fee"
                              id={ `current-withdraw-fee-${contractAddress}-${productId}` }
                              src={ infoIcon }
                            />
                          ) }
                        </div>
                        <div className="white-grad-title white-grad-title-30 minting-item-amount">
                          <Placeholder ready={ ready }>
                            { `${currentWithdrawalFeePercentage}%` }
                          </Placeholder>
                        </div>
                        <div className="minting-item-subtitle minting-item-exchange">
                          <Placeholder ready={ ready }>
                            Of total value
                          </Placeholder>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="minting-item">
                        <div className="minting-item-subtitle minting-item-lbl">Whitelist</div>
                        <div className="white-grad-title white-grad-title-30 minting-item-amount">
                          <Placeholder ready={ ready }>
                            { whitelist ? 'YES' : 'NO' }
                          </Placeholder>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="minting-item">
                        <div className="minting-item-subtitle minting-item-lbl">
                          Min NFTs
                          { contractAddress && productId && (
                          <IconInfo
                            alt="Minimum number of NFTs each user have to own to enter this specific collection."
                            id={ `min-nfts-${contractAddress}-${productId}` }
                            src={ infoIcon }
                          />
                          ) }
                        </div>
                        <div className="white-grad-title white-grad-title-30 minting-item-amount">
                          <Placeholder ready={ ready }>
                            { minNfts }
                          </Placeholder>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </ExpandableItem>
            </ul>
            ) }
          </div>
        </div>
      </div>
      ) }

      { ((!fetched && !enabled) || (fetched && !active && !closed && !full)) && (
      <div className="minting-items minting-items--coming-soon">
        <div>
          <span className="white-grad-title white-grad-title-35">POOL COMING SOON</span>
          <p>Check back later for more details</p>
        </div>
      </div>
      ) }
    </div>
  );
};

MintContainer.propTypes = {
  active: bool,
  approved: bool,
  apr: number,
  balanceOfNFTS: number,
  closed: bool,
  contractAddress: string,
  isLpPool: bool,
  contractVersion: number,
  currentAmount: number,
  currentWithdrawalFeePercentage: number,
  description: string,
  duration: string,
  enabled: bool,
  endDate: instanceOf(Date),
  fetched: bool,
  full: bool,
  individualMinimumAmount: number,
  individualMaxAmount: number,
  isAddressWhitelisted: bool,
  minNfts: number,
  myFEVREarned: number,
  myTotalStaked: number,
  network: string,
  productId: number,
  remainingTokensInPool: number,
  subscribers: arrayOf(string),
  startDate: instanceOf(Date),
  status: string,
  title: string,
  whitelist: bool,
  withdrawalFee: bool,
  totalMaxAmount: number,
  tokenAddress: string,
};

MintContainer.defaultProps = {
  active: null,
  approved: null,
  apr: 0,
  balanceOfNFTS: null,
  closed: false,
  contractAddress: '',
  isLpPool: null,
  contractVersion: null,
  currentAmount: 0,
  currentWithdrawalFeePercentage: 0,
  description: '',
  duration: '',
  enabled: null,
  endDate: null,
  fetched: false,
  full: false,
  individualMinimumAmount: 0,
  individualMaxAmount: 0,
  isAddressWhitelisted: null,
  minNfts: 1,
  myFEVREarned: 0,
  myTotalStaked: 0,
  network: '',
  productId: 0,
  remainingTokensInPool: 0,
  subscribers: null,
  startDate: null,
  status: '',
  title: '',
  whitelist: false,
  withdrawalFee: false,
  totalMaxAmount: 0,
  tokenAddress: null,
};

export default MintContainer;
