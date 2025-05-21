import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FilterLog from "../../components/Filter/FilterLog";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: any) => key,
  }),
}));

describe("FilterLog Component", () => {
  let onSearchMock: jest.Mock;
  let onClearMock: jest.Mock;

  beforeEach(() => {
    onSearchMock = jest.fn();
    onClearMock = jest.fn();
    render(<FilterLog onSearch={onSearchMock} onClear={onClearMock} />);
  });

  it("should render input fields and buttons", () => {
    expect(screen.getByText("logModal.interval:")).toBeInTheDocument();

    expect(document.getElementById("startDate")).toBeInTheDocument();
    expect(document.getElementById("endDate")).toBeInTheDocument();

    expect(screen.getByText("logModal.display")).toBeInTheDocument();
    expect(screen.getByText("common.clear")).toBeInTheDocument();
  });

  it("should call onSearch with correct parameters", () => {
    const startInput = document.getElementById("startDate");
    const endInput = document.getElementById("endDate");

    expect(startInput).not.toBeNull();
    expect(endInput).not.toBeNull();

    fireEvent.change(startInput as HTMLElement, {
      target: { value: "2023-01-01T00:00" },
    });
    fireEvent.change(endInput as HTMLElement, {
      target: { value: "2023-01-02T00:00" },
    });
    fireEvent.click(screen.getByText("logModal.display"));

    expect(onSearchMock).toHaveBeenCalledWith({
      startDate: "2023-01-01T00:00",
      endDate: "2023-01-02T00:00",
    });
  });

  it("should display error message for invalid date range", () => {
    const startInput = document.getElementById("startDate");
    const endInput = document.getElementById("endDate");

    expect(startInput).not.toBeNull();
    expect(endInput).not.toBeNull();

    fireEvent.change(startInput as HTMLElement, {
      target: { value: "2023-01-02T00:00" },
    });
    fireEvent.change(endInput as HTMLElement, {
      target: { value: "2023-01-01T00:00" },
    });
    fireEvent.click(screen.getByText("logModal.display"));

    expect(screen.getByText("logModal.errorDate")).toBeInTheDocument();
  });

  it("should clear filters when clear button is clicked", () => {
    const startInput = document.getElementById("startDate");
    const endInput = document.getElementById("endDate");

    expect(startInput).not.toBeNull();
    expect(endInput).not.toBeNull();

    fireEvent.change(startInput as HTMLElement, {
      target: { value: "2023-01-02T00:00" },
    });
    fireEvent.change(endInput as HTMLElement, {
      target: { value: "2023-01-01T00:00" },
    });
    fireEvent.click(screen.getByText("common.clear"));

    expect(onClearMock).toHaveBeenCalled();
    expect(
      (document.getElementById("startDate") as HTMLInputElement).value,
    ).toBe("");
    expect((document.getElementById("endDate") as HTMLInputElement).value).toBe(
      "",
    );
  });
});
