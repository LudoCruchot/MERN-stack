import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method = "GET", data = null) => {
    // useCalleback: make sure function doesnt recreate when the component using it is updated
    setIsLoading(true);
    const httpAbortCtrll = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrll); // make the request cancelable when we change the page and the request is still executing
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
