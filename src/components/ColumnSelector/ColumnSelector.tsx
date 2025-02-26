import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FaEllipsisV, FaCheckSquare, FaSquare } from "react-icons/fa";

interface ColumnSelectorProps {
  allColumns: { key: string; header: string }[];
  visibleColumns: string[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<string[]>>;
}

const ColumnSelector = ({
  allColumns,
  visibleColumns,
  setVisibleColumns,
}: ColumnSelectorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleColumnVisibility = (key: string) => {
    // Assurez-vous que la colonne "#" est toujours affichée
    if (key === "#") return;

    setVisibleColumns((prev: string[]) => {
      const updatedColumns = prev.includes(key)
        ? prev.filter((col: string) => col !== key)
        : [...prev, key];

      // Ajouter "#" automatiquement si elle n'est pas incluse
      if (!updatedColumns.includes("#")) {
        updatedColumns.unshift("#");
      }

      return updatedColumns;
    });
  };

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton
        as={Button}
        onClick={() => setIsOpen(!isOpen)}
        bg="white"
        mr={1}
      >
        <FaEllipsisV />
      </MenuButton>
      <MenuList>
        {allColumns.map((column) => (
          <MenuItem
            key={column.key}
            onClick={() => toggleColumnVisibility(column.key)}
          >
            <Flex align="center">
              {visibleColumns.includes(column.key) ? (
                <FaCheckSquare color="blue" style={{ marginRight: "8px" }} />
              ) : (
                <FaSquare color="gray" style={{ marginRight: "8px" }} />
              )}
              <Text>{column.header}</Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ColumnSelector;
