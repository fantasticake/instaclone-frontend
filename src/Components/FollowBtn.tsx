import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { follow, followVariables } from "../__generated__/follow";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { unfollow, unfollowVariables } from "../__generated__/unfollow";

const Button = styled.button`
  border: solid 2px ${(props) => props.theme.colors.faintLineColor};
  padding: 4px 8px;
  font-size: 14px;
`;

const FOLLOW_MUTATION = gql`
  mutation follow($userId: Int!) {
    follow(userId: $userId) {
      ok
      error
    }
  }
`;

const UNFOLLOW_MUTATION = gql`
  mutation unfollow($userId: Int!) {
    unfollow(userId: $userId) {
      ok
      error
    }
  }
`;

const FollowBtn = ({
  userId,
  isFollowing,
}: {
  userId: number;
  isFollowing: boolean;
}) => {
  const updateMutationFollow: MutationUpdaterFunction<
    follow,
    followVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.follow.ok) {
      cache.modify({
        id: `User:${userId}`,
        fields: {
          isFollowing(prev) {
            return !prev;
          },
          totalFollowers(prev) {
            return prev + 1;
          },
        },
      });
      cache.evict({ id: "ROOT_QUERY", fieldName: "seeFeed" });
    }
  };

  const updateMutationUnfollow: MutationUpdaterFunction<
    unfollow,
    unfollowVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.unfollow.ok) {
      cache.modify({
        id: `User:${userId}`,
        fields: {
          isFollowing(prev) {
            return !prev;
          },
          totalFollowers(prev) {
            return prev - 1;
          },
        },
      });
      cache.evict({ id: "ROOT_QUERY", fieldName: "seeFeed" });
    }
  };

  const [followMutation, { loading: loadingFollow }] = useMutation<
    follow,
    followVariables
  >(FOLLOW_MUTATION, { variables: { userId }, update: updateMutationFollow });
  const [unfollowMutation, { loading: loadingUnfollow }] = useMutation<
    unfollow,
    unfollowVariables
  >(UNFOLLOW_MUTATION, {
    variables: { userId },
    update: updateMutationUnfollow,
  });

  const onClick = () => {
    if (isFollowing && !loadingUnfollow) unfollowMutation();
    else if (!loadingFollow) followMutation();
  };

  return (
    <Button onClick={onClick}>
      {isFollowing ? <FontAwesomeIcon icon={faUserCheck} /> : "Follow"}
    </Button>
  );
};

export default FollowBtn;
