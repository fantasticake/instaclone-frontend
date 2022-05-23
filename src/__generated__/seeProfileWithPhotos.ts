/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfileWithPhotos
// ====================================================

export interface seeProfileWithPhotos_seeProfile {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
  totalPosts: number;
  totalFollowing: number;
  totalFollowers: number;
}

export interface seeProfileWithPhotos_seePhotosByUser {
  __typename: "Photo";
  id: number;
  url: string;
  totalLikes: number;
  totalComments: number;
}

export interface seeProfileWithPhotos {
  seeProfile: seeProfileWithPhotos_seeProfile | null;
  seePhotosByUser: (seeProfileWithPhotos_seePhotosByUser | null)[] | null;
}

export interface seeProfileWithPhotosVariables {
  userId: number;
}
