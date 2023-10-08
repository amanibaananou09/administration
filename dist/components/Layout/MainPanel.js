import { Box, useStyleConfig } from "@chakra-ui/react";
import React from "react";
function MainPanel(props) {
    const { variant, children, ...rest } = props;
    const styles = useStyleConfig("MainPanel", { variant });
    // Pass the computed styles into the `__css` prop
    return (React.createElement(Box, Object.assign({ __css: styles }, rest), children));
}
export default MainPanel;
