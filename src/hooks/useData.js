import { useEffect, useState } from 'react';
import { checkResponse } from '../services/dataFetchers';

// custom hook for fetching data in json type from any url
export const useData = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [tries, setTries] = useState(0);

  // when retry has been called hook tries to fetch data again
  const retry = () => {
    setTries((t) => t + 1);
  };

  // usually used before fetching to reset error state to normal
  const resetError = () => {
    setHasError(false);
  };

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      try {
        setHasError(false);
        setIsLoading(true);
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        });

        // check if response has errors
        checkResponse(response);

        const resJSON = await response.json();
        setIsLoading(false);
        if (!ignore) {
          // ignore setting data for dev mode which fetch calls twice
          setData(resJSON);
        }
      } catch (error) {
        setHasError(true);
        console.log(error.message);
      }
    };

    if (typeof url === 'string') {
      getData();
    }

    // if effect fires second time ignore first one
    return () => (ignore = true);
    // trigger if new url received or a try command sent
  }, [url, tries]);

  return { data, isLoading, hasError, retry, resetError };
};
