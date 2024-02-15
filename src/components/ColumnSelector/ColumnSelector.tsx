import React from "react";
import { Checkbox, Flex, Box } from "@chakra-ui/react";
import { UIColumnDefinitionType } from "components/UI/Table/Types";

interface ColumnSelectionDropdownProps {
  columns: UIColumnDefinitionType<any>[];
  visibleColumns: string[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<string[]>>;
  setDisplayedColumns: React.Dispatch<React.SetStateAction<UIColumnDefinitionType<any>[]>>;
  isOpen: boolean;
}

const ColumnSelectionDropdown = ({
  columns,
  visibleColumns,
  setVisibleColumns,
  setDisplayedColumns,
  isOpen,
}: ColumnSelectionDropdownProps) => {
  const toggleColumnVisibility = (columnKey: string | undefined) => {
    if (columnKey && columnKey !== "#") {
      setVisibleColumns((prevVisibleColumns) => {
        const isColumnKeyVisible = prevVisibleColumns.includes(columnKey);
        const updatedVisibleColumns = isColumnKeyVisible
          ? prevVisibleColumns.filter((key) => key !== columnKey)
          : [...prevVisibleColumns, columnKey];

          if (!updatedVisibleColumns.includes("#")) {
          updatedVisibleColumns.push("#");
        }
        // Update displayedColumns based on updatedVisibleColumns
        const updatedDisplayedColumns = columns.filter((col) =>
          updatedVisibleColumns.includes(col.key as string),
        ) as UIColumnDefinitionType<any>[];

        if (updatedDisplayedColumns.length === 1 && updatedDisplayedColumns[0].key === "#") {
          setDisplayedColumns(columns);
        } else {
          setDisplayedColumns([...updatedDisplayedColumns]);
        }
        return updatedVisibleColumns;
      });
    }
  };

  return (
    <Flex justifyContent="flex-end" position="relative">
      {isOpen && (
        <Box
          position="absolute"
          top="40px"
          right="0"
          bg="white"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          p="2"
          zIndex="100"
          display="flex"
          flexDirection="column"
        >
          {columns.map((col) => {
            if (typeof col.key === "string") {
              return (
                <Checkbox
                  key={col.key}
                  isChecked={visibleColumns.includes(col.key)}
                  onChange={() => toggleColumnVisibility(col.key)}
                >
                  {col.header}
                </Checkbox>
              );
            }
            return null;
          })}
        </Box>
      )}
    </Flex>
  );
};

export default ColumnSelectionDropdown;
