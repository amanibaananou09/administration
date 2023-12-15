import { Tbody, Td, Text, Tr } from "@chakra-ui/react";
import { UIColumnDefinitionType, UITableRowsProps } from "./Types";

const UITableRows = <T, K extends keyof T>({
  data,
  columns,
  emptyListMessage,
}: UITableRowsProps<T, K>) => {
  //styles
  const borderColor = "gray.200";
  const columnWidth = "100px";

  const getContent = (row: T, column: UIColumnDefinitionType<T, K>) => {
    if (column.render) {
      return column.render(row);
    }

    //@ts-ignore
    return row[column.key] as ReactI18NextChildren;
  };

  let rows;

  if (data.length === 0) {
    rows = (
      <Tr>
        <Td colSpan={columns.length} textAlign="center">
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
    rows = data.map((row, index) => {
      return (
        <Tr key={index}>
          {columns.map((column, colIndex) => {
            return (
              <Td
                key={colIndex}
                width={columnWidth}
                borderColor={borderColor}
                borderBottom={index === data.length - 1 ? "none" : undefined}
                textAlign="center"
              >
                {getContent(row, column)}
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
