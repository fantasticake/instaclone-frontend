import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import Header from "../Components/Header";
import PhotoGrid from "../Components/PhotoGrid";
import useMe from "../hooks/useMe";
import { formatNumber } from "../utils";
import {
  seeProfileWithPhotos,
  seeProfileWithPhotosVariables,
} from "../__generated__/seeProfileWithPhotos";

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
  width: 920px;
  max-width: 90%;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0 46px 0;
  width: 780px;
  max-width: 90%;
`;

const AvatarContainer = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  overflow: hidden;
  margin-right: 100px;
  font-size: 150px;
`;

const InfoBox = styled.div``;

const ControlBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Username = styled.span`
  font-size: 26px;
  font-weight: 300;
  opacity: 0.8;
  margin-right: 10px;
`;

const Button = styled.button`
  border: solid 2px ${(props) => props.theme.colors.faintLineColor};
  padding: 4px 8px;
  font-size: 14px;
`;

const EditBtn = styled(Button)``;

const MessageBtn = styled(Button)``;

const FollowBtn = styled(Button)``;

const TotalBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 30px;
`;

const TotalPosts = styled.span``;

const TotalFollowers = styled.span``;

const TotalFollowing = styled.span``;

const SEE_PROFILE_QUERY = gql`
  query seeProfileWithPhotos($userId: Int!) {
    seeProfile(userId: $userId) {
      id
      username
      avatar
      totalPosts
      totalFollowing
      totalFollowers
    }
    seePhotosByUser(userId: $userId) {
      id
      url
      totalLikes
      totalComments
    }
  }
`;

const Profile = () => {
  const meData = useMe();
  const { id } = useParams();
  const { data } = useQuery<
    seeProfileWithPhotos,
    seeProfileWithPhotosVariables
  >(SEE_PROFILE_QUERY, {
    variables: { userId: parseInt(id || "0") },
  });
  return data ? (
    <Container>
      <Header />
      <Content>
        <UserBox>
          <AvatarContainer>
            {<Avatar avatar={data?.seeProfile?.avatar} />}
          </AvatarContainer>
          <InfoBox>
            <ControlBox>
              <Username>{data?.seeProfile?.username}</Username>
              {meData?.seeMe?.id == id && <EditBtn>Edit Profile</EditBtn>}
              {meData?.seeMe?.id != id && <MessageBtn>Message</MessageBtn>}
              {meData?.seeMe?.id != id && <FollowBtn>Follow</FollowBtn>}
            </ControlBox>
            <TotalBox>
              <TotalPosts>
                {formatNumber(data?.seeProfile?.totalPosts, "post")}
              </TotalPosts>
              <TotalFollowers>
                {formatNumber(data?.seeProfile?.totalFollowers, "follower")}
              </TotalFollowers>
              <TotalFollowing>
                {data?.seeProfile?.totalFollowing} following
              </TotalFollowing>
            </TotalBox>
          </InfoBox>
        </UserBox>
        {data.seePhotosByUser && <PhotoGrid photos={data.seePhotosByUser} />}
      </Content>
    </Container>
  ) : null;
};

export default Profile;
