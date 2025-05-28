import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { HSeparator, VSeparator } from "../../components/Separator/Separator";

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe("HSeparator", () => {
  afterEach(cleanup);

  it("renders correctly with default props", () => {
    renderWithChakra(<HSeparator data-testid="h-separator-default" />);
    const separator = screen.getByTestId("h-separator-default");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveStyle("height: 1px");
    expect(separator).toHaveStyle("width: 100%");
    expect(separator).toHaveStyle(
      "background: linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0) 100%)",
    );
  });

  it("does not render children", () => {
    renderWithChakra(
      <HSeparator data-testid="h-separator-with-children">
        Some Text
      </HSeparator>,
    );
    expect(screen.queryByText("Some Text")).not.toBeInTheDocument();
  });
});

describe("VSeparator", () => {
  afterEach(cleanup);

  it("renders correctly with default props", () => {
    renderWithChakra(<VSeparator data-testid="v-separator-default" />);
    const separator = screen.getByTestId("v-separator-default");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveStyle("width: 1px");
    expect(separator).toHaveStyle(
      "background: linear-gradient(0deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%)",
    );
  });

  it("does not render children", () => {
    renderWithChakra(
      <VSeparator data-testid="v-separator-with-children">
        Some Text
      </VSeparator>,
    );
    expect(screen.queryByText("Some Text")).not.toBeInTheDocument();
  });
});
