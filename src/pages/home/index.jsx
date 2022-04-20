import AppWrapper from 'containers/AppWrapper';
import InTransaction from 'components/InTransaction/InTransaction';
import PageContainer from 'components/Page/Container';
import MintWidget from 'components/Mint/Widget';
import MintCollection from 'components/Mint/Collection';
import NoticeNetwork from 'components/Notice/Network';
import Landing from 'components/Landing/Landing';

import useContracts from 'hooks/useContracts';
import { pageMeta } from 'config';

const Home = () => {
  const { collection } = useContracts();

  return (
    <AppWrapper>
      <Landing name={ pageMeta.title } />

      <div className="content">
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

        <div id="home-minting-wrapper" className="minting-wrapper">
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
                  <div id="collection-mint-widget" className="row mb-5">
                    <div className="col-12 col-lg-6 mb-5">
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
      </div>
    </AppWrapper>

  );
};

export default Home;
