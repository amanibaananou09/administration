import { CustomerAccount } from "common/AdminModel";
import { listOfCreator } from "common/api/station-api";
import { useEffect } from "react";
import { useAuth } from "store/AuthContext";
import useHttp from "./use-http";

const useCreators = () => {
  const { user } = useAuth();

  const { data: creators, makeRequest: fetch } = useHttp<CustomerAccount[]>(
    listOfCreator,
    false,
  );

  useEffect(() => {
    try {
      fetch(user?.customerAccountId);
    } catch (error) {
      console.error("Error while fetching creators");
    }
  }, []);

  return {
    creators,
  };
};

export default useCreators;
