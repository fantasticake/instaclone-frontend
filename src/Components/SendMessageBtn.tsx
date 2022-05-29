import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useMe from "../hooks/useMe";
import { createRoom, createRoomVariables } from "../__generated__/createRoom";
import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";

const Button = styled.button`
  margin: 0;
  padding: 0;
  font-size: 100%;
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($userId: Int!) {
    seeProfile(userId: $userId) {
      id
      username
      avatar
    }
  }
`;

const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($userId: Int!) {
    createRoom(userId: $userId) {
      ok
      id
      error
    }
  }
`;

const SendMessageBtn = ({
  userId,
  children,
}: {
  userId: number;
  children?: any;
}) => {
  const meData = useMe();
  const navigate = useNavigate();

  const { data: userData } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: { userId },
    }
  );

  const [createRoomMutation, { loading }] = useMutation<
    createRoom,
    createRoomVariables
  >(CREATE_ROOM_MUTATION);

  const updateMutation: MutationUpdaterFunction<
    createRoom,
    createRoomVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (!data?.createRoom.ok && data?.createRoom.id) {
      navigate("/rooms", { state: { roomId: data.createRoom.id } });
    }
    if (data?.createRoom.ok) {
      const room = {
        __typename: "Room",
        id: data.createRoom.id,
        users: [{ ...userData?.seeProfile }, { ...meData?.seeMe }],
        totalUnread: 0,
      };

      const roomFragment = cache.writeFragment({
        id: `Room:${data.createRoom.id}`,
        data: room,
        fragment: gql`
          fragment newRoom on Room {
            __typename
            id
            users {
              id
              avatar
              username
            }
            totalUnread
          }
        `,
      });

      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeRooms(prev) {
            return [...prev, roomFragment];
          },
        },
      });

      navigate("/rooms", { state: { roomId: data.createRoom.id } });
    }
  };

  const onMessageBtn = () => {
    if (!loading) {
      createRoomMutation({
        variables: { userId },
        update: updateMutation,
      });
    }
  };

  return <Button onClick={onMessageBtn}>{children}</Button>;
};
export default SendMessageBtn;
