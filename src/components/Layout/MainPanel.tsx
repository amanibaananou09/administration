import { Box, useStyleConfig, BoxProps } from "@chakra-ui/react";
import React from "react";

interface MainPanelProps extends BoxProps {
  variant: string;
}

const MainPanel: React.FC<MainPanelProps> = ({ variant, children, ...rest }) => {
  const styles = useStyleConfig("MainPanel", { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default MainPanel;
