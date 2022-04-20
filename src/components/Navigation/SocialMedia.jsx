import { socialLinks } from 'config';

const NavigationSocialMedia = () => (
  <nav className="social-media-nav">
    <ul>
      { socialLinks.map(item => (
        <li key={ item.label }>
          <a
            className={ `social-item social-${item.logo}` }
            href={ item.link }
            rel="noreferrer"
            target="_blank"
            title={ item.label }
          >
            <svg src={ `/media/ico-social-${item.logo}.svg` } alt={ item.label } />
          </a>
        </li>
      )) }
    </ul>
  </nav>
);

export default NavigationSocialMedia;
