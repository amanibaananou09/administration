import {
  Box,
  Checkbox,
  CheckboxProps,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { UseControllerProps, useController } from "react-hook-form";

type UICheckBoxFormControlProps = UseControllerProps<any> & {
  label?: string;
};

const UICheckBoxFormControl = ({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  label,
  disabled,
}: UICheckBoxFormControlProps) => {
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

  const checkBoxProps: CheckboxProps = {
    id: fieldName,
    ...field,
    isChecked: field.value,
    color: isDisabled ? "gray.900" : "",
    bg: isDisabled ? "gray.100" : "",
  };

  return (
    <FormControl isInvalid={invalid} mb="2px">
      <Flex alignItems="center">
        {label && (
          <FormLabel flex={2} ms="4px" fontSize="sm" fontWeight="bold">
            {label}
          </FormLabel>
        )}
        <Box flex={3}>
          <Checkbox {...checkBoxProps} />
          <FormErrorMessage>{error}</FormErrorMessage>
        </Box>
      </Flex>
    </FormControl>
  );
};

export default UICheckBoxFormControl;
