/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unfollow
// ====================================================

export interface unfollow_unfollow {
  __typename: "MutationRes";
  ok: boolean;
  error: string | null;
}

export interface unfollow {
  unfollow: unfollow_unfollow;
}

export interface unfollowVariables {
  userId: number;
}
