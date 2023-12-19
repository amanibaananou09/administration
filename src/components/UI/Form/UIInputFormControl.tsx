import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type UIInputFormControlProps = {
  fieldName: string;
  label: string;
  type?: string;
  isInvalid?: boolean;
  value: string | number | undefined;
  onChange?: (e: React.ChangeEvent<any>) => void;
  errorMessage?: string | undefined;
  showPasswordBtn?: boolean;
  isReadOnly?: boolean;
};

const UIInputFormControl = ({
  fieldName,
  label,
  type = "text",
  isInvalid,
  value,
  onChange,
  errorMessage,
  showPasswordBtn = true,
  isReadOnly = false,
}: UIInputFormControlProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormControl isInvalid={isInvalid} mb="15px">
      <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
        {label}
      </FormLabel>
      {(type !== "password" || (type === "password" && !showPasswordBtn)) && (
        <Input
          id={fieldName}
          name={fieldName}
          value={value}
          onChange={onChange}
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
            value={value}
            onChange={onChange}
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
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default UIInputFormControl;
