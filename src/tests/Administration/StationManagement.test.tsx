import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useStationQueries, useStations } from "hooks/use-station";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import StationManagement from "../../views/Administration/StationManagement";
import { useConfirm } from "../../components/Dialog/ConfirmationDialog";

jest.mock(
  "components/Card/Card",
  () => ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
);
jest.mock(
  "components/Card/CardBody",
  () => ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-body">{children}</div>
  ),
);
jest.mock("jspdf", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    text: jest.fn(),
    addImage: jest.fn(),
    output: jest.fn(),
    save: jest.fn(),
    autoTable: jest.fn(),
  })),
}));

jest.mock("jspdf-autotable", () => jest.fn());
jest.mock(
  "components/Card/CardHeader",
  () => ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
);
jest.mock("components/Exporter/StationExporter", () => () => (
  <div data-testid="station-exporter">StationExporter</div>
));
jest.mock(
  "components/Modal/StationModal",
  () => ({ mode }: { mode: string }) => (
    <div data-testid={`station-modal-${mode}`}>Station Modal {mode}</div>
  ),
);
jest.mock("components/Modal/UploadInformationModal", () => () => (
  <div data-testid="upload-info-modal">Upload Information Modal</div>
));
jest.mock("components/UI/Table/UITable", () => ({ data, columns }: any) => (
  <table data-testid="ui-table">
    <tbody>
      {data?.map((item: any) => (
        <tr key={item.id}>
          {columns.map((col: any) => (
            <td key={col.key}>
              {col.render ? col.render(item) : item[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
));
jest.mock("components/Skeleton/Skeletons", () => ({
  SkeletonTable: () => <div data-testid="skeleton-table">Loading...</div>,
}));
jest.mock(
  "components/Sidebar/Status",
  () => ({ value }: { value: boolean }) => (
    <div data-testid="status">{value ? "✓" : "✗"}</div>
  ),
);
jest.mock("components/ColumnSelector/ColumnSelector", () => () => (
  <div data-testid="column-selector">ColumnSelector</div>
));
jest.mock("components/Pagination/Pagination", () => ({ onChange }: any) => (
  <div data-testid="pagination">
    <button onClick={() => onChange(1, 25)}>Next Page</button>
  </div>
));
jest.mock(
  "react-custom-scrollbars",
  () => ({ children }: { children: React.ReactNode }) => (
    <div data-testid="scrollbars">{children}</div>
  ),
);

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "fr" },
  }),
}));

jest.mock("hooks/use-station", () => ({
  useStations: jest.fn(),
  useStationQueries: jest.fn(),
}));

jest.mock("components/Dialog/ConfirmationDialog", () => {
  const actualModule = jest.requireActual(
    "components/Dialog/ConfirmationDialog",
  );
  return {
    ...actualModule,
    useConfirm: jest.fn(),
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useRouteMatch: () => ({
    path: "/stations",
  }),
}));

jest.mock("react-icons/fa", () => ({
  FaPencilAlt: ({ onClick }: { onClick?: () => void }) => (
    <button data-testid="edit-button" onClick={onClick}>
      Edit
    </button>
  ),
}));

describe("StationManagement", () => {
  const mockStations = [
    {
      id: "1",
      index: 1,
      identifier: "ST001",
      name: "Station 1",
      creatorCustomerAccountName: "Admin",
      customerAccountName: "Client A",
      controllerPts: {
        controllerType: "Type A",
        ptsId: "PTS001",
        phone: "123456789",
      },
      createdDate: "2023-01-01T00:00:00Z",
      cordonneesGps: "0,0",
      country: { name: "Country A" },
      city: "City A",
      address: "Address A",
      phone: "987654321",
      actif: true,
      modeAffectation: "Mode A",
    },
  ];

  let mockConfirm: jest.Mock;

  beforeEach(() => {
    (useStations as jest.Mock).mockReturnValue({
      stations: mockStations,
      totalPages: 1,
      totalElements: 1,
      isLoading: false,
    });

    (useStationQueries as jest.Mock).mockReturnValue({
      activate: jest.fn().mockResolvedValue({}),
      desactivate: jest.fn().mockResolvedValue({}),
    });
    mockConfirm = jest.fn();
    (useConfirm as jest.Mock).mockReturnValue({
      ConfirmationDialog: () => (
        <div data-testid="confirmation-dialog">ConfirmationDialog</div>
      ),
      confirm: mockConfirm,
    });
  });

  it("should render the component with station data", async () => {
    render(
      <MemoryRouter initialEntries={["/stations"]}>
        <Switch>
          <Route path="/stations" component={StationManagement} />
        </Switch>
      </MemoryRouter>,
    );

    expect(screen.getByText("stationManagement.header")).toBeInTheDocument();
    expect(screen.getByText("ST001")).toBeInTheDocument();
    expect(screen.getByText("Station 1")).toBeInTheDocument();
    expect(screen.getByTestId("ui-table")).toBeInTheDocument();
  });

  it("should show loading skeleton when data is loading", async () => {
    (useStations as jest.Mock).mockReturnValueOnce({
      stations: [],
      totalPages: 0,
      totalElements: 0,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={["/stations"]}>
        <Switch>
          <Route path="/stations" component={StationManagement} />
        </Switch>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("skeleton-table")).toBeInTheDocument();
    expect(screen.queryByText("ST001")).not.toBeInTheDocument();
  });

  it("should navigate to edit when edit button is clicked", async () => {
    const mockPush = jest.fn();
    jest.spyOn(require("react-router-dom"), "useHistory").mockReturnValue({
      push: mockPush,
    });

    render(
      <MemoryRouter initialEntries={["/stations"]}>
        <Switch>
          <Route path="/stations" component={StationManagement} />
        </Switch>
      </MemoryRouter>,
    );
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/stations/edit/1");
    });
  });

  it("should show confirmation dialog when changing station status", async () => {
    render(
      <MemoryRouter initialEntries={["/stations"]}>
        <Switch>
          <Route path="/stations" component={StationManagement} />
        </Switch>
      </MemoryRouter>,
    );

    const statusElements = screen.getAllByTestId("status");
    const statusToggle = statusElements[0];

    fireEvent.click(statusToggle);

    await waitFor(() => {
      expect(mockConfirm).toHaveBeenCalled();
    });
  });

  it("should navigate to details when station identifier is clicked", async () => {
    const mockPush = jest.fn();
    jest.spyOn(require("react-router-dom"), "useHistory").mockReturnValue({
      push: mockPush,
    });

    render(
      <MemoryRouter initialEntries={["/stations"]}>
        <Switch>
          <Route path="/stations" component={StationManagement} />
        </Switch>
      </MemoryRouter>,
    );

    const identifierLink = screen.getByText("ST001");
    fireEvent.click(identifierLink);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/stations/details/1");
    });
  });

  it("should navigate to information when controller ID is clicked", async () => {
    const mockPush = jest.fn();
    jest.spyOn(require("react-router-dom"), "useHistory").mockReturnValue({
      push: mockPush,
    });

    render(
      <MemoryRouter initialEntries={["/stations"]}>
        <Switch>
          <Route path="/stations" component={StationManagement} />
        </Switch>
      </MemoryRouter>,
    );

    const controllerIdLink = screen.getByText("PTS001");
    fireEvent.click(controllerIdLink);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/stations/information/PTS001/1");
    });
  });
});
