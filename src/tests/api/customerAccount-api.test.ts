import api from "../../common/api/axios";
import {
  activateCustomerAccount,
  addStation,
  createCustomerAccount,
  deactivateCustomerAccount,
  exportAccount,
  getCustomerAccountDetails,
  getCustomerAccounts,
  getlog,
  updateAccount,
} from "../../common/api/customerAccount-api";
import { addStations, CustomerAccount, Log } from "../../common/AdminModel";
import { LogCreteria } from "../../common/model";

jest.mock("../../common/api/axios");

const mockedApi = api as jest.Mocked<typeof api>;

describe("CustomerAccount ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const completeMockAccount: CustomerAccount = {
    id: "1",
    identifier: "ACC123",
    name: "Test Account",
    city: "Paris",
    creatorAccountId: "creator123",
    parentId: "parent123",
    resaleRight: true,
    cardManager: false,
    exported: false,
    status: "ACTIVE",
    masterUser: {
      id: "user1",
      userIdentifier: "USER123",
      username: "testuser",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      phone: "0123456789",
    },
    paymentMethods: [{ code: "CARD" }, { code: "CASH" }],
  };

  describe("getCustomerAccounts", () => {
    it("should fetch customer accounts with filter", async () => {
      const mockData = {
        content: [completeMockAccount],
        totalPages: 1,
        totalElements: 1,
        numberOfElements: 1,
        size: 10,
      };

      mockedApi.get.mockResolvedValue({ data: mockData });

      const result = await getCustomerAccounts(
        { name: "Test" },
        0,
        10,
        undefined,
      );

      expect(result).toEqual(mockData);
      expect(mockedApi.get).toHaveBeenCalledWith(
        "/customerAccount/filter?name=Test&page=0&size=10",
      );
    });
  });

  describe("getCustomerAccountDetails", () => {
    it("should fetch complete customer account details", async () => {
      mockedApi.get.mockResolvedValue({ data: completeMockAccount });

      const result = await getCustomerAccountDetails(1);

      expect(result).toEqual(completeMockAccount);
      expect(result.masterUser).toBeDefined();
      expect(result.paymentMethods?.length).toBe(2);
    });
  });

  describe("activateCustomerAccount", () => {
    it("should activate customer account with complete response", async () => {
      const mockResponse = {
        ...completeMockAccount,
        status: "ACTIVE",
        actif: true,
        dateStatusChange: new Date().toISOString(),
      };

      mockedApi.put.mockResolvedValue({ data: mockResponse });

      const result = await activateCustomerAccount("1");

      expect(result.status).toBe("ACTIVE");
      expect(result.actif).toBe(true);
    });
  });
  describe("deactivateCustomerAccount", () => {
    it("should deactivate customer account with string id", async () => {
      const accountId = "123";
      mockedApi.put.mockResolvedValue({ data: {} });

      await deactivateCustomerAccount(accountId);

      expect(mockedApi.put).toHaveBeenCalledWith(
        `/customerAccount/deactivate/${accountId}`,
      );
    });

    it("should deactivate customer account with number id", async () => {
      const accountId = 456;
      mockedApi.put.mockResolvedValue({ data: {} });

      await deactivateCustomerAccount(accountId);

      expect(mockedApi.put).toHaveBeenCalledWith(
        `/customerAccount/deactivate/${accountId}`,
      );
    });

    it("should throw error when API call fails", async () => {
      const accountId = "789";
      const errorMessage = "Network Error";
      mockedApi.put.mockRejectedValue(new Error(errorMessage));

      await expect(deactivateCustomerAccount(accountId)).rejects.toThrow(
        errorMessage,
      );
    });
  });

  describe("exportAccount", () => {
    it("should export account with string id", async () => {
      const accountId = "123";
      mockedApi.post.mockResolvedValue({ data: {} });

      await exportAccount(accountId);

      expect(mockedApi.post).toHaveBeenCalledWith(
        `/customerAccount/export/${accountId}`,
      );
    });

    it("should export account with number id", async () => {
      const accountId = 456;
      mockedApi.post.mockResolvedValue({ data: {} });

      await exportAccount(accountId);

      expect(mockedApi.post).toHaveBeenCalledWith(
        `/customerAccount/export/${accountId}`,
      );
    });

    it("should throw error when export fails", async () => {
      const accountId = "789";
      const errorMessage = "Export failed";
      mockedApi.post.mockRejectedValue(new Error(errorMessage));

      await expect(exportAccount(accountId)).rejects.toThrow(errorMessage);
    });

    it("should handle successful export with response data", async () => {
      const accountId = "999";
      const mockResponse = { exportId: "exp123", status: "completed" };
      mockedApi.post.mockResolvedValue({ data: mockResponse });

      const result = await exportAccount(accountId);

      expect(result).toEqual(mockResponse);
    });
  });
  describe("updateAccount", () => {
    it("should update account with all fields", async () => {
      const updatedAccount: CustomerAccount = {
        ...completeMockAccount,
        name: "Updated Name",
        city: "Lyon",
        paymentMethods: [{ code: "CARD" }],
      };

      mockedApi.put.mockResolvedValue({ data: updatedAccount });

      const result = await updateAccount(updatedAccount);

      expect(result.name).toBe("Updated Name");
      expect(result.city).toBe("Lyon");
      expect(result.paymentMethods?.length).toBe(1);
    });
  });

  describe("createCustomerAccount", () => {
    it("should create new customer account with all required fields", async () => {
      const newAccount: Omit<CustomerAccount, "id"> = {
        name: "New Account",
        city: "Marseille",
        creatorAccountId: "creator123",
        parentId: "parent456",
        resaleRight: false,
        cardManager: true,
        exported: false,
        status: "PENDING",
        masterUser: {
          username: "newuser",
          email: "new@example.com",
          firstName: "New",
          lastName: "User",
          phone: "0612345678",
        },
      };

      const mockResponse: CustomerAccount = {
        ...newAccount,
        id: "2",
        identifier: "ACC456",
        dateStatusChange: new Date().toISOString(),
      };

      mockedApi.post.mockResolvedValue({ data: mockResponse });

      const result = await createCustomerAccount(newAccount as CustomerAccount);

      expect(result.id).toBeDefined();
      expect(result.masterUser).toBeDefined();
    });
  });

  describe("addStation", () => {
    it("should add station with complete station data", async () => {
      const stationData: addStations = {
        identifier: "station123",
        name: "Test Station",
        address: "123 Test Street",
        countryId: 1,
        modeAffectation: "Auto",
        cordonneesGps: "15",
        controllerPts: {
          ptsId: "PTS2",
          userController: {
            username: "controller_user",
            password: "securepassword123",
          },
          phone: "+1234567890",
          controllerType: "TYPE_A",
        },
      };

      mockedApi.post.mockResolvedValue({ data: {} });

      await addStation("123", stationData);

      expect(mockedApi.post).toHaveBeenCalledWith(
        "/customerAccount/123/station/add",
        stationData,
      );
    });
  });

  describe("getlog", () => {
    it("should fetch logs with complete log data", async () => {
      const mockLogs: Log[] = [
        {
          id: "1",
          action: "CREATE",
          activityDate: "2025-01-01",
        },
      ];

      const criteria: LogCreteria = {
        startDate: "2025-01-01",
        endDate: "2025-01-31",
      };

      mockedApi.get.mockResolvedValue({ data: mockLogs });

      const result = await getlog("123", "456", criteria);

      expect(result[0].id).toBe("1");
      expect(result[0].action).toBe("CREATE");
      expect(result[0].activityDate).toBe("2025-01-01");
    });
  });
});
