import Cookies from 'js-cookie';
import EventEmitter from 'events';

const cookieName = 'CookieConsent';

// Set the emitter on the window context, to allow for a shared instance between contexts;
// i.e. react vs non-react

const eeConsent = typeof window !== 'undefined'
  ? window.eeConsent || (window.eeConsent = new EventEmitter())
  : {
    on: () => {},
    off: () => {},
  };

const cookieConsent = {
  listen: handler => eeConsent.on('consentUpdated', handler),
  unlisten: handler => eeConsent.off('consentUpdated', handler),

  read: consentType => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const saved = JSON.parse(Cookies.get(cookieName));
      return saved && typeof saved !== 'boolean' && consentType ? saved[consentType] : saved;
    }
    catch (ex) {
      return null;
    }
  },

  save: value => {
    Cookies.set(cookieName, JSON.stringify(value), {
      expires: 365,
      sameSite: 'strict',
    });

    eeConsent.emit('consentUpdated', value);
  },
};

export default cookieConsent;
