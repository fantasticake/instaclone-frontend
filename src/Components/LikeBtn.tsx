import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import { likePhoto, likePhotoVariables } from "../__generated__/likePhoto";
import {
  unlikePhoto,
  unlikePhotoVariables,
} from "../__generated__/unlikePhoto";

const Container = styled.button<{ isLiked: boolean }>`
  svg {
    font-size: 22px;
    path {
      color: ${(props) =>
        props.isLiked ? "tomato" : props.theme.colors.textColor};
    }
  }
  :hover {
    ${(props) => (!props.isLiked ? "opacity: 0.7;" : null)}
  }
`;

const LIKE_PHOTO_MUTATION = gql`
  mutation likePhoto($photoId: Int!) {
    likePhoto(photoId: $photoId) {
      ok
      error
    }
  }
`;

const UNLIKE_PHOTO_MUTATION = gql`
  mutation unlikePhoto($photoId: Int!) {
    unlikePhoto(photoId: $photoId) {
      ok
      error
    }
  }
`;

const LikeBtn = ({
  photoId,
  isLiked,
}: {
  photoId: number;
  isLiked: boolean;
}) => {
  const updateLikeMutation: MutationUpdaterFunction<
    likePhoto,
    likePhotoVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, data) => {
    cache.modify({
      id: `Photo:${photoId}`,
      fields: {
        isLiked(prev) {
          return !prev;
        },
        totalLikes(prev) {
          return prev + 1;
        },
      },
    });
  };

  const updateUnlikeMutation: MutationUpdaterFunction<
    unlikePhoto,
    unlikePhotoVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, data) => {
    cache.modify({
      id: `Photo:${photoId}`,
      fields: {
        isLiked(prev) {
          return !prev;
        },
        totalLikes(prev) {
          return prev - 1;
        },
      },
    });
  };

  const [likeMutation, { loading: likeLoading }] = useMutation<
    likePhoto,
    likePhotoVariables
  >(LIKE_PHOTO_MUTATION, {
    variables: { photoId: photoId },
    update: updateLikeMutation,
  });
  const [unlikeMutation, { loading: unlikeLoading }] = useMutation<
    unlikePhoto,
    unlikePhotoVariables
  >(UNLIKE_PHOTO_MUTATION, {
    variables: { photoId: photoId },
    update: updateUnlikeMutation,
  });
  const toggleLike = async () => {
    if (!likeLoading && !unlikeLoading) {
      if (isLiked) {
        await unlikeMutation();
      } else {
        await likeMutation();
      }
    }
  };
  return (
    <Container isLiked={isLiked} onClick={toggleLike}>
      {isLiked ? (
        <FontAwesomeIcon icon={faSolidHeart} />
      ) : (
        <FontAwesomeIcon icon={faHeart} />
      )}
    </Container>
  );
};

export default LikeBtn;
