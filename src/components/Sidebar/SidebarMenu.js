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

const SidebarMenu = ({
  type,
  setType,
  fuelGrade,
  setFuelGrade,
  fuelGradesData,
  pump,
  setPump,
  pumpData,
  tank,
  setTank,
  tankData,
  period,
  setPeriod,
}) => {
  const handleTypeChange = (value) => {
    setType(value);
  };

  const handleFuelGradeChange = (value) => {
    setFuelGrade(value);
  };

  const handlePumpChange = (value) => {
    setPump(value);
  };

  const handleTankChange = (value) => {
    setTank(value);
  };

  const handlePeriodChange = (value) => {
    setPeriod(value);
  };

  return (
    <Menu 
      menuButton={ 
        <MenuButton>
          <HamburgerIcon color="white" boxSize={6} />
        </MenuButton>
      }
    >
      <SubMenu label="Type">
        <MenuItem onClick={() => handleTypeChange("sale")}>Sale</MenuItem>
        <MenuItem onClick={() => handleTypeChange("purchase")}>
          Purchase
        </MenuItem>
      </SubMenu>
      <MenuDivider />
      <SubMenu label="Fuel Grades">
        <MenuItem value="all">All Fuel Grades</MenuItem>
        {fuelGradesData.map((fuel) => (
          <MenuItem
            key={fuel.name}
            value={fuel.name}
            onClick={() => handleFuelGradeChange(fuel.name)}
          >
            {fuel.name}
          </MenuItem>
        ))}{" "}
      </SubMenu>
      <MenuDivider />

      {type === "sale" ? (
        <SubMenu label="Pump">
          <MenuItem value="all">All Pumps</MenuItem>
          {pumpData.map((pump) => (
            <MenuItem
              key={pump.id}
              value={pump.id}
              onClick={() => handlePumpChange(pump.id)}
            >
              Pump {pump.id}
            </MenuItem>
          ))}
        </SubMenu>
      ) : (
        <SubMenu label="Tank">
          <MenuItem value="all">All Tank</MenuItem>
          {tankData.map((tank) => (
            <MenuItem
              key={tank.idConf}
              value={tank.idConf}
              onClick={() => handleTankChange(tank.idConf)}
            >
              Tank {tank.idConf}
            </MenuItem>
          ))}{" "}
        </SubMenu>
      )}
      <MenuDivider />
      <SubMenu label="Period">
        <MenuItem onClick={() => handlePeriodChange("weekly")}>Weekly</MenuItem>
        <MenuItem onClick={() => handlePeriodChange("monthly")}>
          Monthly
        </MenuItem>
        <MenuItem onClick={() => handlePeriodChange("yearly")}>Yearly</MenuItem>
      </SubMenu>
    </Menu>
  );
};

export default SidebarMenu;
