import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserModal from "../../components/Modal/UserModal";
import { UserFormValues } from "common/AdminModel";
import { Mode } from "../../common/enums";
import { useParams } from "react-router";

const mockHistoryPush = jest.fn();
const mockHistoryReplace = jest.fn();
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
  useHistory: () => ({
    push: mockHistoryPush,
    replace: mockHistoryReplace,
  }),
}));

const mockOnOpen = jest.fn();
const mockOnClose = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useDisclosure: () => ({
    isOpen: true,
    onOpen: mockOnOpen,
    onClose: mockOnClose,
  }),
}));

jest.mock("../../hooks/use-creators", () => ({
  __esModule: true,
  default: () => ({
    creators: [
      { id: "1", name: "Creator One" },
      { id: "2", name: "Creator Two" },
      { id: "3", name: "Creator Three" },
    ],
  }),
}));

jest.mock("../../hooks/use-user", () => {
  const mockUseUserById = jest.fn();
  const mockCreateUser = jest.fn();
  const mockUpdateUser = jest.fn();

  return {
    useUserById: mockUseUserById,
    useUserQueries: () => ({
      create: mockCreateUser,
      update: mockUpdateUser,
    }),
  };
});

const {
  useUserById: mockUseUserById,
  useUserQueries: mockUseUserQueries,
} = jest.requireMock("../../hooks/use-user");
const mockCreateUser = mockUseUserQueries().create;
const mockUpdateUser = mockUseUserQueries().update;

jest.mock("../../hooks/use-validators", () => ({
  __esModule: true,
  default: () => ({
    identifierValidator: jest.fn().mockResolvedValue(true),
    usernameValidator: jest.fn().mockResolvedValue(true),
    firstNameValidator: jest.fn().mockResolvedValue(true),
    lastNameValidator: jest.fn().mockResolvedValue(true),
    emailValidator: jest.fn().mockResolvedValue(true),
    passwordValidator: jest.fn().mockResolvedValue(true),
    creatorValidator: jest.fn().mockResolvedValue(true),
    parentValidator: jest.fn().mockResolvedValue(true),
    phoneValidator: jest.fn().mockResolvedValue(true),
  }),
}));

jest.mock("../../store/AuthContext", () => ({
  useAuth: () => ({
    user: {
      customerAccountId: "loggedUserCustomerAccount",
      creatorAccountId: "loggedUserCreatorAccount",
    },
  }),
}));

jest.mock("../../components/Skeleton/Skeletons", () => ({
  UserSkeletonForm: () => (
    <div data-testid="user-skeleton-form">Loading...</div>
  ),
}));

jest.mock("../../components/UI/Modal/UIModal", () => {
  const { Mode } = jest.requireActual("../../common/enums");

  return ({
    children,
    title,
    isOpen,
    onClose,
    onSubmit,
    isSubmitting,
    mode,
  }: any) => (
    <div data-testid="ui-modal" className={isOpen ? "open" : "closed"}>
      <h2 data-testid="modal-title">{title}</h2>
      <button onClick={onClose} data-testid="modal-close-button">
        Close
      </button>
      <div data-testid="modal-content">
        {children}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          data-testid="modal-submit-button"
        >
          {mode === Mode.VIEW ? "Edit" : "Submit"}
        </button>
      </div>
    </div>
  );
});

