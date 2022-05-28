/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchUsers
// ====================================================

export interface searchUsers_searchUsers {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface searchUsers {
  searchUsers: (searchUsers_searchUsers | null)[] | null;
}

export interface searchUsersVariables {
  key: string;
}
