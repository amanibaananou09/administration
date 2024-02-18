import { Alert, AlertIcon, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import { get } from "lodash";
import React from "react";
import { UIColumnDefinitionType, UITableRowsProps } from "./Types";

const UITableRows = <T,>({
  data,
  columns,
  emptyListMessage,
  styles,
}: UITableRowsProps<T>) => {
  const getContent = (
    row: T,
    rowIndex: number,
    column: UIColumnDefinitionType<T>,
  ) => {
    if (!column.key && !column.render) {
      return (
        <Alert status="error">
          <AlertIcon />
          No 'key' or 'render' propertie is configured
        </Alert>
      );
    }

    if (column.render) {
      const renderContent = column.render(row, rowIndex);

      if (React.isValidElement(renderContent)) {
        return renderContent;
      } else {
        return <Text {...styles}>{renderContent}</Text>;
      }
    }

    if (column.key === "#") {
      return <Text {...styles}>{rowIndex + 1}</Text>;
    }

    const value = get(row, column.key as string);

    return <Text {...styles}>{value}</Text>;
  };

  let rows;

  if (!data || data.length === 0) {
    rows = (
      <Tr>
        <Td colSpan={columns.length}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.600"
            textAlign="center"
            my={4}
          >
            {emptyListMessage}
          </Text>
        </Td>
      </Tr>
    );
  } else {
    rows = data.map((row, rowIndex) => {
      return (
        <Tr key={rowIndex}>
          {columns.map((column, colIndex) => {
            return (
              <Td
                key={colIndex}
                borderColor="gray.200"
                borderBottom={rowIndex === data.length - 1 ? "none" : undefined}
                textAlign="center"
              >
                {getContent(row, rowIndex, column)}
              </Td>
            );
          })}
        </Tr>
      );
    });
  }

  return <Tbody>{rows}</Tbody>;
};

export default UITableRows;
