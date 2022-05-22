/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: likePhoto
// ====================================================

export interface likePhoto_likePhoto {
  __typename: "MutationRes";
  ok: boolean;
  error: string | null;
}

export interface likePhoto {
  likePhoto: likePhoto_likePhoto;
}

export interface likePhotoVariables {
  photoId: number;
}
