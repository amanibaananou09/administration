import api from "../../common/api/axios";
import { PTSDateTime } from "../../common/AdminModel";
import { dateTime } from "../../common/api/controller-api";

jest.mock("../../common/api/axios");

describe("dateTime function", () => {
  const mockCustomerAccountId = "cust123";
  const mockStationId = "station456";
  const mockResponseData: PTSDateTime = {
    DateTime: "2023-01-01T12:00:00",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should make a POST request to the correct endpoint and return data", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: mockResponseData });

    const result = await dateTime(mockCustomerAccountId, mockStationId);

    expect(api.post).toHaveBeenCalledWith(
      `/customerAccount/${mockCustomerAccountId}/station/${mockStationId}/date`,
    );

    expect(result).toEqual(mockResponseData);
  });

  it("should handle undefined parameters", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: mockResponseData });

    const result = await dateTime(undefined, undefined);
    expect(api.post).toHaveBeenCalledWith(
      "/customerAccount/undefined/station/undefined/date",
    );

    expect(result).toEqual(mockResponseData);
  });

  it("should throw an error if the request fails", async () => {
    const mockError = new Error("Request failed");
    (api.post as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(
      dateTime(mockCustomerAccountId, mockStationId),
    ).rejects.toThrow(mockError);
  });
});
