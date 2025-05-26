import React from "react";
import { render, screen } from "@testing-library/react";
import UserModal from "../../components/Modal/UserModal";
import { UserFormValues } from "common/AdminModel";
import { UserModalProps } from "common/react-props";
import { Mode } from "../../common/enums";
import { useParams } from "react-router";
import { useUserById, useUserQueries } from "../../hooks/use-user";

jest.mock("react-router", () => {
  const actual = jest.requireActual("react-router");
  return {
    ...actual,
    useParams: jest.fn(),
    useHistory: jest.fn(),
  };
});

jest.mock("hooks/use-creators", () => ({
  __esModule: true,
  default: () => ({
    creators: [
      { id: "1", name: "Creator One" },
      { id: "2", name: "Creator Two" },
    ],
  }),
}));

jest.mock("hooks/use-user", () => ({
  useUserById: jest.fn(() => ({ user: null, isLoading: false })),
  useUserQueries: jest.fn(() => ({
    create: jest.fn(),
    update: jest.fn(),
  })),
}));

jest.mock("hooks/use-validators", () => ({
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
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const props: UserModalProps & {
    isOpen: boolean;
    user: UserFormValues;
    onClose: () => void;
  } = {
    isOpen: true,
    onClose: mockOnClose,
    user: mockUser,
    onSubmit: mockOnSubmit,
    mode: Mode.EDIT,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    (useUserById as jest.Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });
    (useUserQueries as jest.Mock).mockReturnValue({
      create: jest.fn(),
      update: jest.fn(),
    });
  });

  it("renders without crash and displays values in EDIT mode", () => {
    render(<UserModal {...props} />);
    expect(screen.getByDisplayValue("john_doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("john.doe@example.com"),
    ).toBeInTheDocument();
  });
});
