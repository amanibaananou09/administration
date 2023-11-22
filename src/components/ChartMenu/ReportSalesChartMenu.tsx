import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  SubMenu,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { getAllFuelGrades, getAllPump } from "common/api/configuration-api";
import { fuelGrade, pump } from "common/model";
import { ReportSalesChartMenuProps } from "common/react-props";
import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { useTranslation } from "react-i18next";

const ReportSalesChartMenu = ({
  filter,
  onChange,
}: ReportSalesChartMenuProps) => {
  const { user } = useAuth();

  const { selectedStation } = useESSContext();

  const [config, setConfig] = useState<{
    pumps: pump[];
    fuelGrades: fuelGrade[];
  }>({
    pumps: [],
    fuelGrades: [],
  });

  useEffect(() => {
    const fetchConfig = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const pumps = await getAllPump(selectedStation);

        const fuelGrades = await getAllFuelGrades(selectedStation);

        setConfig({
          pumps,
          fuelGrades,
        });
      } catch (error) {
        console.error("Error fetching data fuelgrades:", error);
      }
    };

    fetchConfig();
  }, [selectedStation]);
  const { t } = useTranslation("dashboard");

  const handleChange = (key: string, value: string) => {
    const updatedFilter = { ...filter, [key]: value };
    onChange(updatedFilter);
  };

  return (
    <Menu
      menuButton={
        <MenuButton>
          <HamburgerIcon color="white" boxSize={6} />
        </MenuButton>
      }
    >
      <SubMenu label={t("common.type")}>
        <MenuItem
          type="checkbox"
          onClick={() => handleChange("chartType", "amount")}
          checked={filter.chartType === "amount"}
        >
          {t("common.amount")}
        </MenuItem>
        <MenuItem
          type="checkbox"
          onClick={() => handleChange("chartType", "volume")}
          checked={filter.chartType === "volume"}
        >
          {t("common.volume")}
        </MenuItem>
      </SubMenu>
      <MenuDivider />
      {filter.chartType === "amount" ? null : (
        <SubMenu label={t("common.fuelGrades")}>
          <MenuItem
            type="checkbox"
            value="all"
            onClick={() => handleChange("fuelGrade", "all")}
            checked={filter.fuelGrade === "all"}
          >
            {t("reportSalesChartMenu.allFuelGrades")}
          </MenuItem>
          {config.fuelGrades.map((fuel: fuelGrade) => (
            <MenuItem
              type="checkbox"
              key={fuel.name}
              value={fuel.name}
              onClick={() => handleChange("fuelGrade", fuel.name)}
              checked={filter.fuelGrade === fuel.name}
            >
              {fuel.name}
            </MenuItem>
          ))}
        </SubMenu>
      )}
      <MenuDivider />
      <SubMenu label={t("common.pump")}>
        <MenuItem
          type="checkbox"
          value="all"
          onClick={() => handleChange("pump", "all")}
          checked={filter.pump === "all"}
        >
          {t("reportSalesChartMenu.allPumps")}
        </MenuItem>
        {config.pumps.map((pump: pump) => (
          <MenuItem
            type="checkbox"
            key={pump.id}
            value={pump.id}
            onClick={() => handleChange("pump", pump.id)}
            checked={filter.pump === pump.id}
          >
            {t("common.pump")} {pump.id}
          </MenuItem>
        ))}
      </SubMenu>
    </Menu>
  );
};

export default ReportSalesChartMenu;
