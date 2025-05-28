import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  CustomerAccountSkeletonForm,
  SkeletonTable,
  UserSkeletonForm,
} from "../../components/Skeleton/Skeletons";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe("SkeletonTable", () => {
  it("renders five skeleton rows", () => {
    render(<SkeletonTable />);
    const skeletonElements = screen.getAllByTestId("skeleton-table");
    expect(skeletonElements[0].children.length).toBe(5);

    skeletonElements.forEach((skeleton) => {
      expect(skeleton).toBeVisible();
    });
  });
});

describe("CustomerAccountSkeletonForm", () => {
  it("renders all skeleton input labels with correct text", () => {
    render(<CustomerAccountSkeletonForm />);

    expect(screen.getByText("common.name")).toBeInTheDocument();
    expect(screen.getByText("common.compteParent")).toBeInTheDocument();
    expect(screen.getByText("common.creator")).toBeInTheDocument();
    expect(screen.getByText("common.droits")).toBeInTheDocument();
    expect(
      screen.getByText("userInformation.userNameLabel"),
    ).toBeInTheDocument();
    expect(screen.getByText("userInformation.emailLabel")).toBeInTheDocument();
    expect(
      screen.getByText("userInformation.firstNameLabel"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("userInformation.lastNameLabel"),
    ).toBeInTheDocument();
    expect(screen.getByText("userInformation.phoneLabel")).toBeInTheDocument();
    expect(
      screen.getByText("customerAccountModal.paymentMethods"),
    ).toBeInTheDocument();

    const skeletonElements = screen.getAllByTestId("skeleton-instance");
    expect(skeletonElements).toHaveLength(10);
  });

  it("renders two dividers", () => {
    render(<CustomerAccountSkeletonForm />);
    const dividers = screen.getAllByRole("separator");
    expect(dividers).toHaveLength(2);
  });
});

describe("UserSkeletonForm", () => {
  it("renders all skeleton inputs with correct labels", () => {
    render(<UserSkeletonForm />);

    expect(
      screen.getByText("userInformation.userNameLabel"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("userInformation.firstNameLabel"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("userInformation.lastNameLabel"),
    ).toBeInTheDocument();
    expect(screen.getByText("userInformation.emailLabel")).toBeInTheDocument();
    expect(screen.getByText("common.creatorAccount")).toBeInTheDocument();
    expect(screen.getByText("common.compteParent")).toBeInTheDocument();
    expect(screen.getByText("userInformation.mask")).toBeInTheDocument();
    expect(screen.getByText("userInformation.phoneLabel")).toBeInTheDocument();
    expect(screen.getByText("common.canChangePassword")).toBeInTheDocument();
    expect(screen.getByText("common.canSendSMS")).toBeInTheDocument();
    expect(screen.getByText("common.isActive")).toBeInTheDocument();

    const skeletonElements = screen.getAllByTestId("skeleton");
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("renders one divider", () => {
    render(<UserSkeletonForm />);
    const dividers = screen.getAllByRole("separator");
    expect(dividers).toHaveLength(1);
  });
});
