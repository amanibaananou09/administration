import React, { FC } from "react";
import { Box, useStyleConfig, BoxProps } from "@chakra-ui/react";

interface CardBodyProps extends BoxProps {
  variant: string;
}

const CardBody: FC<CardBodyProps> = (props) => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardBody", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default CardBody;