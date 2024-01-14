import { Button, Input } from "@chakra-ui/react";

import { CountrySelector, usePhoneInput } from "react-international-phone";

import React, { ChangeEvent } from "react";

interface PhoneInputProps {
  id: string;
  name: string;
  value: string | undefined;
  onChange: (phone: string) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string | undefined;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
}) => {
  const phoneInput = usePhoneInput({
    defaultCountry: "us",
    value,
    onChange: (data) => {
      onChange(data.phone);
    },
  });

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <CountrySelector
        selectedCountry={phoneInput.country.iso2}
        onSelect={(country) => phoneInput.setCountry(country.iso2)}
        renderButtonWrapper={({ children, rootProps }) => (
          <Button {...rootProps} variant="outline" px="4px" mr="8px">
            {children}
          </Button>
        )}
      />
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        type="tel"
        color="primary"
        value={phoneInput.inputValue}
        onChange={phoneInput.handlePhoneValueChange}
        onBlur={onBlur}
        ref={phoneInput.inputRef}
      />
    </div>
  );
};
