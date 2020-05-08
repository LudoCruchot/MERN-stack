import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback((url, method, data) => {
      // usecallback pour pas que la fonction se recrée quand le composant qui l'utilise est maj
      setIsLoading(true);
      const httpAbortCtrll = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrll);
      try {
        const response = await axios({
            method,
            url,
            data,
            signal: httpAbortCtrll.signal,
          });
          return response;
      } catch(err){
        setError(err.response.data.message);
      }
      setIsLoading(false);
  }, []);

  const clearError = ()=>{
      setError(null);
  }

  useEffect(()=>{
      return ()=>{
          activeHttpRequests.current.forEach(abortCtrl =>abortCtrl.abort());
      };
  }, []);
  return { isLoading, error, sendRequest, cleanError}
};
