import { CSSObject } from "@chakra-ui/react";

interface MainPanelBaseStyle {
  float: string;
  maxWidth: string;
  overflow: string;
  position: string;
  maxHeight: string;
  transition: string;
  transitionDuration: string;
  transitionProperty: string;
  transitionTimingFunction: string;
}

interface MainPanelVariants {
  main: (props: Record<string, any>) => CSSObject;
}

interface MainPanelProps {
  variant: string;
}

interface MainPanelComponentProps {
  MainPanel: {
    baseStyle: MainPanelBaseStyle;
    variants: MainPanelVariants;
    defaultProps: MainPanelProps;
  };
}

const MainPanel: MainPanelBaseStyle = {
  float: "right",
  maxWidth: "100%",
  overflow: "auto",
  position: "relative",
  maxHeight: "100%",
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
  transitionDuration: ".2s, .2s, .35s",
  transitionProperty: "top, bottom, width",
  transitionTimingFunction: "linear, linear, ease",
};

export const MainPanelComponent: MainPanelComponentProps = {
  MainPanel: {
    baseStyle: MainPanel,
    variants: {
      main: (props) => ({
        float: "right",
      }),
    },
    defaultProps: {
      variant: "main",
    },
  },
};
