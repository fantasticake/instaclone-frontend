import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useMe from "../../hooks/useMe";
import {
  deletePhoto,
  deletePhotoVariables,
} from "../../__generated__/deletePhoto";
import BasicModal from "./BasicModal";
import EditPhotoModal from "./EditPhotoModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: fit-content;
`;

const Button = styled.button`
  padding: 14px 0;
  border-bottom: solid 1px ${(props) => props.theme.colors.faintLineColor};
  font-size: 14px;
`;

const DeleteBtn = styled(Button)`
  color: tomato;
`;

const DELETE_PHOTO_MUTATION = gql`
  mutation deletePhoto($photoId: Int!) {
    deletePhoto(photoId: $photoId) {
      ok
      error
    }
  }
`;

const PhotoSettingModal = ({
  isOpen,
  setIsOpen,
  photoId,
  ownerId,
}: {
  isOpen: boolean;
  setIsOpen: any;
  photoId: number;
  ownerId: number;
}) => {
  const meData = useMe();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const updateMutation: MutationUpdaterFunction<
    deletePhoto,
    deletePhotoVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.deletePhoto.ok) {
      cache.evict({ id: `Photo:${photoId}` });
      onClose();
      navigate("/");
    }
  };

  const [deletePhotoMutation] = useMutation<deletePhoto, deletePhotoVariables>(
    DELETE_PHOTO_MUTATION,
    { variables: { photoId }, update: updateMutation }
  );

  return (
    <BasicModal
      contentElement={(props: any) => (
        <Container {...props}>
          <EditPhotoModal
            photoId={photoId}
            isOpen={isEditModalOpen}
            setIsOpen={setIsEditModalOpen}
          />
          {ownerId == meData?.seeMe?.id && (
            <DeleteBtn onClick={() => deletePhotoMutation()}>Delete</DeleteBtn>
          )}
          {ownerId == meData?.seeMe?.id && (
            <Button onClick={() => setIsEditModalOpen(true)}>Edit</Button>
          )}
          <Button onClick={() => navigate(`/posts/${photoId}`)}>
            Go to post
          </Button>
          <Button onClick={() => onClose()}>Cancel</Button>
        </Container>
      )}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default PhotoSettingModal;
