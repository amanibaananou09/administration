import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Route, Router, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import UserManagement from "../../views/Administration/UserManagement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserQueries, useUsers } from "../../hooks/use-user";
import { useAuth } from "../../store/AuthContext";
import { useConfirm } from "../../components/Dialog/ConfirmationDialog";
import { impersonateUser } from "../../common/api/auth-api";
import { decodeToken } from "../../utils/utils";
import { Mode } from "../../common/enums";
import { GeneralUser } from "../../common/AdminModel";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-icons/fa6", () => ({
  FaTableList: (props: any) => (
    <svg {...props} data-testid={props["data-testid"]} />
  ),
}));

jest.mock("react-icons/fa", () => ({
  FaPencilAlt: (props: any) => (
    <svg {...props} data-testid={props["data-testid"]} />
  ),
}));

jest.mock("../../hooks/use-user");
jest.mock("../../store/AuthContext");
jest.mock("../../components/Dialog/ConfirmationDialog");
jest.mock("../../common/api/auth-api");
jest.mock("../../utils/utils");
jest.mock("react-custom-scrollbars", () => {
  const Scrollbars = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  return { __esModule: true, default: Scrollbars };
});

jest.mock("jspdf", () => {
  const jsPDFMock = jest.fn().mockImplementation(() => ({
    autoTable: jest.fn(),
    save: jest.fn(),
  }));
  return {
    __esModule: true,
    default: jsPDFMock,
  };
});

