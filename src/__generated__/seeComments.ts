/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeComments
// ====================================================

export interface seeComments_seeComments_user {
  __typename: "User";
  id: number;
  username: string;
}

export interface seeComments_seeComments {
  __typename: "Comment";
  id: number;
  payload: string;
  user: seeComments_seeComments_user;
}

export interface seeComments {
  seeComments: (seeComments_seeComments | null)[] | null;
}

export interface seeCommentsVariables {
  photoId: number;
  take?: number | null;
}
