// theme.js
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    primary: "#222629",
    secondary: "#61892F",
    text: "#86C232",
    accent: "#474B4F",
    neutral: "#6B6E70",
  },
  styles: {
    global: {
      body: {
        bg: "primary",
        color: "text",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
        },
      },
      variants: {
        solid: {
          bg: "secondary",
          color: "text",
          _hover: {
            bg: "accent",
          },
        },
        outline: {
          borderColor: "secondary",
          color: "text",
          _hover: {
            bg: "accent",
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          bg: "accent",
          color: "text",
          _placeholder: {
            color: "text",
          },
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: "secondary",
            _hover: {
              borderColor: "accent",
            },
          },
        },
      },
    },
    Tabs: {
      variants: {
        'soft-rounded': {
          tab: {
            _selected: {
              bg: 'secondary',
              color: 'text',
            },
            _hover: {
              bg: 'accent',
              color: 'primary',
            },
          },
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: "primary",
          color: "text",
        },
        item: {
          _hover: {
            bg: "accent",
          },
        },
      },
    },
  },
});

export default customTheme;
