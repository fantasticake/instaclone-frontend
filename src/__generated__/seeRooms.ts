/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeRooms
// ====================================================

export interface seeRooms_seeRooms_users {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface seeRooms_seeRooms {
  __typename: "Room";
  id: number;
  users: (seeRooms_seeRooms_users | null)[] | null;
  totalUnread: number;
}

export interface seeRooms {
  seeRooms: (seeRooms_seeRooms | null)[] | null;
}
