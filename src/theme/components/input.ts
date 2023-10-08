import { mode } from "@chakra-ui/theme-tools";

interface InputStyles {
  components: {
    Input: {
      baseStyle: {
        field: {
          fontWeight: number;
        };
      };
      variants: {
        auth: (props: any) => {
          field: {
            bg: string;
            border: string;
            borderColor: string;
            _placeholder: { color: string };
          };
        };
        search: (props: any) => {
          field: {
            border: string;
            py: string;
            borderRadius: string;
            _placeholder: { color: string };
          };
        };
      };
    };
  };
}

export const inputStyles: InputStyles = {
  components: {
    Input: {
      baseStyle: {
        field: {
          fontWeight: 400,
        },
      },
      variants: {
        auth: (props: any) => ({
          field: {
            bg: mode("white", "navy.700")(props),
            border: "1px solid",
            borderColor: mode("gray.200", "transparent")(props),
            _placeholder: { color: mode("gray.300", "gray.400")(props) },
          },
        }),
        search: (props: any) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: mode("gray.300", "gray.400")(props) },
          },
        }),
      },
    },
  },
};