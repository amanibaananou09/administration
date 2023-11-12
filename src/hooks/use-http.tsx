import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useAuth } from "store/AuthContext";

const useHttp = (
  requestFn: (arg: any) => Promise<any>,
  defaultLoadingState: boolean = true,
) => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(defaultLoadingState);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<AxiosError | null>();

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
        if (error instanceof AxiosError) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [user, requestFn],
  );

  return {
    makeRequest,
    data,
    isLoading,
    error,
  };
};

export default useHttp;
