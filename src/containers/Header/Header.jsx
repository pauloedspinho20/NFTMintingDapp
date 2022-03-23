import Navigation from 'components/Navigation/Navigation';
import NavigationMobile from 'components/Navigation/Mobile';
import UpperHeader from 'containers/UpperHeader/UpperHeader';

const Header = () => (
  <>
    <UpperHeader />
    <Navigation />
    <NavigationMobile />
  </>
);

export default Header;
