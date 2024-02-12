import { StyleProps } from "@chakra-ui/system";

export type UIColumnDefinitionType<T> = {
  header: string;
  key?: string;
  render?: (item: T, index: number) => string | number | React.ReactNode;
};

export type UITableHeaderProps<T> = {
  columns: Array<UIColumnDefinitionType<T>>;
  styles?: StyleProps;
};

export type UITableRowsProps<T> = {
  data: Array<T>;
  columns: Array<UIColumnDefinitionType<T>>;
  emptyListMessage: string;
  styles?: StyleProps;
};

export type UITableProps<T> = {
  data: Array<T>;
  columns: Array<UIColumnDefinitionType<T>>;
  emptyListMessage: string;
  headerStyles?: StyleProps;
  rowStyles?: StyleProps;
};
