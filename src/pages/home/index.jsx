import AppWrapper from 'containers/AppWrapper';
import InTransaction from 'components/InTransaction/InTransaction';
import PageContainer from 'components/Page/Container';
import MintWidget from 'components/Mint/Widget';
import MintCollection from 'components/Mint/Collection';
import NoticeNetwork from 'components/Notice/Network';

import useContracts from 'hooks/useContracts';

const HomePage = () => {
  const { collection } = useContracts();

  return (
    <AppWrapper>
      <PageContainer>
        <div className="row">
          <h2 className="page-main-title">{ process.env.NEXT_PUBLIC_DAPP_NAME || 'NFTMintingDapp' }</h2>
          <span className="page-main-subtitle">Template for ERC721 NFT minting Dapps</span>
        </div>
      </PageContainer>

      <div className="minting-wrapper">
        <section className="minting--section">
          <PageContainer>

            <NoticeNetwork />

            { !collection ? (
              <div className="row">
                <div className="minting--section-loading">
                  <small><InTransaction label="Loading collection…" /></small>
                </div>
              </div>
            ) : (
              <>
                <div className="row mb-5">
                  <div className="col-12 col-md-6 mb-5">
                    <MintWidget { ...collection } />
                  </div>
                </div>
                <div className="row">
                  { collection?.balanceOf > 0 && (
                    <div className="col-12 mb-30">
                      <MintCollection { ...collection } />
                    </div>
                  ) }
                </div>
              </>
            ) }
          </PageContainer>
        </section>
      </div>
    </AppWrapper>
  );
};

export default HomePage;