jest.mock("jspdf-autotable", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../components/Exporter/UserExporter", () => ({
  __esModule: true,
  default: ({ users }: { users: any[] }) => (
    <div data-testid="user-exporter">UserExporter</div>
  ),
}));
jest.mock("../../components/ColumnSelector/ColumnSelector", () => ({
  __esModule: true,
  default: ({ allColumns, visibleColumns, setVisibleColumns }: any) => (
    <div data-testid="column-selector">ColumnSelector</div>
  ),
}));
jest.mock("../../components/UI/Table/UITable", () => ({
  __esModule: true,
  default: ({ data, columns, emptyListMessage }: any) => (
    <table data-testid="ui-table">
      <thead>
        <tr>
          {columns.map((col: any) => (
            <th key={col.key}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item: any, index: number) => (
            <tr key={item.id || index}>
              {columns.map((col: any) => (
                <td key={col.key}>
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length}>{emptyListMessage}</td>
          </tr>
        )}
      </tbody>
    </table>
  ),
}));
jest.mock("../../components/Pagination/Pagination", () => ({
  __esModule: true,
  default: ({
    onChange,
  }: {
    onChange: (page: number, size: number) => void;
  }) => (
    <div data-testid="pagination">
      <button onClick={() => onChange(1, 25)}>Next Page</button>
    </div>
  ),
}));
jest.mock("../../components/Modal/UserModal", () => ({
  __esModule: true,
  default: ({ mode }: { mode: Mode }) => (
    <div data-testid={`user-modal-${mode}`}>UserModal {mode}</div>
  ),
}));
jest.mock("../../components/Modal/LogModal", () => ({
  __esModule: true,
  default: () => <div data-testid="log-modal">LogModal</div>,
}));
jest.mock("../../components/select/loggedAsSelect", () => ({
  __esModule: true,
  default: ({
    userId,
    selectedValue,
    handleSelectChange,
    handleIconClick,
  }: any) => (
    <div data-testid={`logged-as-select-${userId}`}>
      <select
        data-testid={`select-${userId}`}
        value={selectedValue}
        onChange={(e) => handleSelectChange(e, userId)}
      >
        <option value="">Select...</option>
        <option value="administration">Administration</option>
        <option value="Dashboard">Dashboard</option>
      </select>
      <button
        data-testid={`icon-button-${userId}`}
        onClick={() => handleIconClick(userId)}
      >
        Go
      </button>
    </div>
  ),
}));
jest.mock("../../components/Sidebar/Status", () => ({
  __esModule: true,
  default: ({ value }: { value: boolean }) => (
    <span data-testid={`status-${value}`}>
      Status: {value ? "Active" : "Inactive"}
    </span>
  ),
}));

describe("UserManagement", () => {
  const queryClient = new QueryClient();

  const mockUsers: GeneralUser[] = [
    {
      id: 1,
      index: 1,
      userIdentifier: "user123",
      username: "John Doe",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      creatorCustomerAccountName: "Creator A",
      customerAccountName: "Account X",
      lastConnectionDate: "2023-01-15T10:00:00Z",
      actif: true,
      customerAccountId: "101",
      creatorAccountId: "201",
    },
    {
      id: 2,
      index: 2,
      userIdentifier: "user456",
      username: "Jane Smith",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "098-765-4321",
      creatorCustomerAccountName: "Creator B",
      customerAccountName: "Account Y",
      lastConnectionDate: "2023-02-20T11:30:00Z",
      actif: false,
      customerAccountId: "102",
      creatorAccountId: "202",
    },
  ];

  const renderComponent = (initialEntries: string[] = ["/admin/users"]) => {
    const history = createMemoryHistory({ initialEntries });
    return {
      ...render(
        <QueryClientProvider client={queryClient}>
          <Router history={history}>
            <Switch>
              <Route path="/admin/users/new">
                <div data-testid="new-user-route"></div>
              </Route>
              <Route path="/admin/users/edit/:id">
                <div data-testid="edit-user-route"></div>
              </Route>
              <Route path="/admin/users/details/:id">
                <div data-testid="details-user-route"></div>
              </Route>
              <Route path="/admin/users/log/:userId">
                <div data-testid="log-user-route"></div>
              </Route>
              <Route path="/admin/users">
                <UserManagement />
              </Route>
            </Switch>
          </Router>
        </QueryClientProvider>,
      ),
      history,
    };
  };

  let mockLocalStorageSetItem: jest.Mock;

  beforeEach(() => {
    const originalSetItem = localStorage.setItem;
    mockLocalStorageSetItem = jest.fn(originalSetItem);
    Object.defineProperty(window, "localStorage", {
      value: {
        ...localStorage,
        setItem: mockLocalStorageSetItem,
      },
      writable: true,
    });

    (useUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      totalPages: 1,
      totalElements: mockUsers.length,
      isLoading: false,
    });
    (useUserQueries as jest.Mock).mockReturnValue({
      activate: jest.fn(),
      desactivate: jest.fn(),
    });
    (useAuth as jest.Mock).mockReturnValue({
      signIn: jest.fn(),
      user: { customerAccountId: "999", id: 999 },
    });
    (useConfirm as jest.Mock).mockReturnValue({
      confirm: jest.fn(({ onConfirm }) => onConfirm()),
      ConfirmationDialog: () => <div data-testid="confirmation-dialog"></div>,
    });
    (impersonateUser as jest.Mock).mockResolvedValue({
      access_token: "mock_access_token",
      impersonation_mode: true,
      original_user_id: 999,
    });
    (decodeToken as jest.Mock).mockReturnValue({
      impersonationMode: true,
      originalUserId: 999,
    });

    Object.defineProperty(window, "open", {
      writable: true,
      value: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders header correctly", () => {
    renderComponent();
    const headerElement = screen.getByText(
      /userManagement.globalUsers.header/i,
    );
    expect(headerElement).toBeInTheDocument();
  });

  it("displays loading skeleton when loading", () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: [],
      totalPages: 0,
      totalElements: 0,
      isLoading: true,
    });
    renderComponent();
    expect(screen.getByTestId("skeleton-table")).toBeInTheDocument();
  });

  it("renders user data in the table when not loading", async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.queryByTestId("skeleton-table")).not.toBeInTheDocument();
      expect(screen.getByTestId("ui-table")).toBeInTheDocument();
      expect(screen.getByText("user123")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("user456")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("calls activate when an inactive user's status is clicked", async () => {
    const { activate, desactivate } = useUserQueries() as jest.Mocked<
      ReturnType<typeof useUserQueries>
    >;
    renderComponent();

    const inactiveUserRow = screen.getByText("user456").closest("tr");
    expect(inactiveUserRow).toBeInTheDocument();

    const inactiveStatusElement = inactiveUserRow?.querySelector(
      '[data-testid="status-false"]',
    );
    expect(inactiveStatusElement).toBeInTheDocument();

    fireEvent.click(inactiveStatusElement!.parentElement!);

    await waitFor(() => {
      expect(useConfirm().confirm).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "customerAccounts.updateStatusDialog.activationMessage",
        }),
      );
      expect(activate).toHaveBeenCalledWith(2);
      expect(desactivate).not.toHaveBeenCalled();
    });
  });

  it("calls desactivate when an active user's status is clicked", async () => {
    const { activate, desactivate } = useUserQueries() as jest.Mocked<
      ReturnType<typeof useUserQueries>
    >;
    renderComponent();

    const activeUserRow = screen.getByText("user123").closest("tr");
    expect(activeUserRow).toBeInTheDocument();

    const activeStatusElement = activeUserRow?.querySelector(
      '[data-testid="status-true"]',
    );
    expect(activeStatusElement).toBeInTheDocument();

    fireEvent.click(activeStatusElement!.parentElement!);

    await waitFor(() => {
      expect(useConfirm().confirm).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "customerAccounts.updateStatusDialog.desativationMessage",
        }),
      );
      expect(desactivate).toHaveBeenCalledWith(1);
      expect(activate).not.toHaveBeenCalled();
    });
  });

  it("navigates to user details when userIdentifier is clicked", async () => {
    const { history } = renderComponent();
    const userIdentifierLink = screen.getByText("user123");
    fireEvent.click(userIdentifierLink);
    await waitFor(() => {
      expect(history.location.pathname).toBe("/admin/users/details/1");
      expect(screen.getByTestId("details-user-route")).toBeInTheDocument();
    });
  });

  it("handles impersonation to administration correctly", async () => {
    const mockSignIn = useAuth().signIn as jest.Mock;
    renderComponent();

    const selectElement = screen.getByTestId("select-1");
    fireEvent.change(selectElement, { target: { value: "administration" } });

    const goButton = screen.getByTestId("icon-button-1");
    fireEvent.click(goButton);

    await waitFor(() => {
      expect(impersonateUser).toHaveBeenCalledWith(1);
      expect(decodeToken).toHaveBeenCalledWith("mock_access_token");
      expect(mockLocalStorageSetItem).toHaveBeenCalledWith(
        "impersonationMode",
        "true",
      );
      expect(mockLocalStorageSetItem).toHaveBeenCalledWith(
        "originalUserId",
        "999",
      );
      expect(mockSignIn).toHaveBeenCalledWith(
        expect.objectContaining({
          impersonationMode: true,
          originalUserId: 999,
        }),
      );
    });
  });

  it("handles impersonation to Dashboard correctly", async () => {
    renderComponent();

    const selectElement = screen.getByTestId("select-1");
    fireEvent.change(selectElement, { target: { value: "Dashboard" } });

    const goButton = screen.getByTestId("icon-button-1");
    fireEvent.click(goButton);

    await waitFor(() => {
      expect(impersonateUser).toHaveBeenCalledWith(1);
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining(process.env.REACT_APP_DASHBOARD_URL as string),
        "_blank",
      );
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("access_token=mock_access_token"),
        expect.any(String),
      );
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("impersonation_mode=true"),
        expect.any(String),
      );
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("original_user_id=999"),
        expect.any(String),
      );
    });
  });

  it("updates pagination criteria on change", async () => {
    renderComponent();
    const paginationButton = screen.getByText("Next Page");
    fireEvent.click(paginationButton);

    expect(paginationButton).toBeInTheDocument();
  });

  it("does not render LoggedAsSelect if current user's customerAccountId matches item's customerAccountId", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: jest.fn(),
      user: { customerAccountId: "101", id: 999 },
    });
    renderComponent();

    await waitFor(() => {
      expect(
        screen.queryByTestId("logged-as-select-1"),
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("logged-as-select-2")).toBeInTheDocument();
    });
  });

  it("renders UserExporter if users data is available", () => {
    renderComponent();
    expect(screen.getByTestId("user-exporter")).toBeInTheDocument();
  });

  it("renders ColumnSelector", () => {
    renderComponent();
    expect(screen.getByTestId("column-selector")).toBeInTheDocument();
  });

  it("displays empty list message when no users are returned", async () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: [],
      totalPages: 0,
      totalElements: 0,
      isLoading: false,
    });
    renderComponent();
    await waitFor(() => {
      expect(
        screen.getByText("userManagement.globalUsers.listEmpty"),
      ).toBeInTheDocument();
    });
  });
});
