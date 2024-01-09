import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
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
  isReadOnly?: boolean;
  isDisabled?: boolean;
  variant?: ResponsiveValue<
    "outline" | (string & {}) | "filled" | "flushed" | "unstyled"
  >;
  size?: ResponsiveValue<(string & {}) | "sm" | "md" | "lg" | "xs">;
  styles?: StyleProps;
  value?: string;
};

const UIInputFormControl = ({
  formik,
  fieldName,
  label,
  type = "text",
  placeholder,
  showPasswordBtn = true,
  isReadOnly = false,
  isDisabled = false,
  variant,
  size,
  styles,
  value,
}: UIInputFormControlProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const invalid =
    getIn(formik.errors, fieldName) && getIn(formik.touched, fieldName);
  const val = getIn(formik.values, fieldName);
  const changeHandler = formik.handleChange;
  const blurHandler = formik.handleBlur;
  const error = getIn(formik.errors, fieldName) as string;

  return (
    <FormControl isInvalid={invalid} mb="2px">
      {label && (
        <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
          {label}
        </FormLabel>
      )}
      {(type !== "password" || (type === "password" && !showPasswordBtn)) && (
        <Input
          id={fieldName}
          name={fieldName}
          value={val}
          onChange={changeHandler}
          onBlur={blurHandler}
          type={type}
          placeholder={placeholder ? placeholder : label}
          isReadOnly={isReadOnly}
          isDisabled={isDisabled}
          variant={variant}
          color={isReadOnly ? "gray.500" : ""}
          bg={isReadOnly ? "gray.200" : ""}
          size={size}
          {...styles}
        />
      )}

      {type === "password" && showPasswordBtn && (
        <InputGroup>
          <Input
            id={fieldName}
            name={fieldName}
            value={val}
            onChange={changeHandler}
            onBlur={blurHandler}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder ? placeholder : label}
            pr="4.5rem"
            variant={variant}
            color={isReadOnly ? "gray.500" : ""}
            isDisabled={isDisabled}
            bg={isReadOnly ? "gray.200" : ""}
            size={size}
            {...styles}
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
