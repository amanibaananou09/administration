import { CSSObject, useColorMode } from "@chakra-ui/react";

interface CardBaseStyle {
  p: string;
  display: string;
  flexDirection: string;
  width: string;
  boxShadow: string;
  borderRadius: string;
  position: string;
  wordWrap: string;
  backgroundClip: string;
}

interface CardVariants {
  panel: (props: { colorMode: string }) => CSSObject;
}

interface CardProps {
  variant: string;
}

interface CardComponentProps {
  Card: {
    baseStyle: CardBaseStyle;
    variants: CardVariants;
    defaultProps: CardProps;
  };
}

const Card: CardBaseStyle = {
  p: "22px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  boxShadow: "0px 5px 14px rgba(0, 0, 0, 0.05)",
  borderRadius: "20px",
  position: "relative",
  wordWrap: "break-word",
  backgroundClip: "border-box",
};

export const CardComponent: CardComponentProps = {
  Card: {
    baseStyle: Card,
    variants: {
      panel: (props) => ({
        bg: props.colorMode === "dark" ? "#111C44" : "white",
      }),
    },
    defaultProps: {
      variant: "panel",
    },
  },
};
