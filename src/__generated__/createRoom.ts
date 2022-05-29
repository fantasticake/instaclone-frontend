/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createRoom
// ====================================================

export interface createRoom_createRoom {
  __typename: "MutationRes";
  ok: boolean;
  id: number | null;
  error: string | null;
}

export interface createRoom {
  createRoom: createRoom_createRoom;
}

export interface createRoomVariables {
  userId: number;
}
