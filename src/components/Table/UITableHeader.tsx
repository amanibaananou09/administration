import { Text, Th, Thead, Tr } from "@chakra-ui/react";
import { UITableHeaderProps } from "./Types";

const UITableHeader = <T, K extends keyof T>({
  columns,
}: UITableHeaderProps<T, K>) => {
  //styles
  const textColor = "gray.700";
  const columnTitleTextColor = "black";
  const borderColor = "gray.200";

  const headers = columns.map((column, index) => {
    return (
      <Th
        borderColor={borderColor}
        color={columnTitleTextColor}
        fontSize="ms"
        textAlign="center"
        key={index}
      >
        <Text fontSize="ms" fontWeight="blod" color={textColor}>
          {column.header}
        </Text>
      </Th>
    );
  });

  return (
    <Thead>
      <Tr my=".8rem" pl="0px" color="gray.400">
        {headers}
      </Tr>
    </Thead>
  );
};

export default UITableHeader;
