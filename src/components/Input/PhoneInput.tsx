import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ChangeEvent } from "react";

import { CountrySelector, usePhoneInput } from "react-international-phone";

interface PhoneInputProps {
  id: string;
  name: string;
  value: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string | undefined;
}

export const PhoneInput = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
}: PhoneInputProps) => {
  const phoneInput = usePhoneInput({
    defaultCountry: "tn",
    value,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    phoneInput.handlePhoneValueChange(e);
    onChange(e);
  };

  return (
    <InputGroup>
      <InputLeftElement>
        <CountrySelector
          selectedCountry={phoneInput.country.iso2}
          onSelect={({ iso2 }) => phoneInput.setCountry(iso2)}
          renderButtonWrapper={({ children, rootProps }) => (
            <Button {...rootProps} variant="outline" px="4px">
              {children}
            </Button>
          )}
        />
      </InputLeftElement>
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        type="tel"
        value={phoneInput.phone}
        onChange={handleChange}
        onBlur={onBlur}
        ref={phoneInput.inputRef}
      />
    </InputGroup>
  );
};
