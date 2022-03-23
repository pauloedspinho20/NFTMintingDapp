import { useMemo } from 'react';

import { getStorage } from 'hooks/useStorage';

import { maintenance, maintenanceMessage, maintenanceToken } from 'config';

const storage = getStorage(false);

// Maintenance Token
if (typeof window !== 'undefined') {
  const queryParams = new URLSearchParams(window.location.search);
  const queryKey = queryParams.get('token');
  if (queryKey) {
    storage.set('maintenanceToken', queryKey);
  }
}

const useMaintenance = () => useMemo(() => {
  if (maintenance) {
    const stored = storage.get('maintenanceToken');
    if (!stored || stored !== maintenanceToken) {
      return {
        locked: true,
      };
    }
  }

  return {
    message: maintenanceMessage,
  };
}, []);

export default useMaintenance;
