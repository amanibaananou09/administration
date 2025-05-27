import { useLocation } from "react-router-dom";
import { renderHook } from "@testing-library/react";
import useQueryParams from "../../hooks/use-query-params";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));

describe("useQueryParams", () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReset();
  });

  it("should return an empty URLSearchParams when there is no query string", () => {
    (useLocation as jest.Mock).mockReturnValue({ search: "" });

    const { result } = renderHook(() => useQueryParams());

    expect(result.current.toString()).toBe("");
    expect(result.current.get("anyParam")).toBeNull();
  });

  it("should parse simple query parameters correctly", () => {
    (useLocation as jest.Mock).mockReturnValue({ search: "?foo=bar&baz=qux" });

    const { result } = renderHook(() => useQueryParams());

    expect(result.current.get("foo")).toBe("bar");
    expect(result.current.get("baz")).toBe("qux");
    expect(result.current.get("undefinedParam")).toBeNull();
  });

  it("should parse parameters with empty values correctly", () => {
    (useLocation as jest.Mock).mockReturnValue({ search: "?foo=&bar" });

    const { result } = renderHook(() => useQueryParams());

    expect(result.current.get("foo")).toBe("");
    expect(result.current.get("bar")).toBe("");
  });

  it("should properly parse parameters with encoded values", () => {
    (useLocation as jest.Mock).mockReturnValue({
      search: "?name=John%20Doe&city=Paris%2C%20France",
    });

    const { result } = renderHook(() => useQueryParams());

    expect(result.current.get("name")).toBe("John Doe");
    expect(result.current.get("city")).toBe("Paris, France");
  });

  it("should be remembered when search does not change", () => {
    const search = "?foo=bar";
    (useLocation as jest.Mock).mockReturnValue({ search });

    const { result, rerender } = renderHook(() => useQueryParams());

    const firstInstance = result.current;

    rerender();

    expect(result.current).toBe(firstInstance);

    (useLocation as jest.Mock).mockReturnValue({ search: "?foo=baz" });
    rerender();

    expect(result.current).not.toBe(firstInstance);
    expect(result.current.get("foo")).toBe("baz");
  });
});
