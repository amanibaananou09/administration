import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormikProps, getIn } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type UIInputFormControlProps = {
  formik: FormikProps<any>;
  fieldName: string;
  label: string;
  type?: string;
  showPasswordBtn?: boolean;
  isReadOnly?: boolean;
};

const UIInputFormControl = ({
  formik,
  fieldName,
  label,
  type = "text",
  showPasswordBtn = true,
  isReadOnly = false,
}: UIInputFormControlProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const invalid =
    getIn(formik.errors, fieldName) && getIn(formik.touched, fieldName);
  const val = getIn(formik.values, fieldName);
  const changeHandler = formik.handleChange;
  const blurHandler = formik.handleBlur;
  const error = getIn(formik.errors, fieldName) as string;

  return (
    <FormControl isInvalid={invalid} mb="15px">
      <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
        {label}
      </FormLabel>
      {(type !== "password" || (type === "password" && !showPasswordBtn)) && (
        <Input
          id={fieldName}
          name={fieldName}
          value={val}
          onChange={changeHandler}
          onBlur={blurHandler}
          type={type}
          placeholder={label}
          isReadOnly={isReadOnly}
          color={isReadOnly ? "gray.500" : ""}
          bg={isReadOnly ? "gray.200" : ""}
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
            placeholder={label}
            pr="4.5rem"
            color={isReadOnly ? "gray.500" : ""}
            bg={isReadOnly ? "gray.200" : ""}
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
