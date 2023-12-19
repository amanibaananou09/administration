import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";

type UISelectFormControlProps = {
  fieldName: string;
  label: string;
  isInvalid?: boolean;
  value: string | number | undefined;
  onChange?: (e: React.ChangeEvent<any>) => void;
  errorMessage?: string | undefined;
  children: React.ReactNode;
};

const UISelectFormControl = ({
  fieldName,
  label,
  isInvalid,
  value,
  onChange,
  errorMessage,
  children,
}: UISelectFormControlProps) => {
  return (
    <FormControl isInvalid={isInvalid} mb="15px">
      <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
        {label}
      </FormLabel>
      <Select
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={onChange}
        placeholder={label}
      >
        {children}
      </Select>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default UISelectFormControl;
