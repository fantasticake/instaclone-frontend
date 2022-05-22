/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface seeFeed_seeFeed_comments_user {
  __typename: "User";
  id: number;
  username: string;
}

export interface seeFeed_seeFeed_comments {
  __typename: "Comment";
  id: number;
  payload: string;
  user: seeFeed_seeFeed_comments_user;
}

export interface seeFeed_seeFeed {
  __typename: "Photo";
  id: number;
  url: string;
  caption: string;
  isLiked: boolean;
  totalLikes: number;
  totalComments: number;
  createdAt: string;
  user: seeFeed_seeFeed_user;
  comments: (seeFeed_seeFeed_comments | null)[] | null;
}

export interface seeFeed {
  seeFeed: (seeFeed_seeFeed | null)[] | null;
}
