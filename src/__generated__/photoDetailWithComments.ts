/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: photoDetailWithComments
// ====================================================

export interface photoDetailWithComments_photoDetail_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface photoDetailWithComments_photoDetail {
  __typename: "Photo";
  id: number;
  url: string;
  caption: string | null;
  isLiked: boolean;
  user: photoDetailWithComments_photoDetail_user;
  totalLikes: number;
  createdAt: string;
}

export interface photoDetailWithComments_seeComments_user {
  __typename: "User";
  id: number;
  avatar: string | null;
  username: string;
}

export interface photoDetailWithComments_seeComments {
  __typename: "Comment";
  id: number;
  payload: string;
  user: photoDetailWithComments_seeComments_user;
}

export interface photoDetailWithComments {
  photoDetail: photoDetailWithComments_photoDetail | null;
  seeComments: (photoDetailWithComments_seeComments | null)[] | null;
}

export interface photoDetailWithCommentsVariables {
  photoId: number;
  offset?: number | null;
}
