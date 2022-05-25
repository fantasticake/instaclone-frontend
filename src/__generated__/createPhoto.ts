/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPhoto
// ====================================================

export interface createPhoto_createPhoto {
  __typename: "MutationRes";
  ok: boolean;
  id: number | null;
  error: string | null;
}

export interface createPhoto {
  createPhoto: createPhoto_createPhoto;
}

export interface createPhotoVariables {
  file: any;
  caption?: string | null;
}
