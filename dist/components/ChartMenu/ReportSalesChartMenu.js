import React, { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton, SubMenu, MenuDivider, } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { getAllPump } from "common/api";
import { getAllFuelGrades } from "common/api";
import { getAllTank } from "common/api";
const ReportSalesChartMenu = ({ filter, onChange }) => {
    const { user } = useAuth();
    const { selectedStation: { controllerId }, } = useESSContext();
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
            }
            catch (error) {
                console.error("Error fetching data fuelgrades:", error);
            }
        };
        fetchConfig();
    }, [controllerId]);
    const handleChange = (key, value) => {
        filter[key] = value;
        onChange(filter);
    };
    return (React.createElement(Menu, { menuButton: React.createElement(MenuButton, null,
            React.createElement(HamburgerIcon, { color: "white", boxSize: 6 })) },
        React.createElement(SubMenu, { label: "Type" },
            React.createElement(MenuItem, { type: "checkbox", onClick: () => handleChange("type", "sale"), checked: filter.type === "sale" }, "Sale"),
            React.createElement(MenuItem, { type: "checkbox", onClick: () => handleChange("type", "purchase"), checked: filter.type === "purchase" }, "Purchase")),
        React.createElement(MenuDivider, null),
        React.createElement(SubMenu, { label: "Fuel Grades" },
            React.createElement(MenuItem, { type: "checkbox", value: "all", onClick: () => handleChange("fuelGrade", "all"), checked: filter.fuelGrade === "all" }, "All Fuel Grades"),
            config.fuelGrades.map((fuel) => (React.createElement(MenuItem, { type: "checkbox", key: fuel.name, value: fuel.name, onClick: () => handleChange("fuelGrade", fuel.name), checked: filter.fuelGrade === fuel.name }, fuel.name)))),
        React.createElement(MenuDivider, null),
        filter.type === "sale" ? (React.createElement(SubMenu, { label: "Pump" },
            React.createElement(MenuItem, { type: "checkbox", value: "all", onClick: () => handleChange("pump", "all"), checked: filter.pump === "all" }, "All Pumps"),
            config.pumps.map((pump) => (React.createElement(MenuItem, { type: "checkbox", key: pump.id, value: pump.id, onClick: () => handleChange("pump", pump.id), checked: filter.pump === pump.id },
                "Pump ",
                pump.id))))) : (React.createElement(SubMenu, { label: "Tank" },
            React.createElement(MenuItem, { type: "checkbox", value: "all", onClick: () => handleChange("tank", "all"), checked: filter.tank === "all" }, "All Tank"),
            config.tanks.map((tank) => (React.createElement(MenuItem, { type: "checkbox", key: tank.idConf, value: tank.idConf, onClick: () => handleChange("tank", tank.idConf), checked: filter.tank === tank.idConf },
                "Tank ",
                tank.idConf))))),
        React.createElement(MenuDivider, null),
        React.createElement(SubMenu, { label: "Period" },
            React.createElement(MenuItem, { type: "checkbox", onClick: () => handleChange("period", "weekly"), checked: filter.period === "weekly" }, "current week"),
            React.createElement(MenuItem, { type: "checkbox", onClick: () => handleChange("period", "monthly"), checked: filter.period === "monthly" }, "current Month"),
            React.createElement(MenuItem, { type: "checkbox", onClick: () => handleChange("period", "yearly"), checked: filter.period === "yearly" }, "current Yearly"))));
};
export default ReportSalesChartMenu;
