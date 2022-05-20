import { gql, useMutation, useQuery } from "@apollo/client";
import {
  faComment,
  faHeart,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useMe from "../hooks/useMe";
import {
  createComment,
  createCommentVariables,
} from "../__generated__/createComment";
import {
  seeComments,
  seeCommentsVariables,
} from "../__generated__/seeComments";
import { seeFeed_seeFeed } from "../__generated__/seeFeed";

const FeedContainer = styled.div`
  width: 500px;
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

const Avatar = styled.img`
  height: 26px;
  width: 26px;
  border-radius: 15px;
  object-fit: cover;
  margin-right: 18px;
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

const LikeBtn = styled.button``;

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

const CommentContainer = styled.div`
  margin-bottom: 8px;
`;

const CommentUsername = styled.span`
  font-weight: 500;
  margin-right: 10px;
`;

const CommentPayload = styled.span``;

const CreatedAt = styled.span`
  display: block;
  padding: 0 14px;
  opacity: 0.6;
  margin-bottom: 24px;
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 46px;
  border-top: solid 1px ${(props) => props.theme.colors.faintLineColor};
`;

const CommentInput = styled.input`
  border: none;
  height: 100%;
  width: 100%;
`;

const CommentSubmit = styled.button`
  color: ${(props) => props.theme.colors.blue};
  ${(props) => (props.disabled ? "opacity: 0.4;" : null)}
  ${(props) => (props.disabled ? "cursor: default;" : null)}
`;

const SEE_COMMENTS_QUERY = gql`
  query seeComments($photoId: Int!) {
    seeComments(photoId: $photoId) {
      id
      payload
      user {
        id
        username
      }
      photo {
        id
      }
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

interface Inputs {
  payload: string;
}

const Feed = (photo: seeFeed_seeFeed) => {
  const meData = useMe();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const { data } = useQuery<seeComments, seeCommentsVariables>(
    SEE_COMMENTS_QUERY,
    { variables: { photoId: photo.id } }
  );

  const [createCommentMutation, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION);

  const onValid: SubmitHandler<Inputs> = async ({ payload }) => {
    if (!loading) {
      setValue("payload", "");
      await createCommentMutation({
        variables: { photoId: photo.id, payload },
        update: (cache, { data }) => {
          if (data?.createComment && meData?.seeMe) {
            const { id: commentId } = data.createComment;
            const newComment = {
              __typename: "Comment",
              id: commentId,
              payload,
              user: {
                ...meData.seeMe,
              },
              photo: {
                ...photo,
              },
            };
            const newCommentFragment = cache.writeFragment({
              data: newComment,
              fragment: gql`
                fragment NewComment on Comment {
                  __typename
                  id
                  payload
                  user {
                    id
                    username
                  }
                  photo {
                    id
                  }
                }
              `,
            });
            cache.modify({
              id: "ROOT_QUERY",
              fields: {
                seeComments: (prev, { storeFieldName }) => {
                  if (`seeComments({"photoId":${photo.id}})` == storeFieldName)
                    return [...prev, newCommentFragment];
                  return prev;
                },
              },
            });
          }
        },
      });
    }
  };

  return (
    <FeedContainer>
      <UserBox>
        {photo.user.avatar ? (
          <Link to={`/users/${photo.user.id}`}>
            <Avatar src={photo.user.avatar} />
          </Link>
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
        <Link to={`/users/${photo.user.id}`}>
          <Username>{photo.user.username}</Username>
        </Link>
      </UserBox>
      <Link to={`/photos/${photo.id}`}>
        <Photo src={photo.url} />
      </Link>
      <ControlBox>
        <LikeBtn>
          <FontAwesomeIcon icon={faHeart} />
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
        {photo.totalLikes == 1 ? " Like" : " Likes"}
      </TotalLikes>
      {data && (
        <CommentList>
          <CommentContainer>
            <CommentUsername>{photo.user.username}</CommentUsername>
            <CommentPayload>{photo.caption}</CommentPayload>
          </CommentContainer>
          <TotalComments>
            View all {photo.totalComments}
            {photo.totalComments == 1 ? " comment" : " comments"}
          </TotalComments>
          {data.seeComments?.map((comment) => (
            <CommentContainer key={comment?.id}>
              <CommentUsername>{comment?.user.username}</CommentUsername>
              <CommentPayload>{comment?.payload}</CommentPayload>
            </CommentContainer>
          ))}
        </CommentList>
      )}
      <CreatedAt>
        {new Date(parseInt(photo.createdAt)).toLocaleDateString()}
      </CreatedAt>
      <CommentForm onSubmit={handleSubmit(onValid)}>
        <CommentInput
          {...register("payload", { required: true })}
          placeholder="Add a comment..."
        />
        <CommentSubmit onClick={handleSubmit(onValid)} disabled={!isValid}>
          Post
        </CommentSubmit>
      </CommentForm>
    </FeedContainer>
  );
};

export default Feed;
