import React from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { HamburgerIcon } from "@chakra-ui/icons";
const TankChartMenu = ({ tanks, selectedTank, onChange }) => {
    return (React.createElement(Menu, { menuButton: React.createElement(MenuButton, null,
            React.createElement(HamburgerIcon, { boxSize: 6 })) }, tanks.map((tankElement) => (React.createElement(MenuItem, { type: "checkbox", key: tankElement.idConf, value: tankElement.idConf, onClick: () => onChange(tankElement.idConf), checked: selectedTank === tankElement.idConf },
        "Tank ",
        tankElement.idConf)))));
};
export default TankChartMenu;
