import AppWrapper from 'containers/AppWrapper';
import InTransaction from 'components/InTransaction/InTransaction';
import PageContainer from 'components/Page/Container';
import MintCollection from 'components/Mint/Collection';
import NoticeNetwork from 'components/Notice/Network';

import useContracts from 'hooks/useContracts';
import { pageMeta } from 'config';

const Collection = () => {
  const { collection } = useContracts();

  return (
    <AppWrapper>
      <PageContainer>
        <div className="row justify-content-center">
          <div className="col col-md-8">
            <h2 className="page-main-title">{ pageMeta.title }</h2>
            <p className="page-main-subtitle">
              { pageMeta.description }
            </p>
          </div>
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
                  { collection?.balanceOf > 0 ? (
                    <div className="col-12 mb-30">
                      <MintCollection { ...collection } />
                    </div>
                  ) : (
                    <div className="col-12 mb-30 text-center">
                      <h6 className="mb-4">No NFTs minted</h6>
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

export default Collection;
