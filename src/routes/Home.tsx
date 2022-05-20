import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Header from "../Components/Header";
import { seeFeed } from "../__generated__/seeFeed";
import Feed from "../Components/Feed";

const Container = styled.div``;

const FeedList = styled.div`
  margin: 26px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
`;

const SEEFEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      url
      caption
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
  const { data } = useQuery<seeFeed>(SEEFEED_QUERY);
  return (
    <Container>
      <Header />
      {data && (
        <FeedList>
          {data.seeFeed?.map(
            (photo) => photo && <Feed key={photo.id} {...photo} />
          )}
        </FeedList>
      )}
    </Container>
  );
};

export default Home;
