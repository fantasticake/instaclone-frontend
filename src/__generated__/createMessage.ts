/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createMessage
// ====================================================

export interface createMessage_createMessage {
  __typename: "MutationRes";
  ok: boolean;
  id: number | null;
  error: string | null;
}

export interface createMessage {
  createMessage: createMessage_createMessage;
}

export interface createMessageVariables {
  roomId?: number | null;
  userId?: number | null;
  payload: string;
}
