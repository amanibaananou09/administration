export type UIColumnDefinitionType<T, K extends keyof T> = {
  header: string;
  key: K;
  render?: (item: T) => string | number | React.ReactNode;
};

export type UITableHeaderProps<T, K extends keyof T> = {
  columns: Array<UIColumnDefinitionType<T, K>>;
};

export type UITableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<UIColumnDefinitionType<T, K>>;
  emptyListMessage: string;
};

export type UITableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<UIColumnDefinitionType<T, K>>;
  emptyListMessage: string;
};
