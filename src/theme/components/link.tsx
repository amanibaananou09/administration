import { CSSObject } from "@chakra-ui/react";

export interface LinkStyles {
  components: {
    Link: {
      decoration: string;
      baseStyle: CSSObject;
    };
  };
}

export const linkStyles: LinkStyles = {
  components: {
    Link: {
      decoration: "none",
      baseStyle: {
        _hover: {
          textDecoration: "none",
        },
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
};
