import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 8px;
  word-wrap: break-word;
`;

const Username = styled(Link)`
  font-weight: 500;
  margin-right: 6px;
  :hover {
    text-decoration: underline;
  }
`;

const Payload = styled.span``;

const Comment = (comment: {
  userId: number;
  username: string;
  payload: string;
}) => {
  return (
    <Container>
      <Username to={`/users/${comment.userId}`}>{comment.username}</Username>
      <Payload>{comment.payload}</Payload>
    </Container>
  );
};

export default Comment;
