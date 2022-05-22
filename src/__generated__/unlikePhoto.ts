/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unlikePhoto
// ====================================================

export interface unlikePhoto_unlikePhoto {
  __typename: "MutationRes";
  ok: boolean;
  error: string | null;
}

export interface unlikePhoto {
  unlikePhoto: unlikePhoto_unlikePhoto;
}

export interface unlikePhotoVariables {
  photoId: number;
}
