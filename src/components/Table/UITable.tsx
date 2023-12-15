import { Table } from "@chakra-ui/react";
import { UITableProps } from "./Types";
import UITableHeader from "./UITableHeader";
import UITableRows from "./UITableRows";

const UITable = <T, K extends keyof T>({
  data,
  columns,
  emptyListMessage,
}: UITableProps<T, K>): JSX.Element => {
  //styles
  const textColor = "gray.700";

  return (
    <Table variant="simple" color={textColor}>
      <UITableHeader columns={columns} />
      <UITableRows
        data={data}
        columns={columns}
        emptyListMessage={emptyListMessage}
      />
    </Table>
  );
};

export default UITable;
