/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeRoom
// ====================================================

export interface seeRoom_seeRoom_users {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface seeRoom_seeRoom {
  __typename: "Room";
  id: number;
  users: (seeRoom_seeRoom_users | null)[] | null;
}

export interface seeRoom_seeMessages_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface seeRoom_seeMessages {
  __typename: "Message";
  id: number;
  payload: string;
  user: seeRoom_seeMessages_user;
  createdAt: string;
}

export interface seeRoom {
  seeRoom: seeRoom_seeRoom | null;
  seeMessages: (seeRoom_seeMessages | null)[] | null;
}

export interface seeRoomVariables {
  roomId: number;
}
