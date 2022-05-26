/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NewPhoto
// ====================================================

export interface NewPhoto_user {
  __typename: "User";
  id: number;
  avatar: string | null;
  username: string;
}

export interface NewPhoto {
  __typename: "Photo";
  id: number;
  url: string;
  caption: string | null;
  isLiked: boolean;
  totalLikes: number;
  totalComments: number;
  createdAt: string;
  user: NewPhoto_user;
}
