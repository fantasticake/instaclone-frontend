import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useMe from "../hooks/useMe";
import {
  createMessage,
  createMessageVariables,
} from "../__generated__/createMessage";
import {
  roomUpdated,
  roomUpdatedVariables,
} from "../__generated__/roomUpdated";
import { seeRoom, seeRoomVariables } from "../__generated__/seeRoom";
import {
  seeRoomWithMessages,
  seeRoomWithMessagesVariables,
} from "../__generated__/seeRoomWithMessages";
import Avatar from "./Avatar";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 40px;
  border-bottom: solid 1px ${(props) => props.theme.colors.faintLineColor};
`;

const AvatarContainer = styled.div`
  width: 30px;
  height: 30px;
  font-size: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin-right: 10px;
`;

const Username = styled.span``;

const MessageList = styled.div`
  padding: 10px 0;
  height: 620px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MessageBox = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isMine ? "row-reverse" : "row")};
  padding: 10px;
`;

const MessageAvatarContainer = styled(Link)`
  width: 30px;
  height: 30px;
  font-size: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin: 0 10px;
`;

const MessageColumn = styled.div``;

const Payload = styled.div`
  margin-top: 4px;
  border: solid 2px ${(props) => props.theme.colors.faintLineColor};
  border-radius: 10px;
  padding: 10px;
  max-width: 400px;
  word-wrap: break-word;
`;

const InputContainer = styled.form`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
`;

const Input = styled.input`
  height: 38px;
  width: 500px;
  max-width: 90%;
  border-radius: 15px;
  padding: 0 70px 0 16px;
`;

const SendBtn = styled.button`
  position: absolute;
  right: 10%;
  color: ${(props) => props.theme.colors.blue};
`;

const SEE_ROOM_WITH_MESSAGES_QUERY = gql`
  query seeRoomWithMessages($roomId: Int!) {
    seeRoom(roomId: $roomId) {
      id
      users {
        id
        username
        avatar
      }
    }
    seeMessages(roomId: $roomId) {
      id
      payload
      user {
        id
        avatar
      }
      createdAt
    }
  }
`;

const ROOM_UPDATED_SUBSCRIPTION = gql`
  subscription roomUpdated($roomId: Int!) {
    roomUpdated(roomId: $roomId) {
      id
      payload
      user {
        id
        avatar
      }
      createdAt
    }
  }
`;

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($roomId: Int, $userId: Int, $payload: String!) {
    createMessage(roomId: $roomId, userId: $userId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

interface Inputs {
  payload: string;
}

const Room = ({ roomId }: { roomId: number }) => {
  const meData = useMe();
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();
  const { data, subscribeToMore } = useQuery<
    seeRoomWithMessages,
    seeRoomWithMessagesVariables
  >(SEE_ROOM_WITH_MESSAGES_QUERY, {
    variables: { roomId },
  });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const MessageListRef = useRef<any>();

  const updateMutation: MutationUpdaterFunction<
    createMessage,
    createMessageVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.createMessage.ok) {
      const message = {
        __typename: "Message",
        id: data.createMessage.id,
        payload: getValues("payload"),
        user: {
          ...meData?.seeMe,
        },
        createdAt: Date.now() + "",
      };
      const messageFragment = cache.writeFragment({
        id: `Message:${data.createMessage.id}`,
        data: message,
        fragment: gql`
          fragment newMessage on Message {
            __typename
            id
            payload
            user {
              id
              username
              avatar
            }
            createdAt
          }
        `,
      });
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeMessages(prev, { storeFieldName }) {
            if (storeFieldName == `seeMessages({"roomId":${roomId}})`) {
              return [messageFragment, ...prev];
            }
            return prev;
          },
        },
      });
      setValue("payload", "");
    }
  };

  const [createMessageMutation, { loading }] = useMutation<
    createMessage,
    createMessageVariables
  >(CREATE_MESSAGE_MUTATION, { update: updateMutation });

  const onValid: SubmitHandler<Inputs> = ({ payload }) => {
    if (!loading) {
      createMessageMutation({
        variables: { roomId, payload },
      });
    }
  };

  const roomUser =
    data?.seeRoom &&
    data.seeRoom.users &&
    data.seeRoom.users.find((user) => user?.id != meData?.seeMe?.id);

  useEffect(() => {
    if (!isSubscribed) {
      subscribeToMore<roomUpdated, roomUpdatedVariables>({
        document: ROOM_UPDATED_SUBSCRIPTION,
        variables: { roomId },
        updateQuery: (prev, { subscriptionData }) => {
          if (subscriptionData.data && prev.seeMessages) {
            return {
              ...prev,
              seeMessages: [
                subscriptionData.data.roomUpdated,
                ...prev.seeMessages,
              ],
            };
          }
          return prev;
        },
      });
      setIsSubscribed(true);
    }
  }, [isSubscribed, subscribeToMore, roomId]);

  useEffect(() => {
    if (MessageListRef.current) {
      MessageListRef.current.scrollTo({
        top: MessageListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [data]);

  return data?.seeRoom ? (
    <Container>
      <UserBox>
        <Link to={`/users/${roomUser?.id}`}>
          <AvatarContainer>
            <Avatar avatar={roomUser?.avatar} />
          </AvatarContainer>
        </Link>
        <Link to={`/users/${roomUser?.id}`}>
          <Username>{roomUser?.username}</Username>
        </Link>
      </UserBox>
      <MessageList ref={MessageListRef}>
        {data.seeMessages
          ?.slice()
          .reverse()
          .map(
            (message) =>
              meData?.seeMe && (
                <MessageBox
                  isMine={message?.user.id == meData?.seeMe.id}
                  key={message?.id}
                >
                  <MessageAvatarContainer to={`/users/${message?.user.id}`}>
                    <Avatar avatar={message?.user.avatar} />
                  </MessageAvatarContainer>
                  <MessageColumn>
                    <Payload>{message?.payload}</Payload>
                  </MessageColumn>
                </MessageBox>
              )
          )}
      </MessageList>
      <InputContainer onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("payload", { required: true })}
          placeholder="Message..."
        />
        <SendBtn onClick={handleSubmit(onValid)}>Send</SendBtn>
      </InputContainer>
    </Container>
  ) : (
    <></>
  );
};

export default Room;
