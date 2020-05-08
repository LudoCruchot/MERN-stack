import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method, data) => {
    // usecallback pour pas que la fonction se recrée quand le composant qui l'utilise est maj
    setIsLoading(true);
    const httpAbortCtrll = new AbortController(); // permet d'annuler la requete si on change de page quand elle n'a pas fini de s'exécuter
    activeHttpRequests.current.push(httpAbortCtrll);
    try {
      const response = await axios({
        method,
        url,
        data,
        signal: httpAbortCtrll.signal,
      });
      activeHttpRequests.current = activeHttpRequests.current.filter(
        (reqCtrl) => reqCtrl !== httpAbortCtrll
      );
      if (response.status === 200 || response.status === 201) {
        return response;
      }
    } catch (err) {
      setError(err.response.data.message);
      throw err;
    }
    setIsLoading(false);
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return { isLoading, error, sendRequest, clearError };
};
