import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Mode } from "../../common/enums";
import StationModal from "../../components/Modal/StationModal";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockOnSubmit = jest.fn();

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("store/AuthContext", () => ({
  useAuth: () => ({
    user: { customerAccountId: "12345" },
  }),
}));

const renderComponent = (mode: Mode) => {
  const queryClient = new QueryClient();

  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <StationModal onSubmit={mockOnSubmit} mode={mode} />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe("StationModal", () => {
  it("renders in create mode", () => {
    renderComponent(Mode.CREATE);
    expect(screen.getByText("addStationModal.header")).toBeInTheDocument();
  });

  it("renders in edit mode", () => {
    renderComponent(Mode.EDIT);
    expect(screen.getByText("addStationModal.update")).toBeInTheDocument();
  });

  it("renders in view mode", () => {
    renderComponent(Mode.VIEW);
    expect(screen.getByText("addStationModal.view")).toBeInTheDocument();
  });
});
