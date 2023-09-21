import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu,
  MenuDivider,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { getAllPump } from "common/api";
import { getAllFuelGrades } from "common/api";
import { getAllTank } from "common/api";

const ReportSalesChartMenu = ({ filter, onChange }) => {
  const { user } = useAuth();

  const {
    selectedStation: { controllerId },
  } = useESSContext();

  const [config, setConfig] = useState({
    pumps: [],
    fuelGrades: [],
    tanks: [],
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { token } = user;

        const pumps = await getAllPump(controllerId, token);

        const fuelGrades = await getAllFuelGrades(controllerId, token);

        const tanks = await getAllTank(controllerId, token);

        setConfig({
          pumps,
          fuelGrades,
          tanks,
        });
      } catch (error) {
        console.error("Error fetching data fuelgrades:", error);
      }
    };

    fetchConfig();
  }, [controllerId]);

  const handleChange = (key, value) => {
    filter[key] = value;
    onChange(filter);
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
        <MenuItem onClick={() => handleChange("type", "sale")}>Sale</MenuItem>
        <MenuItem onClick={() => handleChange("type", "purchase")}>
          Purchase
        </MenuItem>
      </SubMenu>
      <MenuDivider />
      <SubMenu label="Fuel Grades">
        <MenuItem value="all">All Fuel Grades</MenuItem>
        {config.fuelGrades.map((fuel) => (
          <MenuItem
            key={fuel.name}
            value={fuel.name}
            onClick={() => handleChange("fuelGrade", fuel.name)}
          >
            {fuel.name}
          </MenuItem>
        ))}
      </SubMenu>
      <MenuDivider />

      {filter.type === "sale" ? (
        <SubMenu label="Pump">
          <MenuItem value="all">All Pumps</MenuItem>
          {config.pumps.map((pump) => (
            <MenuItem
              key={pump.id}
              value={pump.id}
              onClick={() => handleChange("pump", pump.id)}
            >
              Pump {pump.id}
            </MenuItem>
          ))}
        </SubMenu>
      ) : (
        <SubMenu label="Tank">
          <MenuItem value="all">All Tank</MenuItem>
          {config.tanks.map((tank) => (
            <MenuItem
              key={tank.idConf}
              value={tank.idConf}
              onClick={() => handleChange("tank", tank.idConf)}
            >
              Tank {tank.idConf}
            </MenuItem>
          ))}
        </SubMenu>
      )}
      <MenuDivider />
      <SubMenu label="Period">
        <MenuItem onClick={() => handleChange("period", "weekly")}>
          Weekly
        </MenuItem>
        <MenuItem onClick={() => handleChange("period", "monthly")}>
          Monthly
        </MenuItem>
        <MenuItem onClick={() => handleChange("period", "yearly")}>
          Yearly
        </MenuItem>
      </SubMenu>
    </Menu>
  );
};

export default ReportSalesChartMenu;
