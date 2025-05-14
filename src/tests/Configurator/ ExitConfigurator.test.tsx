import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useTranslation } from "react-i18next";
import { useImpersonateUser, useUsersByName } from "../../hooks/use-user";
import ExitConfigurator from "../../components/Configurator/ExitConfigurator";
import { useAuth } from "../../store/AuthContext";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("../../hooks/use-user", () => ({
  useUsersByName: jest.fn(),
  useImpersonateUser: jest.fn(),
}));

jest.mock("../../store/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("react-custom-scrollbars", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("ExitConfigurator", () => {
  const mockOnClose = jest.fn();
  const mockSignIn = jest.fn();
  const mockImpersonateUser = jest.fn();

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });

    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      user: { username: "currentUser" },
    });

    (useImpersonateUser as jest.Mock).mockReturnValue({
      impersonateUser: mockImpersonateUser,
    });

    (useUsersByName as jest.Mock).mockReturnValue({
      customerAccounts: [],
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when closed", () => {
    render(<ExitConfigurator isOpen={false} onClose={mockOnClose} />);
    expect(
      screen.queryByText("exitConfigurator.title"),
    ).not.toBeInTheDocument();
  });

  it("renders correctly when opened", () => {
    render(<ExitConfigurator isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText("exitConfigurator.title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("exitConfigurator.placeholder"),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("displays error message when there is an error", () => {
    const error = new Error("Test error");
    (useUsersByName as jest.Mock).mockReturnValue({
      customerAccounts: [],
      isLoading: false,
      error,
    });

    render(<ExitConfigurator isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("displays empty state when no accounts found", () => {
    render(<ExitConfigurator isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText("exitConfigurator.empty")).toBeInTheDocument();
  });

  it("displays accounts with resaleRight correctly", () => {
    const mockAccounts = [
      {
        id: 1,
        name: "Account 1",
        parentName: "Parent 1",
        resaleRight: true,
        masterUser: {
          id: 101,
          firstName: "John",
          lastName: "Doe",
          username: "john.doe",
        },
      },
      {
        id: 2,
        name: "Account 2",
        parentName: "Parent 2",
        resaleRight: false,
        masterUser: {
          id: 102,
          firstName: "Jane",
          lastName: "Smith",
          username: "jane.smith",
        },
      },
    ];

    (useUsersByName as jest.Mock).mockReturnValue({
      customerAccounts: mockAccounts,
      isLoading: false,
      error: null,
    });

    render(<ExitConfigurator isOpen={true} onClose={mockOnClose} />);

    expect(
      screen.getByText("John Doe - Account 1 (Parent 1)"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Jane Smith - Account 2"),
    ).not.toBeInTheDocument();
  });

  it("clears search input when clear button is clicked", () => {
    render(<ExitConfigurator isOpen={true} onClose={mockOnClose} />);

    const searchInput = screen.getByPlaceholderText(
      "exitConfigurator.placeholder",
    );
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(searchInput).toHaveValue("test");

    const clearButton = screen.getByRole("button", { name: "" });
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue("");
  });

  it("changes search type between account and user", () => {
    render(<ExitConfigurator isOpen={true} onClose={mockOnClose} />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("account");

    fireEvent.change(select, { target: { value: "user" } });
    expect(select).toHaveValue("user");
  });
});
