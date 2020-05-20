import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", data = null, header = null) => {
      // useCalleback: make sure function doesnt recreate when the component using it is updated
      setIsLoading(true);
      const httpAbortCtrll = new AbortController();
      const headers = header ? { header } : null;
      activeHttpRequests.current.push(httpAbortCtrll); // make the request cancelable when we change the page and the request is still executing
      try {
        const response = await axios({
          method,
          url,
          data,
          headers,
          signal: httpAbortCtrll.signal,
        });
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrll
        );
        if (response.status === 200 || response.status === 201) {
          setIsLoading(false);
          return response;
        }
      } catch (err) {
        setError(err.response.data.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

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
