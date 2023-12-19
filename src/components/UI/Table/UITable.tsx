import { Table } from "@chakra-ui/react";
import { UITableProps } from "./Types";
import UITableHeader from "./UITableHeader";
import UITableRows from "./UITableRows";

const UITable = <T,>({
  data,
  columns,
  emptyListMessage,
  headerStyles,
  rowStyles,
}: UITableProps<T>): JSX.Element => {
  //styles
  const defaultTextColor = "black";

  return (
    <Table variant="simple" color={defaultTextColor}>
      <UITableHeader styles={headerStyles} columns={columns} />
      <UITableRows
        styles={rowStyles}
        data={data}
        columns={columns}
        emptyListMessage={emptyListMessage}
      />
    </Table>
  );
};

export default UITable;
