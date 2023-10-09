import { Box, useStyleConfig, BoxProps } from "@chakra-ui/react";
import React from "react";

interface PanelContainerProps extends BoxProps {
  variant: string;
}

const PanelContainer: React.FC<PanelContainerProps> = ({
  variant,
  children,
  ...rest
}) => {
  const styles = useStyleConfig("PanelContainer", { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default PanelContainer;
