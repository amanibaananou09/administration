import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { GeneralUser } from "common/AdminModel";
import UserExporter from "../../components/Exporter/UserExporter";
import * as XLSX from "xlsx";
import { formatDate } from "utils/utils";

jest.mock("utils/utils", () => ({
  formatDate: jest.fn((dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }),
}));
jest.mock("jspdf", () => {
  const mockJsPDF = function () {
    return {
      autoTable: jest.fn(),
      save: jest.fn(),
      text: jest.fn(),
      internal: {
        pageSize: {
          getWidth: jest.fn().mockReturnValue(210),
          getHeight: jest.fn().mockReturnValue(297),
        },
        getFontSize: jest.fn().mockReturnValue(12),
        scaleFactor: 1,
        getStringUnitWidth: jest.fn().mockReturnValue(10),
      },
    };
  };
  mockJsPDF.prototype.autoTable = jest.fn();

  return mockJsPDF;
});

let mockWorkbook: any;

jest.mock("xlsx", () => {
  return {
    utils: {
      json_to_sheet: jest.fn(() => {
        return { A1: { v: "Test" } };
      }),
      book_new: jest.fn(() => {
        mockWorkbook = {
          SheetNames: [],
          Sheets: {},
        };
        return mockWorkbook;
      }),
      book_append_sheet: jest.fn((wb, ws, name) => {
        wb.SheetNames.push(name);
        wb.Sheets[name] = ws;
      }),
    },
    writeFile: jest.fn(),
  };
});

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockUsers: GeneralUser[] = [
  {
    username: "user1",
    firstName: "First1",
    lastName: "Last1",
    email: "user1@example.com",
    phone: "1234567890",
    customerAccountId: "account1",
    creatorAccountId: "creator1",
    actif: true,
    lastConnectionDate: new Date("2025-05-26T11:08:38.430Z").toISOString(),
    creatorCustomerAccountName: "Creator Account 1",
    customerAccountName: "Customer Account 1",
  },
  {
    username: "user2",
    firstName: "First2",
    lastName: "Last2",
    email: "user2@example.com",
    phone: "0987654321",
    customerAccountId: "account2",
    creatorAccountId: "creator2",
    actif: false,
    lastConnectionDate: new Date("2025-05-26T11:08:38.430Z").toISOString(),
    creatorCustomerAccountName: "Creator Account 2",
    customerAccountName: "Customer Account 2",
  },
];

describe("UserExporter", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (formatDate as jest.Mock).mockImplementation((dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    });
  });

  it("renders buttons correctly", () => {
    render(<UserExporter users={mockUsers} />);
    expect(screen.getByText("common.exportExcel")).toBeInTheDocument();
    expect(screen.getByText("common.exportPDF")).toBeInTheDocument();
  });

  it("calls exportToExcelHandler when Excel button is clicked", () => {
    render(<UserExporter users={mockUsers} />);
    const exportButton = screen.getByText("common.exportExcel");
    fireEvent.click(exportButton);

    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith(
      mockUsers.map((user) => ({
        "userManagement.globalUsers.userNameColumn": user.username || "",
        "userManagement.globalUsers.accountCreator":
          user.creatorCustomerAccountName || "",
        "userManagement.globalUsers.account": user.customerAccountName || "",
        "userManagement.globalUsers.statusColumn": user.actif
          ? "Active"
          : "Inactive",
        "userManagement.globalUsers.lastVisit": formatDate(
          user.lastConnectionDate,
        ),
      })),
    );
    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalled();
    expect(XLSX.writeFile).toHaveBeenCalled();
  });

  it("handles case when users array is empty for Excel export", () => {
    render(<UserExporter users={[]} />);
    const exportButton = screen.getByText("common.exportExcel");
    fireEvent.click(exportButton);

    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([]);
    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalled();
    expect(XLSX.writeFile).toHaveBeenCalled();
  });
});
