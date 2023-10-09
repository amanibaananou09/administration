import { Box, useStyleConfig, BoxProps } from "@chakra-ui/react";
import React from "react";

interface PanelContentProps extends BoxProps {
  variant: string;
}

const PanelContent: React.FC<PanelContentProps> = ({
  variant,
  children,
  ...rest
}) => {
  const styles = useStyleConfig("PanelContent", { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default PanelContent;
