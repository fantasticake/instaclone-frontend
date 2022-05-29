/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeRoomWithMessages
// ====================================================

export interface seeRoomWithMessages_seeRoom_users {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface seeRoomWithMessages_seeRoom {
  __typename: "Room";
  id: number;
  users: (seeRoomWithMessages_seeRoom_users | null)[] | null;
}

export interface seeRoomWithMessages_seeMessages_user {
  __typename: "User";
  id: number;
  avatar: string | null;
}

export interface seeRoomWithMessages_seeMessages {
  __typename: "Message";
  id: number;
  payload: string;
  user: seeRoomWithMessages_seeMessages_user;
  createdAt: string;
}

export interface seeRoomWithMessages {
  seeRoom: seeRoomWithMessages_seeRoom | null;
  seeMessages: (seeRoomWithMessages_seeMessages | null)[] | null;
}

export interface seeRoomWithMessagesVariables {
  roomId: number;
}
