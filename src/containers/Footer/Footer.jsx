import Link from 'components/Link';
import Logo from 'components/Logo/Logo';
import NavigationSocialMedia from 'components/Navigation/SocialMedia';
import PageContainer from 'components/Page/Container';

const Footer = () => (
  <footer id="main-footer">
    <div className="footer-footnote">
      <PageContainer>
        <div className="row">
          <div className="col footer-footnote--col-1">
            <NavigationSocialMedia />
          </div>
          <div className="col footer-footnote--col-2">
            <div className="footer-copyright">{ `© ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_DAPP_NAME || 'NFTMintingDapp'} · All Rights Reserved` }</div>
          </div>
          <div className="col footer-footnote--col-3">
            <nav className="footer-footnote--nav">
              <ul>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </PageContainer>
    </div>
  </footer>
);

export default Footer;
