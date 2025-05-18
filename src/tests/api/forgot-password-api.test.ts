import api from "../../common/api/axios";
import {
  forgotPassword,
  resetPassword,
} from "../../common/api/forgot-password-api";

jest.mock("../../common/api/axios");

const mockedApi = api as jest.Mocked<typeof api>;

describe("User API functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("forgotPassword should call api.post with correct URL", async () => {
    const mockResponse = { data: { message: "Email sent" } };
    mockedApi.post.mockResolvedValueOnce(mockResponse);

    const email = "test@example.com";
    const result = await forgotPassword(email);

    expect(mockedApi.post).toHaveBeenCalledWith(
      `/user/forgot-password?email=${email}`,
    );
    expect(result).toEqual(mockResponse.data);
  });

  it("resetPassword should call api.put with correct URL and body", async () => {
    const mockResponse = { data: { message: "Password reset" } };
    mockedApi.put.mockResolvedValueOnce(mockResponse);

    const password = "newPassword123";
    const resetToken = "abc123";

    const result = await resetPassword(password, resetToken);

    expect(mockedApi.put).toHaveBeenCalledWith(
      `/user/reset-password?resetToken=${resetToken}`,
      {
        password,
      },
    );
    expect(result).toEqual(mockResponse.data);
  });

  it("resetPassword with null resetToken", async () => {
    const mockResponse = { data: { message: "Password reset" } };
    mockedApi.put.mockResolvedValueOnce(mockResponse);

    const password = "newPassword123";
    const resetToken = null;

    const result = await resetPassword(password, resetToken);

    expect(mockedApi.put).toHaveBeenCalledWith(
      `/user/reset-password?resetToken=${resetToken}`,
      {
        password,
      },
    );
    expect(result).toEqual(mockResponse.data);
  });
});
