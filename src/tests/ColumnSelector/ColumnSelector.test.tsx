import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ColumnSelector from "../../components/ColumnSelector/ColumnSelector";

const allColumns = [
  { key: "#", header: "ID" },
  { key: "name", header: "Nom" },
  { key: "age", header: "Âge" },
];

describe("ColumnSelector", () => {
  let visibleColumnsRef: { current: string[] };

  const setVisibleColumns = jest.fn(
    (updater: React.SetStateAction<string[]>) => {
      if (typeof updater === "function") {
        const newState = (updater as (prev: string[]) => string[])(
          visibleColumnsRef.current,
        );
        visibleColumnsRef.current = newState;
      } else {
        visibleColumnsRef.current = updater;
      }
    },
  );

  beforeEach(() => {
    visibleColumnsRef = { current: ["#"] };
    jest.clearAllMocks();
  });

  it("renders all column options", () => {
    render(
      <ColumnSelector
        allColumns={allColumns}
        visibleColumns={visibleColumnsRef.current}
        setVisibleColumns={setVisibleColumns}
      />,
    );

    allColumns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });
  });

  it("toggles column visibility", () => {
    render(
      <ColumnSelector
        allColumns={allColumns}
        visibleColumns={visibleColumnsRef.current}
        setVisibleColumns={setVisibleColumns}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    fireEvent.click(screen.getByText("Nom"));

    expect(setVisibleColumns).toHaveBeenCalledTimes(1);

    const firstArg = setVisibleColumns.mock.calls[0][0];

    if (typeof firstArg === "function") {
      const newState = firstArg(visibleColumnsRef.current);
      expect(newState).toEqual(["#", "name"]);
    } else {
      expect(firstArg).toEqual(["#", "name"]);
    }
  });

  it("ensures column '#' is always visible when toggling another column", () => {
    visibleColumnsRef.current = ["name"];

    render(
      <ColumnSelector
        allColumns={allColumns}
        visibleColumns={visibleColumnsRef.current}
        setVisibleColumns={setVisibleColumns}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    fireEvent.click(screen.getByText("Âge"));

    expect(setVisibleColumns).toHaveBeenCalledTimes(1);

    const updater = setVisibleColumns.mock.calls[0][0];

    const newState =
      typeof updater === "function"
        ? updater(visibleColumnsRef.current)
        : updater;

    expect(newState).toEqual(["#", "name", "age"]);
  });

  it("does not allow toggling '#' column off", () => {
    render(
      <ColumnSelector
        allColumns={allColumns}
        visibleColumns={visibleColumnsRef.current}
        setVisibleColumns={setVisibleColumns}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    fireEvent.click(screen.getByText("ID"));

    expect(setVisibleColumns).not.toHaveBeenCalled();
    expect(visibleColumnsRef.current).toEqual(["#"]);
  });

  it("toggles column off if it's visible", () => {
    visibleColumnsRef.current = ["#", "name", "age"];

    render(
      <ColumnSelector
        allColumns={allColumns}
        visibleColumns={visibleColumnsRef.current}
        setVisibleColumns={setVisibleColumns}
      />,
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Nom"));

    expect(setVisibleColumns).toHaveBeenCalledTimes(1);

    const updater = setVisibleColumns.mock.calls[0][0];
    const newState =
      typeof updater === "function" ? updater(["#", "name", "age"]) : updater;

    expect(newState).toEqual(["#", "age"]);
  });
});
