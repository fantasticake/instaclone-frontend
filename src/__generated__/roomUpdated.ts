/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: roomUpdated
// ====================================================

export interface roomUpdated_roomUpdated_user {
  __typename: "User";
  id: number;
  avatar: string | null;
}

export interface roomUpdated_roomUpdated {
  __typename: "Message";
  id: number;
  payload: string;
  user: roomUpdated_roomUpdated_user;
  createdAt: string;
}

export interface roomUpdated {
  roomUpdated: roomUpdated_roomUpdated | null;
}

export interface roomUpdatedVariables {
  roomId: number;
}
