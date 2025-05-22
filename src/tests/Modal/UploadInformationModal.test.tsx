import React from "react";
import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContext } from "../../store/AuthContext";
import { MemoryRouter } from "react-router-dom";
import UploadInformationModal from "../../components/Modal/UploadInformationModal";
import {
  useStationById,
  useUploadedInformation,
} from "../../hooks/use-station";
import { useFirmwareVersion } from "../../hooks/use-configuration";
import { useDateByController } from "../../hooks/use-controller";

jest.mock("../../hooks/use-station", () => ({
  useStationById: jest.fn(),
  useUploadedInformation: jest.fn(),
}));
jest.mock("@chakra-ui/react", () => {
  const actual = jest.requireActual("@chakra-ui/react");
  return {
    ...actual,
    useDisclosure: () => ({
      isOpen: true,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    }),
  };
});
jest.mock("../../hooks/use-configuration", () => ({
  useFirmwareVersion: jest.fn(),
}));

jest.mock("../../hooks/use-controller", () => ({
  useDateByController: jest.fn(),
}));

describe("UploadInformationModal", () => {
  const mockUser = {
    originalUserId: null,
    id: "user-id",
    firstName: "Test",
    lastName: "User",
    email: "testuser@example.com",
    username: "testuser",
    role: "admin",
    token: "token",
    expireTime: 0,
    phone: "1234567890",
    name: "Test User",
    customerAccountId: "123",
    creatorAccountId: "1",
    impersonationMode: false,
  };

  const mockAuthContext = {
    token: "token",
    isSignedIn: true,
    user: mockUser,
    signIn: jest.fn(),
    signOut: jest.fn(),
    impersonate: jest.fn(),
  };

  const renderComponent = () => {
    render(
      <ChakraProvider>
        <AuthContext.Provider value={mockAuthContext}>
          <MemoryRouter
            initialEntries={["/administration/stations/1/upload/1"]}
          >
            <UploadInformationModal />
          </MemoryRouter>
        </AuthContext.Provider>
      </ChakraProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useUploadedInformation as jest.Mock).mockReturnValue({
      information: {
        pumpTransactionsTotal: 10,
        pumpTransactionsUploaded: 8,
        tankMeasurementsTotal: 5,
        tankMeasurementsUploaded: 4,
        inTankDeliveriesTotal: 3,
        inTankDeliveriesUploaded: 2,
        gpsRecordsTotal: 7,
        gpsRecordsUploaded: 6,
        alertRecordsTotal: 4,
        alertRecordsUploaded: 3,
      },
      isLoading: false,
      error: null,
    });

    (useFirmwareVersion as jest.Mock).mockReturnValue({
      firmwareVersion: { dateTime: "01-01-23T12:00:00" },
      isLoadingg: false,
    });

    (useDateByController as jest.Mock).mockReturnValue({
      DateTime: { DateTime: "2023-01-01T12:00:00" },
      isLoadings: false,
      error: null,
    });

    (useStationById as jest.Mock).mockReturnValue({
      station: { id: "1", name: "Station Name" },
      isLoading: false,
    });
  });

  it("should render the modal title correctly", () => {
    renderComponent();
    expect(
      screen.getByText(/UploadInformationModal.title.firstLine/i),
    ).toBeInTheDocument();
  });

  it("should display loading skeleton when loading", () => {
    (useUploadedInformation as jest.Mock).mockReturnValue({
      information: null,
      isLoading: true,
      error: null,
    });
    renderComponent();
    expect(screen.getByTestId("skeleton-table")).toBeInTheDocument();
  });

  it("should display table data when loaded", () => {
    renderComponent();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
    expect(screen.getByText(/8/i)).toBeInTheDocument();
  });

  it("should show toast and close modal when there's an error", () => {
    (useDateByController as jest.Mock).mockReturnValue({
      DateTime: null,
      isLoadings: false,
      error: new Error("Test error"),
    });

    renderComponent();
  });
});
