export type UIColumnDefinitionType<T> = {
  header: string;
  key: keyof T;
  render?: (item: T) => string | number | React.ReactNode;
};

export type UITableHeaderProps<T> = {
  columns: Array<UIColumnDefinitionType<T>>;
};

export type UITableRowsProps<T> = {
  data: Array<T>;
  columns: Array<UIColumnDefinitionType<T>>;
  emptyListMessage: string;
};

export type UITableProps<T> = {
  data: Array<T>;
  columns: Array<UIColumnDefinitionType<T>>;
  emptyListMessage: string;
};
