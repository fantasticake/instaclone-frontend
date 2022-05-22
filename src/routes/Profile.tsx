import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import Header from "../Components/Header";
import Photo from "../Components/Photo";
import useMe from "../hooks/useMe";
import { formatNumber } from "../utils";
import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
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

const PostList = styled.div`
  width: 920px;
  max-width: 90%;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: solid 1px ${(props) => props.theme.colors.faintLineColor};
  padding-top: 46px;
  margin-bottom: 10px;
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($userId: Int!) {
    seeProfile(userId: $userId) {
      id
      username
      avatar
      totalPosts
      totalFollowing
      totalFollowers
      photos {
        id
        url
        totalLikes
        totalComments
      }
    }
  }
`;

const Profile = () => {
  const meData = useMe();
  const { id } = useParams();
  const { data } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    { variables: { userId: parseInt(id || "0") } }
  );
  return data ? (
    <Container>
      <Header />
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
      <PostList>
        {data?.seeProfile?.photos?.map(
          (photo) => photo && <Photo key={photo.id} {...photo} />
        )}
      </PostList>
    </Container>
  ) : null;
};

export default Profile;
