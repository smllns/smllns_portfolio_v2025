// Shows the loader once per session.
import { useEffect, useState } from 'react';

export const usePageLoader = (sessionKey = 'hasShownLoader') => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem(sessionKey);
    if (!hasShown) {
      setLoading(true);
      sessionStorage.setItem(sessionKey, 'true');
    }
  }, [sessionKey]);

  const onLoaded = () => setLoading(false);

  return { loading, onLoaded };
};
