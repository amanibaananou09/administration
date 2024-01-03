import { Text, Th, Thead, Tr } from "@chakra-ui/react";
import { UITableHeaderProps } from "./Types";

const UITableHeader = <T,>({ columns, styles }: UITableHeaderProps<T>) => {
  const headers = columns.map((column, index) => {
    return (
      <Th borderColor="gray.200" key={index}>
        <Text
          textColor="gray.700"
          textAlign="center"
          fontWeight="bold"
          fontSize="md"
          textTransform="capitalize"
          {...styles}
        >
          {column.header}
        </Text>
      </Th>
    );
  });

  return (
    <Thead>
      <Tr my=".8rem" pl="0px">
        {headers}
      </Tr>
    </Thead>
  );
};

export default UITableHeader;
