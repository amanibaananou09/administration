import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from "./components/button";
import { badgeStyles } from "./components/badge";
import { linkStyles } from "./components/link";
import { inputStyles } from "./components/input";
import { CardComponent } from "./additions/card/Card";
import { MainPanelComponent } from "./additions/layout/MainPanel";
import { PanelContentComponent } from "./additions/layout/PanelContent";
import { PanelContainerComponent } from "./additions/layout/PanelContainer";
const customTheme = extendTheme({
    config: {
        initialColorMode: "light",
        useSystemColorMode: false,
        breakpoints,
    },
    styles: {
        global: globalStyles,
    },
    components: {
        Button: buttonStyles,
        Badge: badgeStyles,
        Link: linkStyles,
        Input: inputStyles,
        CardComponent,
        MainPanelComponent,
        PanelContentComponent,
        PanelContainerComponent,
    },
});
export default customTheme;
