import styled from "styled-components";
import useMe from "../../hooks/useMe";
import Avatar from "../Avatar";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BasicModal from "./BasicModal";
import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
  useQuery,
} from "@apollo/client";
import { editPhoto, editPhotoVariables } from "../../__generated__/editPhoto";
import {
  photoDetail,
  photoDetailVariables,
} from "../../__generated__/photoDetail";

const Container = styled.div`
  width: 90%;
  max-width: 760px;
  height: 460px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 10px;
  border-bottom: solid 1px ${(props) => props.theme.colors.faintLineColor};
  height: 50px;
  font-size: 16px;
`;

const CancelBtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CancelBtn = styled.button`
  font-size: 14px;
  opacity: 0.7;
`;

const HeaderTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DoneBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DoneBtn = styled.button`
  font-size: 14px;
  color: ${(props) => props.theme.colors.blue};
`;

const FormBox = styled.div`
  display: grid;
  height: calc(100% - 50px);
  @media (min-width: 700px) {
    grid-template-columns: 3fr 2fr;
  }
`;

const PhotoBox = styled.div`
  width: 100%;
  height: 100%;
  border-right: solid 1px ${(props) => props.theme.colors.faintLineColor};
  box-sizing: content-box;
`;

const Photo = styled.img`
  width: 100%;
  object-fit: contain;
  object-position: top right;
`;

const TextBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 20px;
`;

const AvatarContainer = styled.div`
  width: 30px;
  height: 30px;
  font-size: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin-right: 14px;
`;

const Username = styled.span`
  font-weight: 500;
`;

const Caption = styled.textarea`
  padding: 10px 20px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  line-height: 26px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PHOTO_DETAIL = gql`
  query photoDetail($photoId: Int!) {
    photoDetail(photoId: $photoId) {
      id
      url
      caption
    }
  }
`;

const EDIT_PHOTO_MUTATION = gql`
  mutation editPhoto($photoId: Int!, $caption: String) {
    editPhoto(photoId: $photoId, caption: $caption) {
      ok
      error
    }
  }
`;

interface Inputs {
  caption: string;
}

const EditPhotoModal = ({
  photoId,
  isOpen,
  setIsOpen,
}: {
  photoId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const meData = useMe();
  const { register, handleSubmit, getValues } = useForm<Inputs>();

  const onClose = () => {
    setIsOpen(false);
  };

  const { data } = useQuery<photoDetail, photoDetailVariables>(PHOTO_DETAIL, {
    variables: { photoId },
  });

  const updateMutation: MutationUpdaterFunction<
    editPhoto,
    editPhotoVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.editPhoto.ok) {
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          caption() {
            return getValues("caption");
          },
        },
      });
      onClose();
    }
  };

  const [editPhotoMutation, { loading }] = useMutation<
    editPhoto,
    editPhotoVariables
  >(EDIT_PHOTO_MUTATION, { update: updateMutation });

  const onValid: SubmitHandler<Inputs> = ({ caption }) => {
    if (!loading) {
      editPhotoMutation({ variables: { photoId, caption } });
    }
  };

  return (
    <BasicModal
      contentElement={(props: any) => (
        <Container {...props}>
          <ModalHeader>
            <CancelBtnContainer>
              <CancelBtn onClick={onClose}>Cancel</CancelBtn>
            </CancelBtnContainer>
            <HeaderTitle>Edit post</HeaderTitle>
            <DoneBtnContainer>
              <DoneBtn onClick={handleSubmit(onValid)}>Done</DoneBtn>
            </DoneBtnContainer>
          </ModalHeader>
          <FormBox>
            <PhotoBox>
              <Photo src={data?.photoDetail?.url} />
            </PhotoBox>
            <TextBox>
              <UserBox>
                <AvatarContainer>
                  <Avatar avatar={meData?.seeMe?.avatar} />
                </AvatarContainer>
                <Username>{meData?.seeMe?.username}</Username>
              </UserBox>
              <Caption
                {...register("caption")}
                spellCheck={false}
                placeholder="Write a caption..."
                defaultValue={data?.photoDetail?.caption || ""}
              />
            </TextBox>
          </FormBox>
        </Container>
      )}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default EditPhotoModal;
