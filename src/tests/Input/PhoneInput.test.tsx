import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useESSContext } from "store/ESSContext";
import { PhoneInput } from "../../components/Input/PhoneInput";

jest.mock("store/ESSContext", () => ({
  useESSContext: jest.fn(),
}));

describe("PhoneInput Component", () => {
  beforeEach(() => {
    (useESSContext as jest.Mock).mockReturnValue({
      station: {
        country: {
          code: "us",
        },
      },
    });
  });

  it("should render the PhoneInput with default props", () => {
    render(
      <PhoneInput
        id="phone"
        name="phone"
        value=""
        onChange={() => {}}
        placeholder="Enter phone"
      />,
    );

    expect(screen.getByPlaceholderText("Enter phone")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should be disabled when isDisabled is true", () => {
    render(
      <PhoneInput
        id="phone"
        name="phone"
        value=""
        onChange={() => {}}
        placeholder="Enter phone"
        isDisabled={true}
      />,
    );

    const input = screen.getByPlaceholderText("Enter phone");

    expect(input).toBeDisabled();
  });

  it("should not be disabled when isDisabled is false", () => {
    render(
      <PhoneInput
        id="phone"
        name="phone"
        value=""
        onChange={() => {}}
        placeholder="Enter phone"
        isDisabled={false}
      />,
    );

    const input = screen.getByPlaceholderText("Enter phone");

    expect(input).toBeEnabled();
  });
});
