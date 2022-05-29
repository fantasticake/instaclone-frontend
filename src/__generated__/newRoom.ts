/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: newRoom
// ====================================================

export interface newRoom_users {
  __typename: "User";
  id: number;
  avatar: string | null;
  username: string;
}

export interface newRoom {
  __typename: "Room";
  id: number;
  users: (newRoom_users | null)[] | null;
  totalUnread: number;
}
