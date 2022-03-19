import AppWrapper from 'containers/AppWrapper';
import InTransaction from 'components/InTransaction/InTransaction';
import PageContainer from 'components/Page/Container';
import MintWidget from 'components/Mint/Widget';
import NoticeNetwork from 'components/Notice/Network';

import useContracts from 'hooks/useContracts';

const MintPage = () => {
  const { collection } = useContracts();

  return (
    <AppWrapper>
      <PageContainer>
        <div className="row">
          <h2 className="page-main-title">Mint</h2>
          <span className="page-main-subtitle">
            Max of
            { ' ' }
            { collection?.maxMintAmountPerTx }
            { ' ' }
            per mint
          </span>
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
                <div className="row">
                  <div className="col-12 col-lg-6 mb-30">
                    <MintWidget { ...collection } />
                  </div>
                </div>
              </>
            ) }
          </PageContainer>
        </section>
      </div>
    </AppWrapper>
  );
};

export default MintPage;
