export interface Menu {
  name: string;
  to: string;
  childrenVisible: boolean;
  children: Menu[];
  icon: string;
}

export interface ITableHeader {
  key: string;
  label: string;
  tClass: string;
  isAmount?: boolean;
}
