import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Pagination from "../../components/Pagination/Pagination";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      common: {
        page: "Page",
        of: "of",
        report: "reports",
      },
    },
  },
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

const mockOnChange = jest.fn();

const renderComponent = (props?: any) => {
  return render(
    <ChakraProvider>
      <Pagination
        onChange={mockOnChange}
        totalPages={10}
        totalElements={250}
        defaultPage={0}
        defaultsize={25}
        {...props}
      />
    </ChakraProvider>,
  );
};

describe("Pagination", () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  const findPageDisplayButton = (
    page: number,
    total: number,
    isDisabled: boolean = false,
  ) => {
    return screen.getByText((content, element) => {
      if (!element || element.tagName.toLowerCase() !== "button") {
        return false;
      }

      const normalizedContent = element.textContent
        ?.replace(/\s+/g, " ")
        .trim();

      const expectedText = `${i18n.t("common.page")} ${page} ${i18n.t(
        "common.of",
      )} ${total}`;

      const matchesContent = normalizedContent === expectedText;
      const matchesDisabledState = isDisabled
        ? element.hasAttribute("disabled")
        : !element.hasAttribute("disabled");

      return matchesContent && matchesDisabledState;
    });
  };

  it("handles page change when next button is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText(">"));

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith(1, 25);

    expect(findPageDisplayButton(2, 10)).toBeInTheDocument();
  });

  it("handles page change when last page button is clicked", () => {
    renderComponent({ defaultPage: 0 });

    fireEvent.click(screen.getByText(">>"));

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith(9, 25);

    expect(findPageDisplayButton(10, 10)).toBeInTheDocument();
  });

  it("handles page size change", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("25"), {
      target: { value: "50" },
    });

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith(0, 50);

    expect(screen.getByDisplayValue("50")).toBeInTheDocument();
  });

  it("buttons are disabled when on the last page", () => {
    renderComponent({ defaultPage: 9 });

    expect(screen.getByText("<<")).not.toBeDisabled();
    expect(screen.getByText("<")).not.toBeDisabled();
    expect(findPageDisplayButton(10, 10, false)).not.toBeDisabled();
    expect(screen.getByText(">")).toBeDisabled();
    expect(screen.getByText(">>")).toBeDisabled();
  });

  it("buttons are disabled when totalPages is 0", () => {
    renderComponent({ totalPages: 0, totalElements: 0 });

    expect(screen.getByText("<<")).toBeDisabled();
    expect(screen.getByText("<")).toBeDisabled();
    expect(findPageDisplayButton(1, 0, true)).toBeDisabled();
    expect(screen.getByText(">")).toBeDisabled();
    expect(screen.getByText(">>")).toBeDisabled();

    expect(
      screen.getByText((content, element) => {
        return (
          element?.textContent?.replace(/\s+/g, " ").trim() ===
            `0 ${i18n.t("common.report")}` && element.hasAttribute("disabled")
        );
      }),
    ).toBeInTheDocument();
  });

  it("ensures onChange is not called on initial render if totalPages is 0", () => {
    renderComponent({ totalPages: 0, totalElements: 0 });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(0, 25);
  });
});
