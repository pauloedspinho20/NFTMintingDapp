import { string } from 'prop-types';
import Countdown from 'components/Countdown/Countdown';
import PageContainer from 'components/Page/Container';

const Landing = ({ name }) => (
  <section className="section--home-hero">
    <PageContainer>
      <div className="hero">
        <div className="row">
          <div className="col-md-8 home-hero--col-1">
            <h1 className="home-hero--title">
              <span className="hero-title--line hero-title--line-2">{ name }</span>
            </h1>
            <p className="home-hero--desc">
              <strong>Next.js Dapp for quick NFT collection deployment and minting.</strong>
              <br />
              <br />
              <ul>
                <li>RC721 or ERC1155 Non-Fungible Token Smart Contract.</li>
                <li>Whitelist, Pre Sale and Public Sale with custom token prices.</li>
              </ul>
            </p>

            <Countdown />
          </div>
          <div className="col-md-4 home-hero--col-2" />
        </div>
      </div>
    </PageContainer>
  </section>
);

Landing.propTypes = {
  name: string,
};

Landing.defaultProps = {
  name: '',
};

export default Landing;
