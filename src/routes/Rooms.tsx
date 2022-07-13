import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { seeRooms } from "../__generated__/seeRooms";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Header from "../Components/Header";
import useMe from "../hooks/useMe";
import Avatar from "../Components/Avatar";
import { useEffect, useState } from "react";
import Room from "../Components/Room";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  height: 760px;
  width: 920px;
  max-width: 90%;
  margin-top: 20px;
  border: solid 1px ${(props) => props.theme.colors.faintLineColor};
`;

const RoomList = styled.div`
  width: 20%;
  @media (min-width: 700px) {
    width: 35%;
  }
  overflow: auto;
  border-right: solid 1px ${(props) => props.theme.colors.faintLineColor};
  ::-webkit-scrollbar {
    display: none;
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  margin-bottom: 10px;
  border-bottom: solid 1px ${(props) => props.theme.colors.faintLineColor};
`;

const Username = styled.span``;

const RoomListElement = styled.button<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  @media (min-width: 700px) {
    flex-direction: row;
  }
  gap: 10px;
  width: 100%;
  padding: 8px 18px;
  align-items: center;
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.faintLineColor
      : props.theme.colors.backgroundColor};
  :hover {
    background-color: ${(props) =>
      props.isSelected
        ? props.theme.colors.faintLineColor
        : props.theme.colors.blurryBackgroundColor};
  }
`;

const AvatarContainer = styled.div`
  width: 50px;
  height: 50px;
  font-size: 50px;
  border-radius: 25px;
  overflow: hidden;
`;

const RoomUsername = styled.span``;

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 80%;
  @media (min-width: 700px) {
    width: 65%;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px ${(props) => props.theme.colors.textColor};
  width: 90px;
  height: 90px;
  border-radius: 45px;
  font-size: 40px;
`;

const MainText = styled.span`
  font-size: 22px;
  opacity: 0.6;
`;

const SubText = styled.span`
  opacity: 0.6;
  font-size: 14px;
`;

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      id
      users {
        id
        username
        avatar
      }
      totalUnread
    }
  }
`;

const Rooms = () => {
  const meData = useMe();
  const { data } = useQuery<seeRooms>(SEE_ROOMS_QUERY);
  const [selectedRoomId, setSelectedRoomId] = useState<number | undefined>();
  const location: { state: any } = useLocation();

  useEffect(() => {
    if (location.state && location.state.roomId) {
      setSelectedRoomId(location.state.roomId);
    }
  }, [location, setSelectedRoomId]);

  return (
    <Container>
      <Header />
      <Content>
        <RoomList>
          <UserBox>
            <Username>{meData?.seeMe?.username}</Username>
          </UserBox>
          {data?.seeRooms
            ?.slice()
            .reverse()
            .map((room) => {
              if (room?.users) {
                const roomUser = room.users.find(
                  (user) => user?.id != meData?.seeMe?.id
                );
                return (
                  <RoomListElement
                    key={room.id}
                    isSelected={room.id == selectedRoomId}
                    onClick={() => setSelectedRoomId(room.id)}
                  >
                    <AvatarContainer>
                      <Avatar avatar={roomUser?.avatar} />
                    </AvatarContainer>
                    <RoomUsername>{roomUser?.username}</RoomUsername>
                  </RoomListElement>
                );
              }
            })}
        </RoomList>
        {selectedRoomId ? (
          <RoomContainer>
            <Room roomId={selectedRoomId} />
          </RoomContainer>
        ) : (
          <RoomContainer>
            <IconContainer>
              <FontAwesomeIcon icon={faPaperPlane} />
            </IconContainer>
            <MainText>Your Messages</MainText>
            <SubText>
              Send private photos and messages to a friend or group.
            </SubText>
          </RoomContainer>
        )}
      </Content>
    </Container>
  );
};

export default Rooms;
