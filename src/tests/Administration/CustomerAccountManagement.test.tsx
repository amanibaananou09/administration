import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CustomerAccount } from "common/AdminModel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomerAccountManagement from "../../views/Administration/CustomerAccountManagement";

jest.mock("../../components/Exporter/CustomerAccountExporter", () => ({
  __esModule: true,
  default: () => <div>Mocked Exporter</div>,
}));
jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("hooks/use-customer-account", () => ({
  useCustomerAccounts: jest.fn(),
  useCustomerAccountQueries: jest.fn(),
}));

jest.mock("components/Dialog/ConfirmationDialog", () => ({
  useConfirm: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteMatch: jest.fn(),
  useHistory: jest.fn(),
}));

const mockUseTranslation = useTranslation as jest.Mock;
const mockUseHistory = jest.requireMock("react-router-dom").useHistory;
const mockUseRouteMatch = jest.requireMock("react-router-dom").useRouteMatch;

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/customer-accounts"]}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  </ChakraProvider>
);

const mockCustomerAccounts: CustomerAccount[] = [
  {
    index: 1,
    id: "1",
    identifier: "CUST001",
    name: "Test Customer",
    city: "Paris",
    creatorAccountId: "admin1",
    parentId: "parent1",
    parentName: "Parent Corp",
    creatorCustomerAccountName: "Admin",
    resaleRight: true,
    cardManager: true,
    exported: false,
    dateStatusChange: "2023-01-15T10:30:00Z",
    stationsCount: 5,
    status: "ACTIVE",
    actif: true,
    masterUser: {
      id: "user1",
      userIdentifier: "USER001",
      username: "master.user",
      email: "master@test.com",
      firstName: "Master",
      lastName: "User",
      phone: "+1234567890",
      role: "ADMIN",
    },
    creatorUser: {
      id: 101,
      userIdentifier: "CREATOR001",
      actif: true,
      dateStatusChange: "2022-12-01T08:00:00Z",
      username: "creator.user",
      firstName: "Creator",
      lastName: "User",
      email: "creator@test.com",
      phone: "+0987654321",
      changePassword: false,
      sendSms: true,
      customerAccountId: "1",
      creatorAccountId: "system",
      lastConnectionDate: "2023-01-10T14:25:00Z",
      creatorCustomerAccountName: "System",
      customerAccountName: "Test Customer",
    },
    paymentMethods: [
      { code: "CARD", customerAccountId: "1" },
      { code: "TRANSFER", customerAccountId: "1" },
    ],
    plannedExportDate: "2023-02-01",
    scheduledDate: "2023-01-20T09:00:00Z",
  },
  {
    index: 2,
    id: "2",
    identifier: "CUST002",
    name: "Another Customer",
    city: "Lyon",
    creatorAccountId: "admin2",
    parentId: "",
    resaleRight: false,
    cardManager: false,
    exported: true,
    dateStatusChange: "2023-01-10T15:45:00Z",
    stationsCount: 2,
    status: "INACTIVE",
    actif: false,
    masterUser: {
      id: "user2",
      userIdentifier: "USER002",
      username: "another.user",
      email: "another@test.com",
      firstName: "Another",
      lastName: "User",
      phone: "+1122334455",
      role: "USER",
    },
    paymentMethods: [{ code: "CASH", customerAccountId: "2" }],
    scheduledDate: "2023-01-25T11:30:00Z",
  },
];

describe("CustomerAccountManagement", () => {
  beforeEach(() => {
    mockUseTranslation.mockReturnValue({
      t: (key: string) => key,
      i18n: { language: "en" },
    });

    mockUseRouteMatch.mockReturnValue({
      path: "/customer-accounts",
    });

    mockUseHistory.mockReturnValue({
      push: jest.fn(),
    });

    jest
      .requireMock("hooks/use-customer-account")
      .useCustomerAccounts.mockReturnValue({
        customerAccounts: mockCustomerAccounts,
        totalPages: 1,
        totalElements: 2,
        isLoading: false,
      });

    jest
      .requireMock("hooks/use-customer-account")
      .useCustomerAccountQueries.mockReturnValue({
        activate: jest.fn(),
        desactivate: jest.fn(),
      });

    jest
      .requireMock("components/Dialog/ConfirmationDialog")
      .useConfirm.mockReturnValue({
        confirm: jest.fn(),
        ConfirmationDialog: () => <div>Confirmation Dialog</div>,
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with header", () => {
    render(<CustomerAccountManagement />, { wrapper });

    expect(screen.getByText("customerAccounts.header")).toBeInTheDocument();
  });

  it("displays customer accounts table when data is loaded", async () => {
    render(<CustomerAccountManagement />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText("CUST001")).toBeInTheDocument();
      expect(screen.getByText("Test Customer")).toBeInTheDocument();
      expect(screen.getByText("CUST002")).toBeInTheDocument();
      expect(screen.getByText("Another Customer")).toBeInTheDocument();
    });
  });

  it("navigates to details page when identifier is clicked", async () => {
    const mockPush = jest.fn();
    mockUseHistory.mockReturnValue({
      push: mockPush,
    });

    render(<CustomerAccountManagement />, { wrapper });

    await waitFor(() => {
      const identifierLink = screen.getByText("CUST001");
      fireEvent.click(identifierLink);
    });

    expect(mockPush).toHaveBeenCalledWith("/customer-accounts/details/1");
  });
});
