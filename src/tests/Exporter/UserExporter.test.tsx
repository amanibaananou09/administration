import React from "react";
import { render, screen } from "@testing-library/react";
import { GeneralUser } from "common/AdminModel";
import UserExporter from "../../components/Exporter/UserExporter";

jest.mock("jspdf", () => {
  class MockPDF {
    autoTable = jest.fn();
    save = jest.fn();
    internal = {
      pageSize: { getWidth: () => 210 },
      getFontSize: () => 16,
      scaleFactor: 1,
    };
    getStringUnitWidth = jest.fn(() => 50);
    text = jest.fn();
  }
  return jest.fn(() => new MockPDF());
});
jest.mock("xlsx", () => ({
  utils: {
    json_to_sheet: jest.fn(() => ({ A1: { v: "Test" } })),
    book_new: jest.fn(() => ({
      SheetNames: [],
      Sheets: {},
      Props: {},
    })),
    book_append_sheet: jest.fn((wb, ws, name) => {
      wb.SheetNames.push(name);
      wb.Sheets[name] = ws;
      return wb;
    }),
  },
  writeFile: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("utils/utils", () => ({
  formatDate: jest.fn((date) => `formatted-${date}`),
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
  });

  it("renders buttons correctly", () => {
    render(<UserExporter users={mockUsers} />);
    expect(screen.getByText("common.exportExcel")).toBeInTheDocument();
    expect(screen.getByText("common.exportPDF")).toBeInTheDocument();
  });
});
