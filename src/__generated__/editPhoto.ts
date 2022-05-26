/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editPhoto
// ====================================================

export interface editPhoto_editPhoto {
  __typename: "MutationRes";
  ok: boolean;
  error: string | null;
}

export interface editPhoto {
  editPhoto: editPhoto_editPhoto;
}

export interface editPhotoVariables {
  photoId: number;
  caption?: string | null;
}
