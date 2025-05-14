import { User } from "common/model";
import api from "../../common/api/axios";
import {
  createUser,
  exitImpersonation,
  impersonateUser,
  login,
  searchUser,
} from "../../common/api/auth-api";
import { CustomerAccount } from "../../common/AdminModel";

jest.mock("../../common/api/axios");

describe("API User Module", () => {
  const mockPost = jest.fn();
  const mockGet = jest.fn();

  beforeEach(() => {
    (api as jest.Mocked<typeof api>).post.mockImplementation(mockPost);
    (api as jest.Mocked<typeof api>).get.mockImplementation(mockGet);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should send login request with correct parameters", async () => {
      const mockResponse = { data: { token: "test-token", user: { id: 1 } } };
      mockPost.mockResolvedValue(mockResponse);

      const username = "testuser";
      const password = "testpass";
      const result = await login(username, password);

      expect(mockPost).toHaveBeenCalledWith("/login", {
        username,
        password,
        admin: true,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle login error", async () => {
      const errorResponse = {
        response: {
          status: 401,
          data: { error: "Unauthorized" },
        },
      };
      mockPost.mockRejectedValue(errorResponse);

      await expect(login("wrong", "credentials")).rejects.toMatchObject(
        errorResponse,
      );
    });
  });

  describe("createUser", () => {
    it("should send user creation request with correct data", async () => {
      const mockResponse = { data: { id: 123 } };
      mockPost.mockResolvedValue(mockResponse);

      const testUser: User = {
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

      const result = await createUser(testUser);

      expect(mockPost).toHaveBeenCalledWith("/createUser", {
        lastName: testUser.lastName,
        firstName: testUser.firstName,
        username: testUser.username,
        email: testUser.email,
        role: testUser.role,
      });

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("searchUser", () => {
    it("should fetch user list with complete customer account data", async () => {
      const mockUsers: CustomerAccount[] = [
        {
          id: "1",
          identifier: "CUST001",
          name: "User 1",
          city: "Paris",
          creatorAccountId: "ADMIN1",
          parentId: "PARENT1",
          resaleRight: true,
          cardManager: false,
          exported: false,
          status: "ACTIVE",
          masterUser: {
            username: "user1",
            email: "user1@test.com",
            firstName: "John",
            lastName: "Doe",
            phone: "0123456789",
          },
          paymentMethods: [{ code: "CARD" }, { code: "TRANSFER" }],
        },
        {
          id: "2",
          identifier: "CUST002",
          name: "User 2",
          city: "Lyon",
          creatorAccountId: "ADMIN1",
          parentId: "PARENT1",
          resaleRight: false,
          cardManager: true,
          exported: true,
          status: "INACTIVE",
          masterUser: {
            username: "user2",
            email: "user2@test.com",
            firstName: "Jane",
            lastName: "Smith",
            phone: "0987654321",
          },
          paymentMethods: [{ code: "CASH" }],
        },
      ];

      mockGet.mockResolvedValue({ data: mockUsers });

      const result = await searchUser();

      expect(mockGet).toHaveBeenCalledWith("/user/search");
      expect(result).toEqual(mockUsers);

      expect(result[0].masterUser.username).toBe("user1");
      expect(result[1].paymentMethods?.length).toBe(1);
      expect(result[0].status).toBe("ACTIVE");
    });
  });

  describe("impersonateUser", () => {
    it("should send impersonation request with correct user ID", async () => {
      const mockResponse = { data: { success: true } };
      const userId = 123;
      mockPost.mockResolvedValue(mockResponse);

      const result = await impersonateUser(userId);

      expect(mockPost).toHaveBeenCalledWith(`/impersonate/${userId}`);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("exitImpersonation", () => {
    it("should send exit impersonation request with correct user ID", async () => {
      const mockResponse = { data: { success: true } };
      const userId = 123;
      mockPost.mockResolvedValue(mockResponse);

      const result = await exitImpersonation(userId);

      expect(mockPost).toHaveBeenCalledWith(`/impersonate/${userId}/exit`);
      expect(result).toEqual(mockResponse.data);
    });
  });
});
