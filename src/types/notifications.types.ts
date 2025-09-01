// src/types/notifications.types.ts

export type Notification = {
  title: string;
  message: string;
  time: string;
  tag: Tag;
  status?:Status ;
  read:boolean
};

export type Status = "read" | "unread" | "bookmarked" | "";
export type Tag = "" | "social" | "promo" | "system";
export type Action = "" | "delete" | "markRead" | "markUnread" | "bookmark";

export type FilterOptions = {
  searchText: string;
  status: Status[];
  tags: Tag[];
};
export type FilterAction =
  | { type: "SET_SEARCH_TEXT"; payload: string }
  | { type: "SET_STATUS"; payload: Status }
  | { type: "SET_TAGS"; payload: Tag }
