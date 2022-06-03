import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Header from "../Components/Header";
import { seeFeed, seeFeedVariables } from "../__generated__/seeFeed";
import Feed from "../Components/Feed";
import { useState } from "react";
import { getIsScrollEnd } from "../utils";
import Loading from "../Components/Loading";

const Container = styled.div`
  height: 100vh;
  overflow-y: auto;
`;

const FeedList = styled.div`
  margin: 26px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
`;

const SEEFEED_QUERY = gql`
  query seeFeed($offset: Int) {
    seeFeed(offset: $offset) {
      id
      url
      caption
      isLiked
      totalLikes
      totalComments
      createdAt
      user {
        id
        username
        avatar
      }
    }
  }
`;

const Home = () => {
  const [moreLoading, setMoreLoading] = useState(false);
  const { data, fetchMore, loading } = useQuery<seeFeed, seeFeedVariables>(
    SEEFEED_QUERY,
    { onCompleted: () => setMoreLoading(false) }
  );

  const onScroll = (e: any) => {
    if (getIsScrollEnd(e) && !moreLoading) {
      setMoreLoading(true);
      fetchMore({
        variables: { offset: data?.seeFeed?.length },
      });
    }
  };

  return (
    <Container onScroll={onScroll}>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        data && (
          <FeedList>
            {data.seeFeed?.map(
              (photo) => photo && <Feed key={photo.id} {...photo} />
            )}
          </FeedList>
        )
      )}
    </Container>
  );
};

export default Home;
