import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import Header from "../Components/Header";
import PhotoGrid from "../Components/PhotoGrid";
import {
  photoDetailWithComments,
  photoDetailWithCommentsVariables,
} from "../__generated__/photoDetailWithComments";
import {
  seePhotosByUser,
  seePhotosByUserVariables,
} from "../__generated__/seePhotosByUser";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
`;

const Content = styled.div`
  margin-top: 30px;
  width: 920px;
  max-width: 90%;
`;

const Detail = styled.div`
  display: flex;
  width: 100%;
  border: solid 2px ${(props) => props.theme.colors.faintLineColor};
  margin-bottom: 50px;
`;

const Photo = styled.img`
  width: 600px;
`;

const CommentBox = styled.div`
  padding: 16px 14px;
`;

const OwnerBox = styled.div`
  display: flex;
  gap: 12px;
`;

const AvatarContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 25px;
  overflow: hidden;
`;

const Comment = styled.div`
  margin-top: 2px;
`;

const Username = styled.span`
  margin-right: 5px;
  font-weight: 500;
`;

const Payload = styled.span``;

const PHOTO_DETAIL_QUERY = gql`
  query photoDetailWithComments($photoId: Int!) {
    photoDetail(photoId: $photoId) {
      id
      url
      caption
      user {
        id
        username
        avatar
      }
      totalLikes
      createdAt
    }
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

const SEE_PHOTOS_QUERY = gql`
  query seePhotosByUser($userId: Int!) {
    seePhotosByUser(userId: $userId) {
      id
      url
      totalLikes
      totalComments
    }
  }
`;

const Post = () => {
  const { id: photoId } = useParams();
  const [seePhotosQuery, { data: photosData }] = useLazyQuery<
    seePhotosByUser,
    seePhotosByUserVariables
  >(SEE_PHOTOS_QUERY);
  const { data } = useQuery<
    photoDetailWithComments,
    photoDetailWithCommentsVariables
  >(PHOTO_DETAIL_QUERY, {
    variables: { photoId: parseInt(photoId || "0") },
    onCompleted: (data) => {
      if (data.photoDetail?.user)
        seePhotosQuery({ variables: { userId: data.photoDetail?.user.id } });
    },
  });
  return (
    <Container>
      <Header />
      <Content>
        {data?.photoDetail && (
          <Detail>
            <Photo src={data?.photoDetail.url} />
            <CommentBox>
              <OwnerBox>
                <AvatarContainer>
                  <Avatar avatar={data.photoDetail.user.avatar} />
                </AvatarContainer>
                <Comment>
                  <Username>{data.photoDetail.user.username}</Username>
                  <Payload>{data.photoDetail.caption}</Payload>
                </Comment>
              </OwnerBox>
            </CommentBox>
          </Detail>
        )}
        {photosData?.seePhotosByUser && (
          <PhotoGrid photos={photosData.seePhotosByUser} />
        )}
      </Content>
    </Container>
  );
};

export default Post;
