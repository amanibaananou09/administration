import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

const useHttp = <T,>(
  requestFn: (arg?: any) => Promise<T>,
  start: boolean = true,
) => {
  const [isLoading, setIsLoading] = useState(start);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = useCallback(
    async (requestData?: any) => {
      setIsLoading(true);
      setError(null);

      try {
        const responseData = await requestFn(requestData);

        setData(responseData);
        return responseData;
      } catch (error) {
        console.error(error);
        setError((error as AxiosError).message);
      } finally {
        setIsLoading(false);
      }
    },
    [requestFn],
  );

  useEffect(() => {
    if (start) makeRequest();
  }, [start, makeRequest]);

  return { data, isLoading, makeRequest, error };
};

export default useHttp;
