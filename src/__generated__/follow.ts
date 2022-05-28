/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: follow
// ====================================================

export interface follow_follow {
  __typename: "MutationRes";
  ok: boolean;
  error: string | null;
}

export interface follow {
  follow: follow_follow;
}

export interface followVariables {
  userId: number;
}
