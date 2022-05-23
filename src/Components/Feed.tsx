import { gql, useQuery } from "@apollo/client";
import { faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatNumber } from "../utils";
import {
  seeComments,
  seeCommentsVariables,
} from "../__generated__/seeComments";
import { seeFeed_seeFeed } from "../__generated__/seeFeed";
import Avatar from "./Avatar";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import LikeBtn from "./LikeBtn";

const Container = styled.div`
  width: 400px;
  max-width: 90%;
  border: solid 2px ${(props) => props.theme.colors.faintLineColor};
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

const Button = styled.button`
  :hover {
    opacity: 0.7;
  }
`;

const CommentBtn = styled(Button)``;

const DmBtn = styled(Button)``;

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

const SEE_COMMENTS_QUERY = gql`
  query seeComments($photoId: Int!) {
    seeComments(photoId: $photoId) {
      id
      payload
      user {
        id
        username
      }
    }
  }
`;

const Feed = (photo: seeFeed_seeFeed) => {
  const { data } = useQuery<seeComments, seeCommentsVariables>(
    SEE_COMMENTS_QUERY,
    { variables: { photoId: photo.id } }
  );
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
        <LikeBtn photoId={photo.id} isLiked={photo.isLiked} />
        <Link to={`/posts/${photo.id}`}>
          <CommentBtn>
            <FontAwesomeIcon icon={faComment} />
          </CommentBtn>
        </Link>
        <DmBtn>
          <FontAwesomeIcon icon={faPaperPlane} />
        </DmBtn>
      </ControlBox>
      <TotalLikes>{formatNumber(photo.totalLikes, "like")}</TotalLikes>
      <CommentList>
        <Comment
          userId={photo.user.id}
          username={photo.user.username}
          payload={photo.caption}
        />
        <Link to={`/posts/${photo.id}`}>
          <TotalComments>
            View all {formatNumber(photo.totalComments, "comment")}
          </TotalComments>
        </Link>
        {data?.seeComments?.map(
          (comment) =>
            comment && (
              <Comment
                key={comment.id}
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
