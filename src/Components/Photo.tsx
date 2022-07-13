import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Link)`
  width: 100%;
  align-self: center;
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
  width: inherit;
  height: inherit;
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
}: {
  id: number;
  url: string;
  totalLikes: number;
  totalComments: number;
}) => {
  const [photoRatio, setPhotoRatio] = useState(1);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const [photoWidth, setPhotoWidth] = useState<number>(300);

  useEffect(() => {
    if (containerRef.current) {
      setPhotoWidth(containerRef.current.clientWidth);
      window.addEventListener("resize", () =>
        containerRef.current
          ? setPhotoWidth(containerRef.current.clientWidth)
          : null
      );
      return () => {
        window.removeEventListener("resize", () =>
          containerRef.current
            ? setPhotoWidth(containerRef.current.clientWidth)
            : null
        );
      };
    }
  });

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
    <Container
      ref={containerRef}
      to={`/posts/${id}`}
      style={{ height: photoWidth * photoRatio }}
    >
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
