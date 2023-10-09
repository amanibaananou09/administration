import React, { FC } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { HamburgerIcon } from "@chakra-ui/icons";

interface TankChartMenuProps {
  tanks: Array<{ idConf: string }>;
  selectedTank: string;
  onChange: (idConf: string) => void;
}

const TankChartMenu: FC<TankChartMenuProps> = ({
  tanks,
  selectedTank,
  onChange,
}) => {
  return (
    <Menu
      menuButton={
        <MenuButton>
          <HamburgerIcon boxSize={6} />
        </MenuButton>
      }
    >
      {tanks.map((tankElement) => (
        <MenuItem
          type="checkbox"
          key={tankElement.idConf}
          value={tankElement.idConf}
          onClick={() => onChange(tankElement.idConf)}
          checked={selectedTank === tankElement.idConf}
        >
          Tank {tankElement.idConf}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default TankChartMenu;