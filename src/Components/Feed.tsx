import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import {
  faComment,
  faPaperPlane,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { likePhoto, likePhotoVariables } from "../__generated__/likePhoto";
import { seeFeed_seeFeed } from "../__generated__/seeFeed";
import {
  unlikePhoto,
  unlikePhotoVariables,
} from "../__generated__/unlikePhoto";
import Avatar from "./Avatar";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Container = styled.div`
  width: 400px;
  max-width: 90%;
  border: solid 3px ${(props) => props.theme.colors.faintLineColor};
  border-radius: 4px;
  font-size: 16px;
`;

const UserBox = styled.div`
  padding: 0 12px;
  display: flex;
  align-items: center;
  height: 50px;
`;

const AvatarContainer = styled.div`
  height: 26px;
  width: 26px;
  border-radius: 15px;
  font-size: 26px;
  margin-right: 18px;
  overflow: hidden;
`;

const Username = styled.span`
  font-weight: 500;
`;

const Photo = styled.img`
  width: 100%;
`;

const ControlBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 50px;
  padding: 0 10px;
  button {
    font-size: 22px;
  }
`;

const LikeBtn = styled.button<{ isLiked: boolean }>`
  svg path {
    color: ${(props) =>
      props.isLiked ? "tomato" : props.theme.colors.textColor};
  }
`;

const CommentBtn = styled.button``;

const DmBtn = styled.button``;

const TotalLikes = styled.span`
  padding: 0 14px;
  font-weight: 500;
`;

const CommentList = styled.div`
  margin: 12px 0;
  padding: 0 14px;
`;

const TotalComments = styled.span`
  display: block;
  opacity: 0.8;
  margin-bottom: 8px;
`;

const CreatedAt = styled.span`
  display: block;
  padding: 0 14px;
  opacity: 0.6;
  margin-bottom: 24px;
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

const Feed = (photo: seeFeed_seeFeed) => {
  const updateLikeMutation: MutationUpdaterFunction<
    likePhoto,
    likePhotoVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, data) => {
    cache.modify({
      id: `Photo:${photo.id}`,
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
      id: `Photo:${photo.id}`,
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
    variables: { photoId: photo.id },
    update: updateLikeMutation,
  });
  const [unlikeMutation, { loading: unlikeLoading }] = useMutation<
    unlikePhoto,
    unlikePhotoVariables
  >(UNLIKE_PHOTO_MUTATION, {
    variables: { photoId: photo.id },
    update: updateUnlikeMutation,
  });
  const toggleLike = async () => {
    if (!likeLoading && !unlikeLoading) {
      if (photo.isLiked) {
        await unlikeMutation();
      } else {
        await likeMutation();
      }
    }
  };
  return (
    <Container>
      <UserBox>
        <Link to={`/users/${photo.user.id}`}>
          <AvatarContainer>
            <Avatar avatar={photo.user.avatar} />
          </AvatarContainer>
        </Link>
        <Link to={`/users/${photo.user.id}`}>
          <Username>{photo.user.username}</Username>
        </Link>
      </UserBox>
      <Photo src={photo.url} />
      <ControlBox>
        <LikeBtn isLiked={photo.isLiked} onClick={toggleLike}>
          {photo.isLiked ? (
            <FontAwesomeIcon icon={faSolidHeart} />
          ) : (
            <FontAwesomeIcon icon={faHeart} />
          )}
        </LikeBtn>
        <CommentBtn>
          <FontAwesomeIcon icon={faComment} />
        </CommentBtn>
        <DmBtn>
          <FontAwesomeIcon icon={faPaperPlane} />
        </DmBtn>
      </ControlBox>
      <TotalLikes>
        {photo.totalLikes}
        {photo.totalLikes == 1 ? " like" : " likes"}
      </TotalLikes>
      <CommentList>
        <Comment
          userId={photo.user.id}
          username={photo.user.username}
          payload={photo.caption}
        />
        <Link to={`/posts/${photo.id}`}>
          <TotalComments>
            View all {photo.totalComments}
            {photo.totalComments == 1 ? " comment" : " comments"}
          </TotalComments>
        </Link>
        {photo.comments?.map(
          (comment) =>
            comment && (
              <Comment
                userId={comment.user.id}
                username={comment.user.username}
                payload={comment.payload}
              />
            )
        )}
      </CommentList>
      <CreatedAt>
        {new Date(parseInt(photo.createdAt)).toLocaleDateString()}
      </CreatedAt>
      <CommentForm photoId={photo.id} />
    </Container>
  );
};

export default Feed;
