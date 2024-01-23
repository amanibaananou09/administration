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
import { Box, Flex } from "@chakra-ui/react";
import { ResponsiveValue, StyleProps } from "@chakra-ui/system";
import { useState } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type UIInputFormControlProps = UseControllerProps<any> & {
  label?: string;
  type?: string;
  placeholder?: string;
  showPasswordBtn?: boolean;
  variant?: ResponsiveValue<
    "outline" | (string & {}) | "filled" | "flushed" | "unstyled"
  >;
  size?: ResponsiveValue<(string & {}) | "sm" | "md" | "lg" | "xs">;
  styles?: StyleProps;
};

const UIInputFormControl = ({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  label,
  type = "text",
  placeholder,
  showPasswordBtn = true,
  variant,
  size,
  styles,
  disabled,
}: UIInputFormControlProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    disabled,
  });

  const fieldName = field.name;
  const invalid = !!fieldState.error;
  const isDisabled = field.disabled;
  const error = fieldState.error?.message;

  const inputProps: InputProps = {
    id: fieldName,
    ...field,
    type: type,
    placeholder: placeholder,
    variant: variant,
    color: isDisabled ? "gray.900" : "",
    bg: isDisabled ? "gray.100" : "",
    size: size,
    ...styles,
  };

  return (
    <FormControl isInvalid={invalid} mb="2px">
      <Flex alignItems="center">
        {label && (
          <FormLabel flex={1} ms="4px" fontSize="sm" fontWeight="bold">
            {label}
          </FormLabel>
        )}
        <Box flex={2}>
          {(type !== "password" ||
            (type === "password" && !showPasswordBtn)) && (
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
        </Box>
      </Flex>
    </FormControl>
  );
};

export default UIInputFormControl;
