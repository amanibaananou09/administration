import { CSSObject } from "@chakra-ui/react";

interface BadgeSize {
  width: string;
  height: string;
}

interface BadgeSizes {
  [key: string]: BadgeSize;
}

interface BadgeStyles {
  components: {
    Badge: {
      sizes: BadgeSizes;
      baseStyle: CSSObject;
    };
  };
}

export const badgeStyles: BadgeStyles = {
  components: {
    Badge: {
      sizes: {
        md: {
          width: "65px",
          height: "25px",
        },
      },
      baseStyle: {
        textTransform: "capitalize",
      },
    },
  },
};
