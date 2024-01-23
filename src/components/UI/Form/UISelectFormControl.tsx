import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { UseControllerProps, useController } from "react-hook-form";

type UISelectFormControlProps = UseControllerProps<any> & {
  label?: string;
  placeholder?: string;
  children: React.ReactNode;
};

const UISelectFormControl = ({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  label,
  placeholder,
  disabled,
  children,
}: UISelectFormControlProps) => {
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

  return (
    <FormControl isInvalid={invalid} mb="2px">
      <Flex alignItems="center">
        {label && (
          <FormLabel flex={1} ms="4px" fontSize="sm" fontWeight="bold">
            {label}
          </FormLabel>
        )}
        <Box flex={2}>
          <Select
            id={fieldName}
            {...field}
            placeholder={placeholder ? placeholder : label}
            color={isDisabled ? "gray.900" : "black"}
            bg={isDisabled ? "gray.100" : "white"}
          >
            {children}
          </Select>
          <FormErrorMessage>{error}</FormErrorMessage>
        </Box>
      </Flex>
    </FormControl>
  );
};

export default UISelectFormControl;
