/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seePhotosByUser
// ====================================================

export interface seePhotosByUser_seePhotosByUser {
  __typename: "Photo";
  id: number;
  url: string;
  totalLikes: number;
  totalComments: number;
}

export interface seePhotosByUser {
  seePhotosByUser: (seePhotosByUser_seePhotosByUser | null)[] | null;
}

export interface seePhotosByUserVariables {
  userId: number;
}
