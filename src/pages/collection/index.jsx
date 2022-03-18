import InTransaction from 'components/InTransaction/InTransaction';
import PageContainer from 'components/Page/Container';
import MintCollection from 'components/Mint/Collection';
import NoticeNetwork from 'components/Notice/Network';

import useContracts from 'hooks/useContracts';

import './style.scss';

const CollectionPage = () => {
  const { collection } = useContracts();

  return (
    <>
      <PageContainer>
        <div className="row">
          <h2 className="page-main-title">Collection</h2>
          <span className="page-main-subtitle">{ collection?.name }</span>
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

export default CollectionPage;
