/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: newMessage
// ====================================================

export interface newMessage_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface newMessage {
  __typename: "Message";
  id: number;
  payload: string;
  user: newMessage_user;
  createdAt: string;
}
