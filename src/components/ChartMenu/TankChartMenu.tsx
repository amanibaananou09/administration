import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { TankChartMenuProps } from "common/model";

const TankChartMenu = ({
  tanks,
  selectedTank,
  onChange,
}: TankChartMenuProps) => {
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
