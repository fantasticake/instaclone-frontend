/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signUp
// ====================================================

export interface signUp_signUp {
  __typename: "MutationRes";
  ok: boolean;
  error: string | null;
}

export interface signUp {
  signUp: signUp_signUp;
}

export interface signUpVariables {
  username: string;
  email: string;
  password: string;
}
