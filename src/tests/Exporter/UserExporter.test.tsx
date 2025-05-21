import React from "react";
import { render, screen } from "@testing-library/react";
import { GeneralUser } from "common/AdminModel";
import UserExporter from "../../components/Exporter/UserExporter";

jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    autoTable: jest.fn(),
    save: jest.fn(),
    text: jest.fn(),
    internal: {
      pageSize: { getWidth: () => 100 },
      getFontSize: () => 12,
      scaleFactor: 1,
    },
  }));
});

const mockSheet = {};
const mockWorkbook = {
  SheetNames: [] as string[],
  Sheets: {} as Record<string, any>,
};

jest.mock("xlsx", () => {
  const mockXLSX = {
    utils: {
      json_to_sheet: jest.fn(() => mockSheet),
      book_new: jest.fn(() => mockWorkbook),
      book_append_sheet: jest.fn((workbook, sheet, name) => {
        workbook.SheetNames.push(name);
        workbook.Sheets[name] = sheet;
      }),
    },
    writeFile: jest.fn(),
  };
  return mockXLSX;
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
    lastConnectionDate: new Date().toISOString(),
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
    lastConnectionDate: new Date().toISOString(),
    creatorCustomerAccountName: "Creator Account 2",
    customerAccountName: "Customer Account 2",
  },
];

describe("UserExporter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockWorkbook.SheetNames = [];
    mockWorkbook.Sheets = {};
  });

  it("renders buttons correctly", () => {
    render(<UserExporter users={mockUsers} />);
    expect(screen.getByText("common.exportExcel")).toBeInTheDocument();
    expect(screen.getByText("common.exportPDF")).toBeInTheDocument();
  });
});
