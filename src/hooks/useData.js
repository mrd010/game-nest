import { useEffect, useState } from 'react';
import { checkResponse } from '../services/dataFetchers';

// custom hook for fetching data in json type from any url
export const useData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        });

        // check if response has errors
        checkResponse(response);

        const resJSON = await response.json();
        if (!ignore) {
          // ignore setting data for dev mode which fetch calls twice
          setData(resJSON);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getData();

    // if effect fires second time ignore first one
    return () => (ignore = true);
  }, [url]);

  return { data };
};
