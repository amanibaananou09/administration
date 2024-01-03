import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

const useHttp = <T,>(
  requestFn: (...arg: any) => Promise<T>,
  start: boolean = true,
) => {
  const [isLoading, setIsLoading] = useState(start);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const toast = useToast({
    position: "bottom-left",
    status: "error",
    isClosable: true,
  });

  const makeRequest = useCallback(
    async (...args: Parameters<typeof requestFn>): Promise<T> => {
      setIsLoading(true);
      setError(undefined);

      try {
        const responseData = await requestFn(...args);

        setData(responseData);
        return responseData;
      } catch (error) {
        const err = error as AxiosError<string>;
        setError(err.response?.data);
        console.error(err);
        toast({
          description: err.response?.data,
        });
        throw error;
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
