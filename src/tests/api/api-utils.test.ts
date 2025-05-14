import { addFilterParams } from "../../common/api/api-utils";

describe("addFilterParams", () => {
  it("should return the original URL when no dates are provided", () => {
    const url = "https://api.example.com/data?";
    const result = addFilterParams(url);
    expect(result).toBe(url);
  });

  it("should add startDate parameter when only startDate is provided", () => {
    const url = "https://api.example.com/data?";
    const startDate = "2025-01-01";
    const result = addFilterParams(url, startDate);
    expect(result).toBe(`${url}startDate=${startDate}`);
  });

  it("should add both startDate and endDate parameters when both are provided", () => {
    const url = "https://api.example.com/data?";
    const startDate = "2025-01-01";
    const endDate = "2025-12-31";
    const result = addFilterParams(url, startDate, endDate);
    expect(result).toBe(`${url}startDate=${startDate}&endDate=${endDate}`);
  });

  it("should handle URL that already has parameters", () => {
    const url = "https://api.example.com/data?param1=value1&";
    const startDate = "2025-01-01";
    const result = addFilterParams(url, startDate);
    expect(result).toBe(`${url}startDate=${startDate}`);
  });

  it("should handle empty string URL", () => {
    const url = "";
    const startDate = "2025-01-01";
    const result = addFilterParams(url, startDate);
    expect(result).toBe(`startDate=${startDate}`);
  });
});
