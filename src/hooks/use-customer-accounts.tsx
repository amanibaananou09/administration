import { CustomerAccount } from "common/AdminModel";
import { getCustomerAccounts } from "common/api/customerAccount-api";
import { useEffect, useState } from "react";

const useCustomerAccounts = () => {
  const [customerAccounts, setCustomerAccounts] = useState<CustomerAccount[]>(
    [],
  );

  useEffect(() => {
    const getListOfAccounts = async () => {
      const result = await getCustomerAccounts();
      setCustomerAccounts(result);
    };

    getListOfAccounts();
  }, []);

  return {
    customerAccounts,
  };
};

export default useCustomerAccounts;