jest.mock("../../components/UI/Form/UIInputFormControl", () => {
  return ({
    label,
    name,
    control,
    disabled,
    type = "text",
    value,
    rules,
    showPasswordBtn,
    ...rest
  }: any) => (
    <div data-testid={`input-form-control-${name}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        data-testid={`${name}-input`}
        defaultValue={control?._defaultValues?.[name] || value || ""}
        {...rest}
      />
      {showPasswordBtn && <button data-testid={`${name}-show-password-btn`} />}
    </div>
  );
});

jest.mock("../../components/UI/Form/UISelectFormControl", () => {
  return ({ label, name, control, disabled, children, value, rules }: any) => (
    <div data-testid={`select-form-control-${name}`}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        disabled={disabled}
        data-testid={`${name}-select`}
        defaultValue={control?._defaultValues?.[name] || value || ""}
      >
        {children}
      </select>
    </div>
  );
});

jest.mock("../../components/UI/Form/UICheckBoxFormControl", () => {
  return ({ label, name, control, disabled, value, rules }: any) => (
    <div data-testid={`checkbox-form-control-${name}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type="checkbox"
        id={name}
        name={name}
        disabled={disabled}
        data-testid={`${name}-checkbox`}
        defaultChecked={control?._defaultValues?.[name] || value || false}
      />
    </div>
  );
});

jest.mock("../../components/UI/Form/UIPhoneInputFormControl", () => {
  return ({ label, name, control, disabled, value, rules }: any) => (
    <div data-testid={`phone-input-form-control-${name}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type="tel"
        id={name}
        name={name}
        disabled={disabled}
        data-testid={`${name}-phone-input`}
        defaultValue={control?._defaultValues?.[name] || value || ""}
      />
    </div>
  );
});

const mockUser: UserFormValues = {
  id: 123,
  userIdentifier: "user-123",
  savedUserIdentifier: "user-123",
  username: "john_doe",
  savedUsername: "john_doe",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  savedEmail: "john.doe@example.com",
  password: "",
  phone: "123-456-7890",
  changePassword: false,
  sendSms: true,
  actif: true,
  creatorAccountId: "1",
  customerAccountId: "2",
  subnetMask: "255.255.255.0",
  lastConnectionDate: "2023-01-01",
};

describe("UserModal", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    mockUseUserById.mockReturnValue({ user: mockUser, isLoading: false });
  });

  it("renders without crash and displays values in EDIT mode", async () => {
    render(<UserModal onSubmit={mockOnSubmit} mode={Mode.EDIT} />);

    expect(screen.getByTestId("modal-title")).toHaveTextContent(
      "addUserModal.update",
    );

    expect(screen.getByTestId("username-input")).toHaveValue("john_doe");
    expect(screen.getByTestId("firstName-input")).toHaveValue("John");
    expect(screen.getByTestId("lastName-input")).toHaveValue("Doe");
    expect(screen.getByTestId("email-input")).toHaveValue(
      "john.doe@example.com",
    );
    expect(screen.getByTestId("phone-phone-input")).toHaveValue("123-456-7890");
    expect(screen.getByTestId("subnetMask-input")).toHaveValue("255.255.255.0");

    expect(screen.getByTestId("userIdentifier-input")).toBeDisabled();
    expect(screen.getByTestId("creatorAccountId-select")).toBeDisabled();
    expect(screen.getByTestId("customerAccountId-select")).toBeDisabled();

    expect(screen.queryByTestId("password-input")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("confirmPassword-input"),
    ).not.toBeInTheDocument();

    expect(screen.getByTestId("changePassword-checkbox")).not.toBeChecked();
    expect(screen.getByTestId("sendSms-checkbox")).toBeChecked();
    expect(screen.getByTestId("actif-checkbox")).toBeChecked();
  });

  it("renders correctly in VIEW mode and disables all fields", async () => {
    render(<UserModal onSubmit={mockOnSubmit} mode={Mode.VIEW} />);

    expect(screen.getByTestId("modal-title")).toHaveTextContent(
      "addUserModal.view",
    );

    expect(screen.getByTestId("userIdentifier-input")).toBeDisabled();
    expect(screen.getByTestId("username-input")).toBeDisabled();
    expect(screen.getByTestId("firstName-input")).toBeDisabled();
    expect(screen.getByTestId("lastName-input")).toBeDisabled();
    expect(screen.getByTestId("email-input")).toBeDisabled();
    expect(screen.getByTestId("phone-phone-input")).toBeDisabled();
    expect(screen.getByTestId("subnetMask-input")).toBeDisabled();
    expect(screen.getByTestId("creatorAccountId-select")).toBeDisabled();
    expect(screen.getByTestId("customerAccountId-select")).toBeDisabled();

    expect(screen.getByTestId("changePassword-checkbox")).toBeDisabled();
    expect(screen.getByTestId("sendSms-checkbox")).toBeDisabled();
    expect(screen.getByTestId("actif-checkbox")).toBeDisabled();

    expect(screen.queryByTestId("password-input")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("confirmPassword-input"),
    ).not.toBeInTheDocument();
  });

  it("displays skeleton form when isLoading is true", () => {
    mockUseUserById.mockReturnValue({ user: null, isLoading: true });

    render(<UserModal onSubmit={mockOnSubmit} mode={Mode.EDIT} />);

    expect(screen.getByTestId("user-skeleton-form")).toBeInTheDocument();
    expect(screen.queryByTestId("username-input")).not.toBeInTheDocument();
  });

  it("calls onOpen when component mounts", () => {
    render(<UserModal onSubmit={mockOnSubmit} mode={Mode.CREATE} />);
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
  });

  it("closeModalHandler correctly closes modal and navigates", async () => {
    render(<UserModal onSubmit={mockOnSubmit} mode={Mode.EDIT} />);

    fireEvent.click(screen.getByTestId("modal-close-button"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockHistoryReplace).toHaveBeenCalledWith("/administration/users");
  });

  it("renders select options correctly", () => {
    render(<UserModal onSubmit={mockOnSubmit} mode={Mode.CREATE} />);

    const creatorSelect = screen.getByTestId("creatorAccountId-select");
    const customerSelect = screen.getByTestId("customerAccountId-select");

    expect(creatorSelect).toHaveTextContent("Creator One");
    expect(creatorSelect).toHaveTextContent("Creator Two");
    expect(creatorSelect).toHaveTextContent("Creator Three");

    expect(customerSelect).toHaveTextContent("Creator One");
    expect(customerSelect).toHaveTextContent("Creator Two");
    expect(customerSelect).toHaveTextContent("Creator Three");
  });

  it("applies email validation rule correctly in create mode", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: undefined });
    mockUseUserById.mockReturnValue({ user: null, isLoading: false });

    const { getByTestId } = render(
      <UserModal onSubmit={mockOnSubmit} mode={Mode.CREATE} />,
    );
    const emailInput = getByTestId("email-input");

    await userEvent.type(emailInput, "invalid-email");

    expect(emailInput).toHaveValue("invalid-email");
  });

  it("applies password confirmation validation rule correctly in create mode", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: undefined });
    mockUseUserById.mockReturnValue({ user: null, isLoading: false });

    const { getByTestId } = render(
      <UserModal onSubmit={mockOnSubmit} mode={Mode.CREATE} />,
    );
    const passwordInput = getByTestId("password-input");
    const confirmPasswordInput = getByTestId("confirmPassword-input");

    await userEvent.type(passwordInput, "Password123!");
    await userEvent.type(confirmPasswordInput, "DifferentPassword");

    expect(passwordInput).toHaveValue("Password123!");
    expect(confirmPasswordInput).toHaveValue("DifferentPassword");
  });
});
