/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_photos {
  __typename: "Photo";
  id: number;
  url: string;
  totalLikes: number;
  totalComments: number;
}

export interface seeProfile_seeProfile {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
  totalPosts: number;
  totalFollowing: number;
  totalFollowers: number;
  photos: (seeProfile_seeProfile_photos | null)[] | null;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile | null;
}

export interface seeProfileVariables {
  userId: number;
}
