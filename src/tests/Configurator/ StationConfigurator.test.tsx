import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { getStations } from "common/api/station-api";
import { useAuth } from "store/AuthContext";
import StationConfigurator from "../../components/Configurator/StationConfigurator";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

jest.mock("common/api/station-api");
jest.mock("store/AuthContext");

const mockUseAuth = useAuth as jest.Mock;
const mockGetStations = getStations as jest.Mock;

beforeAll(() => {
  i18n.init({
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          "stationConfigurator.text": "Station Configurator",
        },
      },
    },
  });
});

describe("StationConfigurator", () => {
  const mockStations = [
    { id: "1", name: "Station 1" },
    { id: "2", name: "Station 2" },
  ];

  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: { id: "user1", token: "token123" } });
    mockGetStations.mockResolvedValue(mockStations);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays the spinner when loading and the configuration text after", async () => {
    const onCloseMock = jest.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <StationConfigurator isOpen={true} onClose={onCloseMock} />
      </I18nextProvider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Station Configurator")).toBeInTheDocument();
    });
  });

  it("uses getStations with the right user", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <StationConfigurator isOpen={true} onClose={() => {}} />
      </I18nextProvider>,
    );

    await waitFor(() => {
      expect(getStations).toHaveBeenCalledWith({
        id: "user1",
        token: "token123",
      });
    });
  });
});
