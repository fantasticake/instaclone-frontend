import styled from "styled-components";
import { seeProfileWithPhotos_seePhotosByUser } from "../__generated__/seeProfileWithPhotos";
import Photo from "./Photo";

const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  border-top: solid 1px ${(props) => props.theme.colors.faintLineColor};
  padding-top: 46px;
  margin-bottom: 20px;
`;

const PhotoGrid = ({
  photos,
}: {
  photos: (seeProfileWithPhotos_seePhotosByUser | null)[];
}) => {
  return (
    <Container>
      {photos.map((photo) => photo && <Photo key={photo.id} {...photo} />)}
    </Container>
  );
};

export default PhotoGrid;
