import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 100%;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Avatar = ({ avatar }: { avatar: any }) => {
  return (
    <Container>
      {avatar && typeof avatar == "string" ? (
        <Img src={avatar} />
      ) : (
        <FontAwesomeIcon
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          icon={faUserCircle}
        />
      )}
    </Container>
  );
};

export default Avatar;
