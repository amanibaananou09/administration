import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { FormikProps, getIn } from "formik";

type UISelectFormControlProps = {
  formik: FormikProps<any>;
  fieldName: string;
  label?: string;
  isInvalid?: boolean;
  value?: string | number | undefined;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.ChangeEvent<any>) => void;
  errorMessage?: string | undefined;
  children: React.ReactNode;
  placeholder?: string;
  isDisabled?: boolean;
};

const UISelectFormControl = ({
  formik,
  fieldName,
  label,
  children,
  placeholder,
  isDisabled,
}: UISelectFormControlProps) => {
  const invalid =
    !!getIn(formik.errors, fieldName) && !!getIn(formik.touched, fieldName);
  const val = getIn(formik.values, fieldName);
  const changeHandler = formik.handleChange;
  const blurHandler = formik.handleBlur;
  const error = getIn(formik.errors, fieldName) as string;

  return (
    <FormControl isInvalid={invalid} mb="2px">
      <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
        {label}
      </FormLabel>
      <Select
        id={fieldName}
        name={fieldName}
        value={val}
        onChange={changeHandler}
        onBlur={blurHandler}
        placeholder={placeholder ? placeholder : label}
        isDisabled={isDisabled}
      >
        {children}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default UISelectFormControl;
