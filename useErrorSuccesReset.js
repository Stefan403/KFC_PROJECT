import { useState, useCallback } from "react";

const useErrorSuccesReset = () => {
  const [errorText, setErrorText] = useState();
  const [succesText, setSuccesText] = useState();

  const setError = useCallback((value) => {
    setErrorText(true);
    setSuccesText(false);
  }, []);

  const setSucces = useCallback(() => {
    setErrorText(false);
    setSuccesText(true);
  }, []);

  const resetStatus = useCallback(() => {
    setErrorText(false);
    setSuccesText(false);
  }, []);

  return { resetStatus, setError, setSucces, errorText, succesText };
};

export default useErrorSuccesReset;
