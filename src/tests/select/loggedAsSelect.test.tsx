import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoggedAsSelect from "../../components/select/loggedAsSelect";

jest.mock("../../hooks/use-customer-account", () => ({
  useCustomerAccountById: jest.fn().mockImplementation(() => ({
    customerAccount: { resaleRight: false },
    isLoading: false,
  })),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-icons/io", () => ({
  IoMdExit: ({ onClick }: { onClick: () => void }) => (
    <div data-testid="exit-icon" onClick={onClick} />
  ),
}));

describe("LoggedAsSelect", () => {
  const mockHandleSelectChange = jest.fn();
  const mockHandleIconClick = jest.fn();
  const mockUseCustomerAccountById = jest.requireMock(
    "../../hooks/use-customer-account",
  ).useCustomerAccountById;

  const defaultProps = {
    userId: 1,
    customerAccountId: "123",
    selectedValue: "",
    handleSelectChange: mockHandleSelectChange,
    handleIconClick: mockHandleIconClick,
  };

  beforeEach(() => {
    mockUseCustomerAccountById.mockImplementation(() => ({
      customerAccount: { resaleRight: false },
      isLoading: false,
    }));
    jest.clearAllMocks();
  });

  it("does not render anything if userId is undefined", () => {
    const { container } = render(
      <LoggedAsSelect {...defaultProps} userId={undefined} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("displays the select with default options when resaleRight is false", () => {
    mockUseCustomerAccountById.mockReturnValue({
      customerAccount: { resaleRight: false },
      isLoading: false,
    });

    render(<LoggedAsSelect {...defaultProps} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const allOptions = document.querySelectorAll("option");
    expect(allOptions).toHaveLength(2);
    expect(allOptions[0]).toHaveValue("");
    expect(allOptions[0]).toHaveAttribute("disabled");
    expect(allOptions[0]).toHaveAttribute("hidden");
    expect(allOptions[1]).toHaveValue("Dashboard");
  });

  it("displays the select with default options when resaleRight is false", () => {
    mockUseCustomerAccountById.mockReturnValue({
      customerAccount: { resaleRight: false },
      isLoading: false,
    });

    render(<LoggedAsSelect {...defaultProps} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const allOptions = document.querySelectorAll("option");
    expect(allOptions).toHaveLength(2);
    expect(allOptions[0]).toHaveValue("");
    expect(allOptions[0]).toHaveAttribute("disabled");
    expect(allOptions[0]).toHaveAttribute("hidden");
    expect(allOptions[1]).toHaveValue("Dashboard");
  });

  it("calls handleSelectChange when an option is selected", () => {
    mockUseCustomerAccountById.mockReturnValue({
      customerAccount: { resaleRight: true },
      isLoading: false,
    });

    render(<LoggedAsSelect {...defaultProps} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "administration" } });

    expect(mockHandleSelectChange).toHaveBeenCalledTimes(1);
    expect(mockHandleSelectChange).toHaveBeenCalledWith(
      expect.any(Object),
      defaultProps.userId,
    );
  });

  it("calls handleIconClick when the icon is clicked", () => {
    render(<LoggedAsSelect {...defaultProps} />);

    const icon = screen.getByTestId("exit-icon");
    fireEvent.click(icon);

    expect(mockHandleIconClick).toHaveBeenCalledTimes(1);
    expect(mockHandleIconClick).toHaveBeenCalledWith(defaultProps.userId);
  });

  it("displays the selected value in the select", () => {
    render(<LoggedAsSelect {...defaultProps} selectedValue="Dashboard" />);

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("Dashboard");
  });

  it("console.log the customerAccount when select is clicked", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockCustomerAccount = { resaleRight: true, id: 123 };

    mockUseCustomerAccountById.mockReturnValue({
      customerAccount: mockCustomerAccount,
      isLoading: false,
    });

    render(<LoggedAsSelect {...defaultProps} />);

    const select = screen.getByRole("combobox");
    fireEvent.click(select);

    expect(consoleSpy).toHaveBeenCalledWith(
      "LoggedAsSelect opened with customerAccount:",
      mockCustomerAccount,
    );

    consoleSpy.mockRestore();
  });

  it("displays loading status if isLoading is true", () => {
    mockUseCustomerAccountById.mockReturnValue({
      customerAccount: null,
      isLoading: true,
    });

    render(<LoggedAsSelect {...defaultProps} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("calls handleSelectChange when an option is selected", () => {
    const {
      useCustomerAccountById,
    } = require("../../hooks/use-customer-account");
    useCustomerAccountById.mockReturnValue({
      customerAccount: { resaleRight: true },
      isLoading: false,
    });

    render(<LoggedAsSelect {...defaultProps} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "administration" } });

    expect(mockHandleSelectChange).toHaveBeenCalledTimes(1);
    expect(mockHandleSelectChange).toHaveBeenCalledWith(
      expect.any(Object),
      defaultProps.userId,
    );
  });

  it("calls handleIconClick when the icon is clicked", () => {
    const {
      useCustomerAccountById,
    } = require("../../hooks/use-customer-account");
    useCustomerAccountById.mockReturnValue({
      customerAccount: { resaleRight: true },
      isLoading: false,
    });

    render(<LoggedAsSelect {...defaultProps} />);

    const icon = screen.getByTestId("exit-icon");
    fireEvent.click(icon);

    expect(mockHandleIconClick).toHaveBeenCalledTimes(1);
    expect(mockHandleIconClick).toHaveBeenCalledWith(defaultProps.userId);
  });

  it("displays the selected value in the select", () => {
    const {
      useCustomerAccountById,
    } = require("../../hooks/use-customer-account");
    useCustomerAccountById.mockReturnValue({
      customerAccount: { resaleRight: true },
      isLoading: false,
    });

    render(<LoggedAsSelect {...defaultProps} selectedValue="Dashboard" />);

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("Dashboard");
  });

  it("console.log the customerAccount when select is clicked", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockCustomerAccount = { resaleRight: true, id: 123 };

    const {
      useCustomerAccountById,
    } = require("../../hooks/use-customer-account");
    useCustomerAccountById.mockReturnValue({
      customerAccount: mockCustomerAccount,
      isLoading: false,
    });

    render(<LoggedAsSelect {...defaultProps} />);

    const select = screen.getByRole("combobox");
    fireEvent.click(select);

    expect(consoleSpy).toHaveBeenCalledWith(
      "LoggedAsSelect opened with customerAccount:",
      mockCustomerAccount,
    );

    consoleSpy.mockRestore();
  });

  it("displays loading status if isLoading is true", () => {
    const {
      useCustomerAccountById,
    } = require("../../hooks/use-customer-account");
    useCustomerAccountById.mockReturnValue({
      customerAccount: null,
      isLoading: true,
    });

    render(<LoggedAsSelect {...defaultProps} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
