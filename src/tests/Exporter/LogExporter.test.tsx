import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as XLSX from "xlsx";
import LogExporter from "../../components/Exporter/LogExporter";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("jspdf-autotable", () => ({}));
jest.mock("xlsx", () => ({
  utils: {
    json_to_sheet: jest.fn(),
    book_new: jest.fn(),
    book_append_sheet: jest.fn(),
  },
  writeFile: jest.fn(),
}));

describe("LogExporter", () => {
  const mockLogs = [
    {
      id: "1",
      activityDate: "2023-05-21T12:00:00Z",
      userName: "User1",
      action: "Login",
      impersonationMode: false,
      ipAddress: "192.168.1.1",
    },
  ];

  it("renders export button", () => {
    render(<LogExporter logs={mockLogs} />);
    expect(screen.getByText("logModal.export")).toBeInTheDocument();
  });

  it("calls XLSX functions when button clicked", () => {
    render(<LogExporter logs={mockLogs} />);
    fireEvent.click(screen.getByText("logModal.export"));

    expect(XLSX.utils.json_to_sheet).toHaveBeenCalled();
    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalled();
    expect(XLSX.writeFile).toHaveBeenCalled();
  });
});
