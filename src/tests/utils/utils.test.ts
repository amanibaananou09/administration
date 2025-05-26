import {
  createPeriod,
  decodeToken,
  formatDate,
  formatNumber,
  getColorForTankLevel,
} from "../../utils/utils";

jest.mock("../../common/api/general-user-api");
jest.mock("jwt-decode");
jest.mock("lodash/debounce", () => (fn: any) => fn);

describe("utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("decodeToken should return user object", () => {
    const mockDecode = jest.requireMock("jwt-decode");
    mockDecode.mockReturnValue({
      sid: "12345",
      email: "john.doe@example.com",
      family_name: "Doe",
      given_name: "John",
      preferred_username: "johndoe",
      realm_access: { roles: ["user"] },
      exp: 1234567890,
      phone: "1234567890",
      name: "John Doe",
      customerAccountId: "acc123",
    });

    const token = "mockToken";
    const user = decodeToken(token);

    expect(user).toEqual({
      id: "12345",
      phone: "1234567890",
      name: "John Doe",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      role: "user",
      token: "mockToken",
      email: "john.doe@example.com",
      expireTime: 1234567890 * 1000,
      customerAccountId: "acc123",
      impersonationMode: false,
      originalUserId: null,
    });
  });

  it("formatDate should return '--' for null input", () => {
    const formattedDate = formatDate(null);
    expect(formattedDate).toBe("--");
  });

  it("formatNumber should return number with two decimal places", () => {
    expect(formatNumber(3.14159)).toBe(3.14);
    expect(formatNumber(5)).toBe(5.0);
    expect(formatNumber(2.71828)).toBe(2.72);
  });

  it("getColorForTankLevel should return correct color codes", () => {
    expect(getColorForTankLevel(95)).toBe("#07C100");
    expect(getColorForTankLevel(90)).toBe("#07C100");
    expect(getColorForTankLevel(70)).toBe("#1FC32F");
    expect(getColorForTankLevel(60)).toBe("#1FC32F");
    expect(getColorForTankLevel(55)).toBe("#EAA817");
    expect(getColorForTankLevel(50)).toBe("#EAA817");
    expect(getColorForTankLevel(40)).toBe("#EA8B17");
    expect(getColorForTankLevel(30)).toBe("#EA8B17");
    expect(getColorForTankLevel(20)).toBe("#E02200");
    expect(getColorForTankLevel(10)).toBe("#E02200");
  });

  describe("createPeriod", () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(new Date("2025-05-24T12:00:00Z"));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should return today's period", () => {
      const result = createPeriod("today");
      expect(result.fromDate).toBe("2025-05-24T00:00");
      expect(result.toDate).toBe("2025-05-24T23:59");
    });

    it("should return yesterday's period", () => {
      const result = createPeriod("yesterday");
      expect(result.fromDate).toBe("2025-05-23T00:00");
      expect(result.toDate).toBe("2025-05-23T23:59");
    });

    it("should return monthly period", () => {
      const result = createPeriod("monthly");
      expect(result.fromDate).toBe("2025-05-01T00:00");
      expect(result.toDate).toBe("2025-05-31T23:59");
    });

    it("should return yearly period", () => {
      const result = createPeriod("yearly");
      expect(result.fromDate).toBe("2025-01-01T00:00");
      expect(result.toDate).toBe("2025-12-31T23:59");
    });

    it("should return today's period for unknown period", () => {
      const result = createPeriod("unknown");
      expect(result.fromDate).toBe("2025-05-24T00:00");
      expect(result.toDate).toBe("2025-05-24T23:59");
    });
  });
});
