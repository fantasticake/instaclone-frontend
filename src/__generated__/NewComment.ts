/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NewComment
// ====================================================

export interface NewComment_user {
  __typename: "User";
  id: number;
  username: string;
}

export interface NewComment {
  __typename: "Comment";
  id: number;
  payload: string;
  user: NewComment_user;
}
