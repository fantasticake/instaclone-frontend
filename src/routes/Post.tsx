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
import SendMessageBtn from "../Components/SendMessageBtn";
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
  flex-direction: column;
  width: 100%;
  @media (min-width: 700px) {
    flex-direction: row;
    justify-content: center;
    height: calc(86vh - var(--header-height));
  }
  margin-bottom: 50px;
`;

const Photo = styled.img`
  @media (min-width: 700px) {
    height: calc(86vh - var(--header-height));
    max-width: 65%;
  }
  object-fit: contain;
  object-position: right;
`;

const CommentBox = styled.div`
  display: grid;
  @media (min-width: 700px) {
    width: 35%;
    grid-template-rows: 60px 1fr 160px;
  }
  border: solid 2px ${(props) => props.theme.colors.faintLineColor};
`;

const OwnerBox = styled.div`
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
  font-size: 32px;
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
  height: auto;
  max-height: 450px;
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
  width: 50%;
`;

const Caption = styled.span``;

const Payload = styled.span``;

const ControlBox = styled.div`
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160px;
  width: 100%;
  border-top: solid 2px ${(props) => props.theme.colors.faintLineColor};
  border-bottom: solid 2px ${(props) => props.theme.colors.faintLineColor};
  box-sizing: border-box;
`;

const PaddingBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 14px;
`;

const ButtonBox = styled.div`
  display: flex;
`;

const Button = styled.button`
  font-size: 22px;
`;

const CommentBtn = styled(Button)``;

const DmBtnContainer = styled.div`
  font-size: 22px;
`;

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
      {data?.photoDetail && (
        <PhotoSettingModal
          ownerId={data?.photoDetail?.user.id}
          photoId={parseInt(photoId || "0")}
          isOpen={isOpenSetting}
          setIsOpen={setIsOpenSetting}
        />
      )}
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
                {data.photoDetail.caption && (
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
                )}
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
                    <DmBtnContainer>
                      <SendMessageBtn userId={data.photoDetail.user.id}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </SendMessageBtn>
                    </DmBtnContainer>
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
            <PhotoGrid
              photos={photosData.seePhotosByUser.filter(
                (photo) => photo?.id + "" !== photoId
              )}
            />
          </PhotoBox>
        )}
      </Content>
    </Container>
  );
};

export default Post;
