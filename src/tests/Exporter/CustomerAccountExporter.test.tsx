import { fireEvent, render, screen } from "@testing-library/react";
import { CustomerAccount } from "common/AdminModel";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import CustomerAccountExporter from "../../components/Exporter/CustomerAccountExporter";

jest.mock("react-i18next");
jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    autoTable: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnThis(),
    save: jest.fn(),
    internal: {
      pageSize: { getWidth: jest.fn().mockReturnValue(210) },
      getFontSize: jest.fn().mockReturnValue(12),
      scaleFactor: 1,
    },
    getStringUnitWidth: jest.fn().mockReturnValue(0.5),
    getFontSize: jest.fn().mockReturnValue(12),
    setFontSize: jest.fn().mockReturnThis(),
    setFont: jest.fn().mockReturnThis(),
  }));
});
jest.mock("xlsx");
jest.mock("jspdf-autotable");

const mockCustomerAccounts: CustomerAccount[] = [
  {
    id: "1",
    name: "Account 1",
    city: "Paris",
    creatorAccountId: "2",
    creatorCustomerAccountName: "Creator 1",
    parentName: "Parent 1",
    parentId: "1",
    resaleRight: true,
    cardManager: false,
    exported: true,
    stationsCount: 5,
    actif: true,
    status: "active",
    masterUser: {
      username: "user1",
      email: "user1@example.com",
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
    },
    creatorUser: {
      username: "creator1",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      phone: "0987654321",
      customerAccountId: "1",
      creatorAccountId: "0",
      lastConnectionDate: "2023-01-01",
    },
    paymentMethods: [{ code: "CARD" }],
  },
  {
    id: "2",
    parentId: "1",
    creatorAccountId: "2",
    name: "Account 2",
    city: "Lyon",
    creatorCustomerAccountName: "Creator 2",
    parentName: "Parent 2",
    resaleRight: false,
    cardManager: true,
    exported: false,
    stationsCount: 3,
    actif: false,
    status: "inactive",
    masterUser: {
      username: "user2",
      email: "user2@example.com",
      firstName: "Jane",
      lastName: "Doe",
      phone: "2345678901",
    },
  },
];

describe("CustomerAccountExporter", () => {
  let mockPdfInstance: any;

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });

    (XLSX.utils.json_to_sheet as jest.Mock).mockReturnValue({});
    (XLSX.utils.book_new as jest.Mock).mockReturnValue({});
    (XLSX.writeFile as jest.Mock).mockImplementation(() => {});

    mockPdfInstance = {
      autoTable: jest.fn(),
      text: jest.fn(),
      save: jest.fn(),
      internal: {
        pageSize: { getWidth: jest.fn().mockReturnValue(210) },
        getFontSize: jest.fn().mockReturnValue(12),
        scaleFactor: 1,
      },
      getStringUnitWidth: jest.fn().mockReturnValue(50),
    };

    ((jsPDF as unknown) as jest.Mock).mockImplementation(() => mockPdfInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("render the export buttons", () => {
    render(<CustomerAccountExporter customerAccounts={mockCustomerAccounts} />);

    expect(screen.getByText("common.exportExcel")).toBeInTheDocument();
    expect(screen.getByText("common.exportPDF")).toBeInTheDocument();
  });

  describe("Export Excel", () => {
    it("call exportToExcelHandler with the right data", () => {
      render(
        <CustomerAccountExporter customerAccounts={mockCustomerAccounts} />,
      );

      fireEvent.click(screen.getByText("common.exportExcel"));

      expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([
        {
          "common.name": "Account 1",
          "common.creatorAccount": "Creator 1",
          "common.compteParent": "Parent 1",
          "common.droits": "common.reseller",
          "common.status": "accountDetailsModel.active",
          "common.stationsCount": 5,
        },
        {
          "common.name": "Account 2",
          "common.creatorAccount": "Creator 2",
          "common.compteParent": "Parent 2",
          "common.droits": "-",
          "common.status": "accountDetailsModel.inActive",
          "common.stationsCount": 3,
        },
      ]);

      expect(XLSX.writeFile).toHaveBeenCalledWith(
        expect.any(Object),
        "customer_accounts.xlsx",
      );
    });

    it("does not generate a PDF if customerAccounts is empty", () => {
      render(<CustomerAccountExporter customerAccounts={[]} />);

      fireEvent.click(screen.getByText("common.exportPDF"));

      expect(mockPdfInstance.autoTable).toHaveBeenCalledWith({
        head: [
          [
            "#",
            "common.name",
            "common.creatorAccount",
            "common.compteParent",
            "common.droits",
            "common.status",
            "common.stations",
          ],
        ],
        body: [],
        startY: 20,
        styles: { fontSize: 5 },
      });
    });
  });

  describe("Export PDF", () => {
    it("call exportToPDFHandler with the right data", () => {
      render(
        <CustomerAccountExporter customerAccounts={mockCustomerAccounts} />,
      );

      fireEvent.click(screen.getByText("common.exportPDF"));

      expect(mockPdfInstance.autoTable).toHaveBeenCalledWith({
        head: [
          [
            "#",
            "common.name",
            "common.creatorAccount",
            "common.compteParent",
            "common.droits",
            "common.status",
            "common.stations",
          ],
        ],
        body: [
          [
            1,
            "Account 1",
            "Creator 1",
            "Parent 1",
            "common.reseller",
            "accountDetailsModel.active",
            5,
          ],
          [
            2,
            "Account 2",
            "Creator 2",
            "Parent 2",
            "-",
            "accountDetailsModel.inActive",
            3,
          ],
        ],
        startY: 20,
        styles: { fontSize: 5 },
      });

      expect(mockPdfInstance.text).toHaveBeenCalledWith(
        "routes.manageAccounts",
        expect.any(Number),
        10,
      );

      expect(mockPdfInstance.save).toHaveBeenCalledWith(
        "routes.manageAccounts.pdf",
      );
    });

    it("graciously handles missing optional fields", () => {
      const accountsWithMissingFields: CustomerAccount[] = [
        {
          id: "3",
          name: "Account 3",
          city: "Marseille",
          creatorAccountId: "1",
          parentId: "0",
          resaleRight: true,
          cardManager: false,
          exported: false,
          status: "active",
          masterUser: {
            username: "user3",
            email: "user3@example.com",
            firstName: "Bob",
            lastName: "Martin",
            phone: "3456789012",
          },
        } as CustomerAccount,
      ];

      render(
        <CustomerAccountExporter
          customerAccounts={accountsWithMissingFields}
        />,
      );

      fireEvent.click(screen.getByText("common.exportPDF"));

      expect(mockPdfInstance.autoTable).toHaveBeenCalledWith({
        head: expect.any(Array),
        body: [
          [
            1,
            "Account 3",
            undefined,
            undefined,
            "common.reseller",
            "accountDetailsModel.inActive",
            undefined,
          ],
        ],
        startY: 20,
        styles: { fontSize: 5 },
      });
    });

    it("generates an empty PDF if customerAccounts is empty", () => {
      render(<CustomerAccountExporter customerAccounts={[]} />);

      fireEvent.click(screen.getByText("common.exportPDF"));

      expect(mockPdfInstance.autoTable).toHaveBeenCalledWith({
        head: [
          [
            "#",
            "common.name",
            "common.creatorAccount",
            "common.compteParent",
            "common.droits",
            "common.status",
            "common.stations",
          ],
        ],
        body: [],
        startY: 20,
        styles: { fontSize: 5 },
      });
      expect(mockPdfInstance.save).toHaveBeenCalledWith(
        "routes.manageAccounts.pdf",
      );
    });
  });
});
