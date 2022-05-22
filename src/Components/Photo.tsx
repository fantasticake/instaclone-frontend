import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { seeProfile_seeProfile_photos } from "../__generated__/seeProfile";

const Container = styled(Link)`
  width: 100%;
  position: relative;
  :hover {
    img {
      opacity: 0.6;
    }
    div {
      opacity: 1;
    }
  }
  border-radius: 6px;
  overflow: hidden;
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
`;

const TotalBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  position: absolute;
  top: 50%;
  bottom: 50%;
  left: 50%;
  right: 50%;
  opacity: 0;
  background-color: transparent;
  font-size: 18px;
  font-weight: 700;
`;

const TotalLikes = styled.span`
  display: flex;
  gap: 6px;
`;

const TotalComments = styled.span`
  display: flex;
  gap: 6px;
`;

const Photo = ({
  id,
  url,
  totalLikes,
  totalComments,
}: seeProfile_seeProfile_photos) => {
  const [photoRatio, setPhotoRatio] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.addEventListener("load", () => {
      setPhotoRatio(img.height / img.width);
      setLoading(false);
    });
    return () => {
      img.removeEventListener("load", () => {
        setPhotoRatio(img.height / img.width);
        setLoading(false);
      });
    };
  }, [url]);
  return loading ? null : (
    <Container to={`/posts/${id}`} style={{ height: 300 * photoRatio }}>
      <Img src={url} />
      <TotalBox>
        <TotalLikes>
          <FontAwesomeIcon
            style={{ backgroundColor: "transparent" }}
            icon={faHeart}
          />
          <span>{totalLikes}</span>
        </TotalLikes>
        <TotalComments>
          {" "}
          <FontAwesomeIcon
            style={{ backgroundColor: "transparent" }}
            icon={faComment}
          />
          <span>{totalComments}</span>
        </TotalComments>
      </TotalBox>
    </Container>
  );
};

export default Photo;
