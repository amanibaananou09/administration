import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as XLSX from "xlsx";
import { GeneralUser } from "common/AdminModel";
import UserExporter from "../../components/Exporter/UserExporter";

class MockPDF {
  autoTable = jest.fn();
  text = jest.fn();
  save = jest.fn();
  getStringUnitWidth = jest.fn(() => 10);
  internal = {
    pageSize: { getWidth: jest.fn(() => 210) },
    getFontSize: jest.fn(() => 12),
    scaleFactor: 1,
  };
}

const createMockJsPDF = () => {
  return jest.fn(() => new MockPDF());
};

jest.mock("jspdf", () => {
  const mock = createMockJsPDF();
  return {
    __esModule: true,
    default: mock,
  };
});

const mockJsPDF = (jest.requireMock("jspdf") as { default: jest.Mock }).default;

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockWorksheet = {};
const mockWorkbook = {
  SheetNames: [],
  Sheets: {},
};

jest.mock("xlsx", () => ({
  utils: {
    json_to_sheet: jest.fn(() => mockWorksheet),
    book_new: jest.fn(() => mockWorkbook),
    book_append_sheet: jest.fn((wb, ws, name) => {
      wb.SheetNames.push(name);
      wb.Sheets[name] = ws;
      return wb;
    }),
  },
  writeFile: jest.fn(),
}));

describe("UserExporter", () => {
  const mockUsers: GeneralUser[] = [
    {
      index: 1,
      id: 1,
      userIdentifier: "ST001",
      actif: true,
      dateStatusChange: "2023-01-01T00:00:00Z",
      username: "User 1",
      firstName: "User",
      lastName: "One",
      email: "User1@example.com",
      password: "pass",
      role: "user",
      phone: "55663322",
      changePassword: false,
      sendSms: false,
      subnetMask: "255.255.255.0",
      customerAccountId: "5",
      creatorAccountId: "creator1",
      lastConnectionDate: "2023-01-01T00:00:00Z",
      creatorCustomerAccountName: "Créateur 1",
      customerAccountName: "Compte 1",
    },
  ];

  let pdfInstance: MockPDF;

  beforeEach(() => {
    jest.clearAllMocks();
    mockWorkbook.SheetNames = [];
    mockWorkbook.Sheets = {};

    pdfInstance = new MockPDF();
    mockJsPDF.mockImplementation(() => pdfInstance);
  });

  it("renders both export buttons", () => {
    render(<UserExporter users={mockUsers} />);
    expect(screen.getByText("common.exportExcel")).toBeInTheDocument();
    expect(screen.getByText("common.exportPDF")).toBeInTheDocument();
  });

  it("calls Excel export functions correctly", () => {
    render(<UserExporter users={mockUsers} />);
    fireEvent.click(screen.getByText("common.exportExcel"));

    expect(XLSX.utils.json_to_sheet).toHaveBeenCalled();
    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalled();
    expect(XLSX.writeFile).toHaveBeenCalled();
  });

  it("calls PDF export functions when PDF button is clicked", () => {
    render(<UserExporter users={mockUsers} />);
    fireEvent.click(screen.getByText("common.exportPDF"));

    expect(mockJsPDF).toHaveBeenCalled();
    expect(pdfInstance.autoTable).toHaveBeenCalledWith({
      head: expect.any(Array),
      body: expect.any(Array),
      startY: 20,
      styles: { fontSize: 5 },
    });
    expect(pdfInstance.save).toHaveBeenCalledWith("routes.manageUsers.pdf");
  });

  it("handles empty users array gracefully", () => {
    render(<UserExporter users={[]} />);

    fireEvent.click(screen.getByText("common.exportExcel"));
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([]);

    fireEvent.click(screen.getByText("common.exportPDF"));
    expect(pdfInstance.autoTable).toHaveBeenCalledWith({
      head: expect.any(Array),
      body: [],
      startY: 20,
      styles: { fontSize: 5 },
    });
  });
});
