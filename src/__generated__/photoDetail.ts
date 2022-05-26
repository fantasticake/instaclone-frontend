/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: photoDetail
// ====================================================

export interface photoDetail_photoDetail {
  __typename: "Photo";
  id: number;
  url: string;
  caption: string | null;
}

export interface photoDetail {
  photoDetail: photoDetail_photoDetail | null;
}

export interface photoDetailVariables {
  photoId: number;
}
