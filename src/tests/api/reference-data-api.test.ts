import api from "../../common/api/axios";
import { getListOfCountry } from "../../common/api/reference-data-api";

jest.mock("../../common/api/axios");

describe("getListOfCountry", () => {
  it("should return list of countries", async () => {
    const mockCountries = [
      { id: 1, name: "France" },
      { id: 2, name: "Germany" },
    ];

    (api.get as jest.Mock).mockResolvedValue({ data: mockCountries });

    const result = await getListOfCountry();

    expect(api.get).toHaveBeenCalledWith("/referenceData/countries");
    expect(result).toEqual(mockCountries);
  });
});
