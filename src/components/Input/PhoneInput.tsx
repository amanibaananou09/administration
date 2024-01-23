import { Button, Input } from "@chakra-ui/react";

import { CountrySelector, usePhoneInput } from "react-international-phone";

import React, { ChangeEvent } from "react";

interface PhoneInputProps {
  id: string;
  name: string;
  value: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string | undefined;
  isDisabled?: boolean;
  color?: string;
  bg?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  isDisabled = false,
}: PhoneInputProps) => {
  const phoneInput = usePhoneInput({
    defaultCountry: "us",
    value,
    onChange: (data) => {},
  });

  //styles
  const color = isDisabled ? "gray.900" : "";
  const bg = isDisabled ? "gray.100" : "";

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <CountrySelector
        disabled={isDisabled}
        selectedCountry={phoneInput.country.iso2}
        onSelect={(country) => phoneInput.setCountry(country.iso2)}
        renderButtonWrapper={({ children, rootProps }) => (
          <Button
            isDisabled={isDisabled}
            {...rootProps}
            variant="outline"
            px="4px"
            mr="8px"
            color={color}
            bg={bg}
          >
            {children}
          </Button>
        )}
      />
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        type="tel"
        value={phoneInput.inputValue}
        onChange={(e) => {
          phoneInput.handlePhoneValueChange(e);
          onChange(e);
        }}
        onBlur={onBlur}
        ref={phoneInput.inputRef}
        isDisabled={isDisabled}
        color={color}
        bg={bg}
      />
    </div>
  );
};
