import React from "react";
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu,
  MenuDivider,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { HamburgerIcon } from "@chakra-ui/icons";

const SidebarMenuTank = ({
  tank,
  setTank,
  tankData,
}) => {

  const handleTankChange = (value) => {
    setTank(value);
  };


  return (
    <Menu 
      menuButton={ 
        <MenuButton>
          <HamburgerIcon  boxSize={6} />
        </MenuButton>
      }
    >
          {tankData.map((tank) => (
            <MenuItem
              key={tank.idConf}
              value={tank.idConf}
              onClick={() => handleTankChange(tank.idConf)}
            >
              Tank {tank.idConf}
            </MenuItem>
          ))}{" "}
    </Menu>
  );
};

export default SidebarMenuTank;
