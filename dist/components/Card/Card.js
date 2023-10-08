import { Box, useStyleConfig } from "@chakra-ui/react";
import React from "react";
function Card(props) {
    const { variant, children, ...rest } = props;
    const styles = useStyleConfig("Card", { variant });
    // Pass the computed styles into the `__css` prop
    return (React.createElement(Box, Object.assign({ __css: styles }, rest), children));
}
export default Card;
