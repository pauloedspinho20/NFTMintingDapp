import InTransaction from 'components/InTransaction/InTransaction';
import PageContainer from 'components/Page/Container';
import MintWidget from 'components/Mint/Widget';
import MintCollection from 'components/Mint/Collection';
import Notice from 'components/Notice/Notice';

import useContracts from 'hooks/useContracts';
import useBepro from 'hooks/useBepro';

import './style.scss';

const MintPage = () => {
  const { collection } = useContracts();
  const { networkActive, networkWanted } = useBepro();

  return (
    <>
      <PageContainer>
        <div className="row">
          <h2 className="page-main-title">NFTMintingDapp</h2>
          <span className="page-main-subtitle">Template for ERC721 NFT minting Dapps</span>
        </div>
      </PageContainer>

      <div className="minting-wrapper">
        <section className="minting--section">
          <PageContainer>

            { networkWanted && networkActive && networkActive !== 'eth' && (
            <div className="row">
              <div className="col-12 col-lg-6 mb-30">
                <Notice>
                  <div>
                    <b>NOT MAINNET! </b>
                    { `This app is using ${networkWanted} network.` }
                  </div>

                  { networkActive === networkWanted ? (
                    <div>
                      <br />
                      If you need testnet ETH, get it
                      { ' ' }
                      <a href=" https://rinkebyfaucet.com/" target="_blank">here</a>
                      { ' ' }
                      or
                      { ' ' }
                      <a href=" https://faucets.chain.link/rinkeby" target="_blank">here</a>
                      .
                    </div>
                  ) : (
                    <div>
                      <br />
                      { `Your wallet is on ${networkActive}. Please select ${networkWanted} network on your wallet.` }
                    </div>
                  ) }
                </Notice>
              </div>
            </div>
            ) }

            { !collection ? (
              <div className="row">
                <div className="minting--section-loading">
                  <small><InTransaction label="Loading collection…" /></small>
                </div>
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-12 col-lg-6 mb-30">
                    <MintWidget { ...collection } />
                  </div>
                  { collection?.balanceOf > 0 && (
                    <div className="col-12 col-lg-6 mb-30">
                      <MintCollection { ...collection } />
                    </div>
                  ) }
                </div>
              </>
            ) }
          </PageContainer>
        </section>
      </div>
    </>
  );
};

export default MintPage;
