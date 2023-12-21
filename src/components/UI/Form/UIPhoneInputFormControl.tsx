import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { PhoneInput } from "components/Input/PhoneInput";
import { FormikProps, getIn } from "formik";

type UIPhoneInputFormControlProps = {
  formik: FormikProps<any>;
  fieldName: string;
  label: string;
};

const UIPhoneInputFormControl = ({
  formik,
  fieldName,
  label,
}: UIPhoneInputFormControlProps) => {
  const invalid =
    getIn(formik.errors, fieldName) && getIn(formik.touched, fieldName);
  const val = getIn(formik.values, fieldName);
  const changeHandler = formik.handleChange;
  const blurHandler = formik.handleBlur;
  const error = getIn(formik.errors, fieldName) as string;

  return (
    <FormControl isInvalid={invalid} mb="20px">
      <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
        {label}
      </FormLabel>
      <PhoneInput
        id={fieldName}
        name={fieldName}
        value={val}
        onChange={changeHandler}
        onBlur={blurHandler}
        placeholder={label}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default UIPhoneInputFormControl;
