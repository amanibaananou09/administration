import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { useConfirm } from "../../components/Dialog/ConfirmationDialog";
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));
describe("useConfirm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useConfirm());

    expect(result.current).toHaveProperty("ConfirmationDialog");
    expect(result.current).toHaveProperty("confirm");
    expect(result.current).toHaveProperty("close");
  });

  it("should initialize with provided props", () => {
    const initialConfig = {
      title: "Test Title",
      message: "Test Message",
      onConfirm: jest.fn(),
      onDismiss: jest.fn(),
    };

    const { result } = renderHook(() => useConfirm(initialConfig));

    expect(result.current).toBeDefined();
  });

  it("should open and close the dialog", async () => {
    const { result } = renderHook(() => useConfirm());

    act(() => {
      result.current.confirm();
    });

    render(<result.current.ConfirmationDialog />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    act(() => {
      result.current.close();
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId("chakra-modal-overlay"),
      ).not.toBeInTheDocument();
    });
  });

  it("should update config when opening with new config", () => {
    const initialConfig = {
      title: "Initial Title",
      message: "Initial Message",
    };

    const newConfig = {
      title: "New Title",
      message: "New Message",
      onConfirm: jest.fn(),
    };

    const { result } = renderHook(() => useConfirm(initialConfig));

    act(() => {
      result.current.confirm(newConfig);
    });

    render(<result.current.ConfirmationDialog />);

    expect(screen.getByText("New Title")).toBeInTheDocument();
  });

  it("should call onConfirm when confirm button is clicked", () => {
    const mockOnConfirm = jest.fn();
    const { result } = renderHook(() =>
      useConfirm({
        onConfirm: mockOnConfirm,
      }),
    );

    act(() => {
      result.current.confirm();
    });

    render(<result.current.ConfirmationDialog />);

    const confirmButton = screen.getByText("common.confirmationDialog.confirm");
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("should call onDismiss when cancel button is clicked", () => {
    const mockOnDismiss = jest.fn();
    const { result } = renderHook(() =>
      useConfirm({
        onDismiss: mockOnDismiss,
      }),
    );

    act(() => {
      result.current.confirm();
    });

    render(<result.current.ConfirmationDialog />);

    const cancelButton = screen.getByText("common.confirmationDialog.cancel");
    fireEvent.click(cancelButton);

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it("should render custom children when provided", () => {
    const { result } = renderHook(() => useConfirm());

    act(() => {
      result.current.confirm();
    });

    render(
      <result.current.ConfirmationDialog>
        <div data-testid="custom-content">Custom Content</div>
      </result.current.ConfirmationDialog>,
    );

    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });

  it("should merge new config with existing config when opening dialog", () => {
    const initialConfig = {
      title: "Initial Title",
      onConfirm: jest.fn(),
    };

    const partialConfig = {
      message: "New Message",
    };

    const { result } = renderHook(() => useConfirm(initialConfig));

    act(() => {
      result.current.confirm(partialConfig);
    });

    render(<result.current.ConfirmationDialog />);
    expect(screen.getByText("Initial Title")).toBeInTheDocument();
    expect(screen.getByText("New Message")).toBeInTheDocument();
  });

  it("should not throw when callbacks are not provided", () => {
    const { result } = renderHook(() => useConfirm());

    act(() => {
      result.current.confirm();
    });

    render(<result.current.ConfirmationDialog />);

    const confirmButton = screen.getByText("common.confirmationDialog.confirm");
    const cancelButton = screen.getByText("common.confirmationDialog.cancel");

    expect(() => fireEvent.click(confirmButton)).not.toThrow();
    expect(() => fireEvent.click(cancelButton)).not.toThrow();
  });
});
