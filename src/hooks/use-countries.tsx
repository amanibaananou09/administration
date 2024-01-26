import { useQuery } from "@tanstack/react-query";
import { getListOfCountry } from "common/api/reference-data-api";

const useCountries = () => {
  const { data: countries, isPending } = useQuery({
    queryKey: ["countries"],
    queryFn: getListOfCountry,
    staleTime: Infinity,
  });

  return {
    countries,
    isLoading: isPending,
  };
};

export default useCountries;
