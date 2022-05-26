import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import CommentForm from "../Components/CommentForm";
import Header from "../Components/Header";
import LikeBtn from "../Components/LikeBtn";
import PhotoSettingModal from "../Components/modals/PhotoSettingModal";
import PhotoGrid from "../Components/PhotoGrid";
import { formatDate, formatNumber, getIsScrollEnd } from "../utils";
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 920px;
  max-width: 90%;
`;

const Detail = styled.div`
  display: flex;
  height: 600px;
  margin-bottom: 50px;
`;

const Photo = styled.img`
  height: 100%;
  max-width: 60%;
  object-fit: contain;
  object-position: top right;
`;

const CommentBox = styled.div`
  width: 360px;
  border: solid 2px ${(props) => props.theme.colors.faintLineColor};
`;

const OwnerBox = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 16px;
  border-bottom: solid 1px ${(props) => props.theme.colors.faintLineColor};
`;

const OwnerInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled(Link)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 16px;
  overflow: hidden;
`;

const Username = styled(Link)`
  margin-right: 5px;
  font-weight: 500;
`;

const SettingBtn = styled.button``;

const CommentList = styled.div`
  height: 380px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  padding: 16px;
  word-wrap: break-word;
`;

const Comment = styled.div`
  margin-top: 2px;
  width: 280px;
`;

const Caption = styled.span``;

const Payload = styled.span``;

const ControlBox = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160px;
  width: 356px;
  border-top: solid 2px ${(props) => props.theme.colors.faintLineColor};
  box-sizing: border-box;
`;

const PaddingBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 14px;
`;

const ButtonBox = styled.div``;

const Button = styled.button`
  font-size: 22px;
`;

const CommentBtn = styled(Button)``;

const DmBtn = styled(Button)``;

const TotalLikes = styled.span`
  font-weight: 500;
  margin-top: 12px;
`;

const CreatedAt = styled.span`
  font-size: 12px;
  margin-top: 10px;
`;

const PhotoBox = styled.div`
  width: 100%;
`;

const PHOTO_DETAIL_QUERY = gql`
  query photoDetailWithComments($photoId: Int!, $offset: Int) {
    photoDetail(photoId: $photoId) {
      id
      url
      caption
      isLiked
      user {
        id
        username
        avatar
      }
      totalLikes
      createdAt
    }
    seeComments(photoId: $photoId, offset: $offset) {
      id
      payload
      user {
        id
        avatar
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
  const [moreLoadingComments, setMoreLoadingComments] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  const [seePhotosQuery, { data: photosData }] = useLazyQuery<
    seePhotosByUser,
    seePhotosByUserVariables
  >(SEE_PHOTOS_QUERY);

  const { data, fetchMore: fetchMoreComments } = useQuery<
    photoDetailWithComments,
    photoDetailWithCommentsVariables
  >(PHOTO_DETAIL_QUERY, {
    variables: { photoId: parseInt(photoId || "0") },
    onCompleted: (data) => {
      setMoreLoadingComments(false);
      if (data.photoDetail?.user)
        seePhotosQuery({ variables: { userId: data.photoDetail?.user.id } });
    },
  });

  const onScrollComments = (e: any) => {
    if (getIsScrollEnd(e) && !moreLoadingComments && data?.seeComments) {
      setMoreLoadingComments(true);
      fetchMoreComments({ variables: { offset: data?.seeComments.length } });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [photoId]);

  return (
    <Container>
      <PhotoSettingModal
        photoId={parseInt(photoId || "0")}
        isOpen={isOpenSetting}
        setIsOpen={setIsOpenSetting}
      />
      <Header />
      <Content>
        {data?.photoDetail && (
          <Detail>
            <Photo src={data?.photoDetail.url} />
            <CommentBox>
              <OwnerBox>
                <OwnerInfoBox>
                  <AvatarContainer to={`/users/${data.photoDetail.user.id}`}>
                    <Avatar avatar={data.photoDetail.user.avatar} />
                  </AvatarContainer>
                  <Username to={`/users/${data.photoDetail.user.id}`}>
                    {data.photoDetail.user.username}
                  </Username>
                </OwnerInfoBox>
                <SettingBtn onClick={() => setIsOpenSetting(true)}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </SettingBtn>
              </OwnerBox>
              <CommentList onScroll={onScrollComments}>
                <CommentContainer>
                  <AvatarContainer to={`/users/${data.photoDetail.user.id}`}>
                    <Avatar avatar={data.photoDetail.user.avatar} />
                  </AvatarContainer>
                  <Comment>
                    <Username to={`/users/${data.photoDetail.user.id}`}>
                      {data.photoDetail.user.username}
                    </Username>
                    <Caption>{data.photoDetail.caption}</Caption>
                  </Comment>
                </CommentContainer>
                {data.seeComments?.map((comment) => (
                  <CommentContainer key={comment?.id}>
                    <AvatarContainer to={`/users/${comment?.user.id}`}>
                      <Avatar avatar={comment?.user.avatar} />
                    </AvatarContainer>
                    <Comment>
                      <Username to={`/users/${comment?.user.id}`}>
                        {comment?.user.username}
                      </Username>
                      <Payload>{comment?.payload}</Payload>
                    </Comment>
                  </CommentContainer>
                ))}
              </CommentList>
              <ControlBox>
                <PaddingBox>
                  <ButtonBox>
                    <LikeBtn
                      photoId={data.photoDetail.id}
                      isLiked={data.photoDetail.isLiked}
                    />
                    <CommentBtn>
                      <FontAwesomeIcon icon={faComment} />
                    </CommentBtn>
                    <DmBtn>
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </DmBtn>
                  </ButtonBox>
                  <TotalLikes>
                    {formatNumber(data.photoDetail.totalLikes, "like")}
                  </TotalLikes>
                  <CreatedAt>
                    {formatDate(data.photoDetail.createdAt)}
                  </CreatedAt>
                </PaddingBox>
                <CommentForm photoId={data.photoDetail.id} />
              </ControlBox>
            </CommentBox>
          </Detail>
        )}
        {photosData?.seePhotosByUser && (
          <PhotoBox>
            <PhotoGrid photos={photosData.seePhotosByUser} />
          </PhotoBox>
        )}
      </Content>
    </Container>
  );
};

export default Post;
