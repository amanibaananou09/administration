import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/input";
import { ResponsiveValue, StyleProps } from "@chakra-ui/system";
import { FormikProps, getIn } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type UIInputFormControlProps = {
  formik: FormikProps<any>;
  fieldName: string;
  label?: string;
  type?: string;
  placeholder?: string;
  showPasswordBtn?: boolean;
  isDisabled?: boolean;
  variant?: ResponsiveValue<
    "outline" | (string & {}) | "filled" | "flushed" | "unstyled"
  >;
  size?: ResponsiveValue<(string & {}) | "sm" | "md" | "lg" | "xs">;
  styles?: StyleProps;
};

const UIInputFormControl = ({
  formik,
  fieldName,
  label,
  type = "text",
  placeholder,
  showPasswordBtn = true,
  isDisabled = false,
  variant,
  size,
  styles,
}: UIInputFormControlProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const invalid =
    getIn(formik.errors, fieldName) && getIn(formik.touched, fieldName);
  const val = getIn(formik.values, fieldName) ?? "";
  const changeHandler = formik.handleChange;
  const blurHandler = formik.handleBlur;
  const error = getIn(formik.errors, fieldName) as string;

  const inputProps: InputProps = {
    id: fieldName,
    name: fieldName,
    value: val,
    onChange: changeHandler,
    onBlur: blurHandler,
    type: type,
    placeholder: placeholder ?? label,
    isDisabled: isDisabled,
    variant: variant,
    color: isDisabled ? "gray.900" : "",
    bg: isDisabled ? "gray.100" : "",
    size: size,
    ...styles,
  };

  return (
    <FormControl isInvalid={invalid} mb="2px">
      {label && (
        <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
          {label}
        </FormLabel>
      )}
      {(type !== "password" || (type === "password" && !showPasswordBtn)) && (
        <Input {...inputProps} />
      )}

      {type === "password" && showPasswordBtn && (
        <InputGroup>
          <Input
            {...inputProps}
            type={showPassword ? "text" : "password"}
            pr="4.5rem"
          />
          <InputRightElement width="3.2rem">
            <Button
              h="100%"
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
              color="gray.500"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </Button>
          </InputRightElement>
        </InputGroup>
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default UIInputFormControl;
