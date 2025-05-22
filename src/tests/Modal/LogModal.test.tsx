import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { MemoryRouter, useHistory, useParams } from "react-router-dom";
import { useLog } from "../../hooks/use-user";
import { useAuth } from "../../store/AuthContext";
import LogModal from "../../components/Modal/LogModal";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useDisclosure: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useHistory: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("../../hooks/use-user", () => ({
  useLog: jest.fn(),
}));

jest.mock("../../store/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("LogModal", () => {
  const mockOnClose = jest.fn();
  const mockHistoryReplace = jest.fn();
  const mockT = jest.fn((key) => key);

  beforeEach(() => {
    (useDisclosure as jest.Mock).mockReturnValue({
      isOpen: true,
      onOpen: jest.fn(),
      onClose: mockOnClose,
    });

    (useTranslation as jest.Mock).mockReturnValue({
      t: mockT,
    });

    (useHistory as jest.Mock).mockReturnValue({
      replace: mockHistoryReplace,
    });

    (useParams as jest.Mock).mockReturnValue({
      userId: "123",
    });

    (useAuth as jest.Mock).mockReturnValue({
      user: {
        customerAccountId: "456",
      },
    });

    (useLog as jest.Mock).mockReturnValue({
      log: [
        {
          id: "1",
          index: 1,
          activityDate: "2023-01-01T00:00:00Z",
          userName: "Test User",
          action: "Login",
          impersonationMode: false,
          ipAddress: "192.168.1.1",
        },
      ],
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal with correct title", async () => {
    mockT.mockImplementation((key) => {
      if (key === "logModal.title") return "Logs Utilisateur";
      return key;
    });

    render(
      <MemoryRouter>
        <LogModal />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockT).toHaveBeenCalledWith("logModal.title");

      expect(screen.getByText("Logs Utilisateur")).toBeInTheDocument();
    });
  });

  it("calls onClose and navigates when modal is closed", () => {
    render(
      <MemoryRouter>
        <LogModal />
      </MemoryRouter>,
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
    expect(mockHistoryReplace).toHaveBeenCalledWith("/administration/users");
  });

  it("displays loading skeleton when data is loading", () => {
    (useLog as jest.Mock).mockReturnValueOnce({
      log: [],
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <LogModal />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("skeleton-table")).toBeInTheDocument();
  });
});
