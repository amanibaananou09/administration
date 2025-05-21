import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as XLSX from "xlsx";
import StationExporter from "../../components/Exporter/StationExporter";
import { GeneralStations } from "common/AdminModel";

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

describe("StationExporter", () => {
  const mockStations: GeneralStations[] = [
    {
      id: "1",
      identifier: "ST001",
      name: "Station 1",
      city: "Ville 1",
      customerAccountName: "Compte 1",
      creatorCustomerAccountName: "Créateur 1",
      creatorAccountId: "creator1",
      account: "Account 1",
      controllerPts: {
        ptsId: "ID1",
        phone: "1234567890",
        userController: { username: "user", password: "pass" },
      },
      createdDate: "2023-01-01T00:00:00Z",
      cordonneesGps: "0,0",
      address: "Adresse 1",
      actif: true,
      modeAffectation: "Mode 1",
      controllerType: "type",
      phone: "55663322",
      connection: "connect",
      password: "passssss",
      countryId: 2,
      customerAccountId: "5",
      journal: "",
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
    render(<StationExporter stations={mockStations} />);
    expect(screen.getByText("common.exportExcel")).toBeInTheDocument();
    expect(screen.getByText("common.exportPDF")).toBeInTheDocument();
  });

  it("calls Excel export functions correctly", () => {
    render(<StationExporter stations={mockStations} />);
    fireEvent.click(screen.getByText("common.exportExcel"));

    expect(XLSX.utils.json_to_sheet).toHaveBeenCalled();
    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalled();
    expect(XLSX.writeFile).toHaveBeenCalled();
  });

  it("calls PDF export functions when PDF button is clicked", () => {
    render(<StationExporter stations={mockStations} />);
    fireEvent.click(screen.getByText("common.exportPDF"));

    expect(mockJsPDF).toHaveBeenCalled();
    expect(pdfInstance.autoTable).toHaveBeenCalledWith({
      head: expect.any(Array),
      body: expect.any(Array),
      startY: 20,
      styles: { fontSize: 5 },
    });
    expect(pdfInstance.save).toHaveBeenCalledWith("routes.manageStations.pdf");
  });

  it("handles empty stations array gracefully", () => {
    render(<StationExporter stations={[]} />);

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
