import api from "../../common/api/axios";
import { Country, Station, User } from "../../common/model";
import {
  CustomerAccount,
  GeneralStations,
  GeneralUser,
  MasterUser,
  PaymentMethod,
} from "../../common/AdminModel";
import {
  activateStation,
  allStationByCustomerAccount,
  allUserByCustomerAccount,
  createStation,
  deactivateStation,
  deleteStation,
  getCustomerAccountInformation,
  getDefaultStation,
  getStationForUser,
  getStations,
  getUploadedInformation,
  listOfCreator,
  listStation,
  stationInformation,
  updateStation,
} from "../../common/api/station-api";

jest.mock("../../common/api/axios");
const API_URL = "/customerAccount";

describe("CustomerAccount Service", () => {
  const mockMasterUser: MasterUser = {
    id: "master1",
    userIdentifier: "master_001",
    username: "masteruser",
    email: "master@example.com",
    firstName: "Master",
    lastName: "User",
    phone: "+123456789",
    password: "masterpass",
    role: "MASTER",
  };

  const mockGeneralUser: GeneralUser = {
    id: 1,
    userIdentifier: "user_001",
    actif: true,
    dateStatusChange: "2023-01-01",
    username: "testuser",
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    password: "testpass",
    role: "USER",
    phone: "+123456789",
    changePassword: false,
    sendSms: true,
    subnetMask: "255.255.255.0",
    customerAccountId: "123",
    creatorAccountId: "creator1",
    lastConnectionDate: "2023-01-01",
    creatorCustomerAccountName: "Creator Account",
    customerAccountName: "Customer Account",
  };

  const mockPaymentMethods: PaymentMethod[] = [
    { code: "CARD", customerAccountId: "123" },
    { code: "CASH", customerAccountId: "123" },
  ];

  const mockCustomerAccount: CustomerAccount = {
    id: "123",
    identifier: "CUST_001",
    name: "Test Account",
    city: "Test City",
    creatorAccountId: "creator1",
    parentId: "parent1",
    parentName: "Parent Account",
    creatorCustomerAccountName: "Creator Account",
    resaleRight: true,
    cardManager: true,
    exported: false,
    dateStatusChange: "2023-01-01",
    stations: 5,
    stationsCount: 5,
    status: "ACTIVE",
    actif: true,
    masterUser: mockMasterUser,
    creatorUser: mockGeneralUser,
    paymentMethods: mockPaymentMethods,
    plannedExportDate: "2023-12-31",
    scheduledDate: "2023-06-01",
  };

  const mockUser: User = {
    originalUserId: 1,
    id: "user1",
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    username: "testuser",
    role: "admin",
    token: "testtoken",
    expireTime: 3600,
    phone: "+123456789",
    name: "Test User",
    customerAccountId: "123",
    creatorAccountId: "creator1",
    impersonationMode: false,
  };

  const mockControllerPts = {
    id: 1,
    ptsId: "pts123",
    currentConfigurationId: 1,
    currentFirmwareInformation: {
      ptsId: "pts123",
      dateTime: "2023-01-01",
      versionState: true,
      modificationDate: "2023-01-01",
    },
  };

  const mockCountry: Country = {
    id: 1,
    name: "United States",
    code: "US",
    currency: {
      code: "USD",
      id: 1,
      locale: "en-US",
      name: "US Dollar",
    },
    currencyId: 1,
    phoneCode: "1",
    phonePrefix: "+1",
  };

  const mockStation: Station = {
    id: 1,
    name: "Test Station",
    address: "123 Test St",
    actif: true,
    controllerPts: mockControllerPts,
    country: mockCountry,
  };

  const mockGeneralStation: GeneralStations = {
    id: "1",
    identifier: "ST001",
    name: "Test Station",
    address: "123 Test St",
    city: "Test City",
    creatorCustomerAccountName: "Creator Account",
    customerAccountName: "Customer Account",
    creatorAccountId: "creator1",
    account: "account1",
    controllerType: "Type A",
    actif: true,
    controllerPts: {
      ptsId: "pts123",
      phone: "+123456789",
      controllerType: "Type A",
      userController: {
        username: "controllerUser",
        password: "password123",
      },
    },
    phone: "+123456789",
    connection: "Online",
    createdDate: "2023-01-01",
    password: "stationPass",
    countryId: 1,
    customerAccountId: "123",
    cordonneesGps: "40.7128,-74.0060",
    modeAffectation: "Auto",
    country: mockCountry,
    journal: "Journal entry",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getStationForUser", () => {
    it("should fetch stations for a user", async () => {
      const expectedData = [mockStation];
      (api.get as jest.Mock).mockResolvedValue({ data: expectedData });

      const result = await getStationForUser("testuser", mockUser);
      expect(result).toEqual(expectedData);
      expect(api.get).toHaveBeenCalledWith(
        `${API_URL}/${mockUser.customerAccountId}/station?userLogin=testuser`,
        {
          headers: {
            Authorization: "Bearer testtoken",
          },
        },
      );
    });

    it("should handle errors", async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

      await expect(getStationForUser("testuser", mockUser)).rejects.toThrow();
    });
  });

  describe("getStations", () => {
    it("should fetch stations for the current user", async () => {
      const expectedData = [mockStation];
      (api.get as jest.Mock).mockResolvedValue({ data: expectedData });

      const result = await getStations(mockUser);
      expect(result).toEqual(expectedData);
    });
  });

  describe("createStation", () => {
    it("should create a new station", async () => {
      const newStation = {
        name: "New Station",
        address: "456 New St",
        controllerPts: mockControllerPts,
        country: mockCountry,
      };
      (api.post as jest.Mock).mockResolvedValue({ data: newStation });

      const result = await createStation(newStation as Station, mockUser);
      expect(result).toEqual(newStation);
    });
  });

  describe("updateStation", () => {
    it("should update a station", async () => {
      const updatedStation = { ...mockGeneralStation, name: "Updated Station" };
      (api.put as jest.Mock).mockResolvedValue({ data: updatedStation });

      const result = await updateStation("123", updatedStation);
      expect(result).toEqual(updatedStation);
    });
  });

  describe("deleteStation", () => {
    it("should delete a station", async () => {
      const mockResponse = { success: true };
      (api.delete as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await deleteStation(mockStation);

      expect(result).toEqual(mockResponse);
      expect(api.delete).toHaveBeenCalledWith(`${API_URL}/delete/1`);
    });

    it("should handle delete errors", async () => {
      (api.delete as jest.Mock).mockRejectedValue(new Error("Delete failed"));
      await expect(deleteStation(mockStation)).rejects.toThrow("Delete failed");
    });
  });

  describe("getDefaultStation", () => {
    it("should return the first station if available", async () => {
      const stations = [mockStation, { ...mockStation, id: 2 }];

      (api.get as jest.Mock).mockResolvedValue({ data: stations });

      const result = await getDefaultStation(mockUser);
      expect(result).toEqual(stations[0]);
    });

    describe("getDefaultStation", () => {
      it("should return the first station if available", async () => {
        const stations = [mockStation, { ...mockStation, id: 2 }];
        (api.get as jest.Mock).mockResolvedValue({ data: stations });

        const result = await getDefaultStation(mockUser);
        expect(result).toEqual(stations[0]);
        expect(api.get).toHaveBeenCalledWith(
          `${API_URL}/${mockUser.customerAccountId}/station?userLogin=${mockUser.username}`,
          {
            headers: {
              Authorization: "Bearer testtoken",
            },
          },
        );
      });

      it("should return null if no stations", async () => {
        (api.get as jest.Mock).mockResolvedValue({ data: [] });

        const result = await getDefaultStation(mockUser);
        expect(result).toBeNull();
      });
    });

    describe("allStationByCustomerAccount", () => {
      it("should fetch all stations for a customer account", async () => {
        const expectedData = [mockStation];
        (api.get as jest.Mock).mockResolvedValue({ data: expectedData });

        const result = await allStationByCustomerAccount("123");
        expect(result).toEqual(expectedData);
        expect(api.get).toHaveBeenCalledWith(`${API_URL}/123/station`);
      });
    });

    describe("allUserByCustomerAccount", () => {
      it("should fetch all users for a customer account", async () => {
        const expectedData = [mockGeneralUser];
        (api.get as jest.Mock).mockResolvedValue({ data: expectedData });

        const result = await allUserByCustomerAccount("123");
        expect(result).toEqual(expectedData);
        expect(api.get).toHaveBeenCalledWith(`${API_URL}/123/user`);
      });
    });

    describe("getCustomerAccountInformation", () => {
      it("should fetch complete customer account information", async () => {
        (api.get as jest.Mock).mockResolvedValue({ data: mockCustomerAccount });

        const result = await getCustomerAccountInformation("123");
        expect(result).toEqual(mockCustomerAccount);
        expect(result.masterUser).toBeDefined();
        expect(result.creatorUser).toBeDefined();
        expect(result.paymentMethods).toHaveLength(2);
        expect(api.get).toHaveBeenCalledWith(`${API_URL}/123/info`);
      });
    });

    describe("listStation", () => {
      it("should list stations with pagination", async () => {
        const expectedData = {
          content: [mockGeneralStation],
          totalPages: 1,
          totalElements: 1,
          numberOfElements: 1,
          size: 10,
        };
        (api.get as jest.Mock).mockResolvedValue({ data: expectedData });

        const result = await listStation({ customerAccountId: "123" }, 0, 10);
        expect(result).toEqual(expectedData);
        expect(api.get).toHaveBeenCalledWith(
          `${API_URL}/123/station/list?page=0&size=10`,
        );
      });

      it("should filter stations when criteria provided", async () => {
        const expectedData = {
          content: [mockGeneralStation],
          totalPages: 1,
          totalElements: 1,
          numberOfElements: 1,
          size: 10,
        };
        (api.get as jest.Mock).mockResolvedValue({ data: expectedData });

        const result = await listStation(
          {
            customerAccountId: "123",
            name: "Test",
            creator: "user1",
            parent: "parent1",
          },
          0,
          10,
        );
        expect(result).toEqual(expectedData);
        expect(api.get).toHaveBeenCalledWith(
          `${API_URL}/123/station/filter?name=Test&creator=user1&parent=parent1&page=0&size=10`,
        );
      });
    });

    describe("listOfCreator", () => {
      it("should list creators for a customer account", async () => {
        const expectedData: CustomerAccount[] = [mockCustomerAccount];
        (api.get as jest.Mock).mockResolvedValue({ data: expectedData });

        const result = await listOfCreator("123");
        expect(result).toEqual(expectedData);
        expect(api.get).toHaveBeenCalledWith(`${API_URL}/123/creator`);
      });
    });

    describe("activateStation", () => {
      it("should activate a station", async () => {
        const expectedData = { success: true };
        (api.put as jest.Mock).mockResolvedValue({ data: expectedData });

        const result = await activateStation("123", "1");
        expect(result).toEqual(expectedData);
        expect(api.put).toHaveBeenCalledWith(
          `${API_URL}/123/station/activate/1`,
        );
      });
    });

    describe("deactivateStation", () => {
      it("should deactivate a station", async () => {
        const expectedData = { success: true };
        (api.put as jest.Mock).mockResolvedValue({ data: expectedData });

        const result = await deactivateStation("123", "1");
        expect(result).toEqual(expectedData);
        expect(api.put).toHaveBeenCalledWith(
          `${API_URL}/123/station/deactivate/1`,
        );
      });
    });

    describe("stationInformation", () => {
      it("should fetch station information", async () => {
        (api.get as jest.Mock).mockResolvedValue({ data: mockGeneralStation });

        const result = await stationInformation(1, "123");
        expect(result).toEqual(mockGeneralStation);
        expect(api.get).toHaveBeenCalledWith(`${API_URL}/123/station/1/info`);
      });
    });

    describe("getUploadedInformation", () => {
      it("should fetch uploaded information", async () => {
        const expectedData = { data: "test data" };
        (api.post as jest.Mock).mockResolvedValue({ data: expectedData });

        const result = await getUploadedInformation("123", "pts123");
        expect(result).toEqual(expectedData);
        expect(api.post).toHaveBeenCalledWith(`${API_URL}/123/station/pts123`);
      });
    });
  });
});
