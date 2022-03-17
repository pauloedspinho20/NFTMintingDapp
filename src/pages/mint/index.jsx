import InTransaction from 'components/InTransaction/InTransaction';
import PageContainer from 'components/Page/Container';
import MintWidget from 'components/Mint/Widget';

import useContracts from 'hooks/useContracts';
import './style.scss';

const MintPage = () => {
  const { collection } = useContracts();

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
            <div className="row">
              { !collection ? (
                <div className="minting--section-loading">
                  <InTransaction label="Loading…" />
                </div>
              ) : (
                <div className="col-12 col-lg-6 mb-30">
                  <MintWidget { ...collection } />
                </div>
              ) }

            </div>
          </PageContainer>
        </section>

      </div>
    </>
  );
};

export default MintPage;
