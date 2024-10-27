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

export interface IButton {
  label?: string;
  icon?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  size?: "default" | "icon" | "xs" | "sm" | "lg" | null | undefined;
}
