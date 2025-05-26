import React from "react";
import { act, render, screen } from "@testing-library/react";
import { Mode } from "common/enums";
import CustomerAccountModal from "../../components/Modal/CustomerAccountModal";
import { MemoryRouter } from "react-router-dom";
import {
  useCustomerAccountById,
  useCustomerAccountQueries,
} from "../../hooks/use-customer-account";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));
jest.mock("../../hooks/use-creators", () => () => ({
  creators: [{ id: 1, name: "Creator 1", resaleRight: true }],
}));

jest.mock("../../hooks/use-customer-account", () => {
  const originalModule = jest.requireActual("../../hooks/use-customer-account");
  return {
    __esModule: true,
    ...originalModule,
    useCustomerAccountById: jest.fn(),
    useCustomerAccountQueries: jest.fn(),
  };
});
jest.mock("hooks/use-validators", () => () => ({
  identifierValidator: jest.fn(),
  nameValidator: jest.fn(),
  parentValidator: jest.fn(),
  creatorValidator: jest.fn(),
  cityValidator: jest.fn(),
  loginValidator: jest.fn(),
  emailValidator: jest.fn(),
  firstNameValidator: jest.fn(),
  lastNameValidator: jest.fn(),
  passwordValidator: jest.fn(),
  phoneValidator: jest.fn(),
  paymentMethodValidator: jest.fn(),
  plannedExportDateValidator: jest.fn(),
}));

describe("CustomerAccountModal", () => {
  const mockCreate = jest.fn();
  const mockUpdate = jest.fn();

  beforeEach(() => {
    (useCustomerAccountById as jest.Mock).mockReturnValue({
      customerAccount: {
        id: "1",
        name: "Test Account",
        city: "Test City",
        creatorAccountId: "creator-1",
        parentId: "parent-1",
        resaleRight: true,
        cardManager: false,
        exported: false,
        status: "active",
        masterUser: {
          id: "user-1",
          username: "testuser",
          email: "test@example.com",
          firstName: "Test",
          lastName: "User",
          phone: "1234567890",
        },
      },
      isLoading: false,
    });
    (useCustomerAccountQueries as jest.Mock).mockReturnValue({
      create: mockCreate,
      update: mockUpdate,
    });
  });

  it("renders correctly in create mode", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CustomerAccountModal mode={Mode.CREATE} onSubmit={jest.fn()} />
        </MemoryRouter>,
      );
    });

    expect(screen.getByText("customerAccountModal.header")).toBeInTheDocument();
    expect(screen.getByText("common.name")).toBeInTheDocument();
  });
});
