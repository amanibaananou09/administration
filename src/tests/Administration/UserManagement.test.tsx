import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserManagement from "../../views/Administration/UserManagement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: any) => key,
  }),
}));
describe("UserManagement ", () => {
  const queryClient = new QueryClient();

  const renderComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        {" "}
        <MemoryRouter>
          <UserManagement />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  it("renders header correctly", () => {
    renderComponent();
    const headerElement = screen.getByText(
      /userManagement.globalUsers.header/i,
    );
    expect(headerElement).toBeInTheDocument();
  });

  it("displays loading skeleton when loading", () => {
    renderComponent();
    const skeletonElement = screen.getByTestId("skeleton-table");
    expect(skeletonElement).toBeInTheDocument();
  });

  it("activates/deactivates user status", async () => {
    renderComponent();

    const mockStatusElement = screen.getByText(/statusColumn/i);
    fireEvent.click(mockStatusElement);
  });
});
