import React from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { HamburgerIcon } from "@chakra-ui/icons";

const TankChartMenu = ({ tank, setTank, tankData }) => {
  const handleTankChange = (value) => {
    setTank(value);
  };

  return (
    <Menu
      menuButton={
        <MenuButton>
          <HamburgerIcon boxSize={6} />
        </MenuButton>
      }
    >
      {tankData.map((tankElement) => (
        <MenuItem
          type="checkbox"
          key={tankElement.idConf}
          value={tankElement.idConf}
          onClick={() => handleTankChange(tankElement.idConf)}
          checked={tank === tankElement.idConf}
        >
          Tank {tankElement.idConf}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default TankChartMenu;
