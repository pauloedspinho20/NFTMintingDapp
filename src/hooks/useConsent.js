import { useMemo } from 'react';
import { createGlobalState } from 'react-hooks-global-state';

import cookieConsent from 'utils/cookieConsent';

const { setGlobalState, useGlobalState } = createGlobalState({
  // consent: cookieConsent.read(),
  // Disabled for now, pending Cookies Banner copy approval
  consent: true,
});

cookieConsent.listen(newConsent => setGlobalState('consent', newConsent));

const useConsent = consentType => {
  const [ consent ] = useGlobalState('consent');

  return useMemo(() => [
    consent && typeof consent !== 'boolean' && consentType ? consent[consentType] : consent,

    value => {
      cookieConsent.save(
        consentType
          ? {
            ...consent,
            [consentType]: value,
          }
          : {
            ...consent,
            ...value,
          },
      );
    },
  ], [ consent, consentType ]);
};

export default useConsent;
