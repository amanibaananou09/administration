import { CustomerAccount, CustomerAccountFormValues } from "common/AdminModel";
import { Mode } from "common/enums";

/**
 * Customer Account form utils
 */

export const customerAccountInitFormValues = {
  mode: Mode.CREATE,
  name: "",
  resaleRight: false,
  status: "ENABLED",
  confirmPassword: "",
  parentId: "",
  creatorAccountId: "",
  username: "",
  originalUsername: "",
  email: "",
  originalEmail: "",
  firstName: "",
  lastName: "",
  password: "",
  phone: "",
  paymentMethods: [
    {
      code: "",
    },
  ],
};

export const customerAccountToFormValues = (
  customerAccount: CustomerAccount,
): CustomerAccountFormValues => {
  const {
    id,
    name,
    creatorAccountId,
    parentId,
    resaleRight,
    paymentMethods,
    status,
    masterUser,
  } = customerAccount;

  const { username, firstName, lastName, email, phone } = masterUser;

  return {
    id,
    name,
    creatorAccountId,
    parentId,
    resaleRight,
    status,
    username,
    originalUsername: username,
    email,
    originalEmail: email,
    firstName,
    lastName,
    phone,
    paymentMethods,
  };
};

export const formValuesToCustomerAccount = (
  values: CustomerAccountFormValues,
): CustomerAccount => {
  const {
    id,
    name,
    creatorAccountId,
    parentId,
    resaleRight,
    username,
    email,
    firstName,
    lastName,
    password,
    phone,
    paymentMethods,
    status,
  } = values;

  return {
    id,
    name,
    creatorAccountId,
    parentId,
    resaleRight,
    paymentMethods,
    status,
    masterUser: {
      username,
      email,
      firstName,
      lastName,
      password,
      phone,
    },
  };
};
