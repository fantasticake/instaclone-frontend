/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login {
  __typename: "LoginRes";
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  username: string;
  password: string;
}
