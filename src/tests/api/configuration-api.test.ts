import api from "../../common/api/axios";
import { getFirmwareVersion } from "../../common/api/configuration-api";

jest.mock("../../common/api/axios");

describe("getFirmwareVersion", () => {
  const mockPtsId = "12345";
  const mockResponseData = { version: "1.2.3" };

  beforeEach(() => {
    (api.get as jest.Mock).mockClear();
  });

  it("should call the API with correct parameters", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

    await getFirmwareVersion(mockPtsId);

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith("/configuration/version", {
      params: { ptsId: mockPtsId },
    });
  });

  it("should return the response data", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

    const result = await getFirmwareVersion(mockPtsId);

    expect(result).toEqual(mockResponseData);
  });

  it("should handle errors", async () => {
    const errorMessage = "Network Error";
    (api.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getFirmwareVersion(mockPtsId)).rejects.toThrow(errorMessage);
  });
});
