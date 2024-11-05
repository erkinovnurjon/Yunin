import { Component } from "vue";

export interface Menu {
  name: string;
  to: string;
  childrenVisible: boolean;
  children: Menu[];
  icon: Component;
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

export interface IProduct {
  id: number | null;
  title: string;
  description: string;
  thumbnailId: any;
  size: string | null;
  acquiredPrice: number | string | null;
  salePrice: number | string | null;
  productTypeId: number | string | null;
  productColourId: number | string | null;
  contragentId: number | string | null;
  statusId: number | string | null;
}

export interface ISelect {
  value: string | number;
  text: string;
  orderCode?: string | null;
}
