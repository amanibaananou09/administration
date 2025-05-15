import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Configurator from "../../components/Configurator/Configurator";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "configurator.Configurator": "Configurator",
        "configurator.text": "This is a configurator",
        "configurator.navbarFixed": "Navbar Fixed",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Configurator ", () => {
  const onCloseMock = jest.fn();
  const onSwitchMock = jest.fn();

  const defaultProps = {
    secondary: true,
    isOpen: true,
    onClose: onCloseMock,
    onSwitch: onSwitchMock,
    isChecked: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when open", () => {
    render(
      <ChakraProvider>
        <Configurator {...defaultProps} />
      </ChakraProvider>,
    );

    expect(screen.getByText("Configurator")).toBeInTheDocument();
    expect(screen.getByText("This is a configurator.")).toBeInTheDocument();
  });

  it("toggles switch and calls props.onSwitch", () => {
    render(
      <ChakraProvider>
        <Configurator {...defaultProps} />
      </ChakraProvider>,
    );

    const switchElement = screen.getByRole("checkbox");
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();

    fireEvent.click(switchElement);

    expect(onSwitchMock).toHaveBeenCalledWith(true);
  });

  it("initial checked state when isChecked is true", () => {
    render(
      <ChakraProvider>
        <Configurator {...defaultProps} isChecked={true} />
      </ChakraProvider>,
    );

    const switchElement = screen.getByRole("checkbox");
    expect(switchElement).toBeChecked();
  });
});
