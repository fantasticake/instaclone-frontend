import styled, { useTheme } from "styled-components";
import useMe from "../../hooks/useMe";
import Avatar from "../Avatar";
import React, { useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import {
  createPhoto,
  createPhotoVariables,
} from "../../__generated__/createPhoto";

import BeatLoader from "react-spinners/BeatLoader";
import BasicModal from "./BasicModal";

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

const SharingHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px ${(props) => props.theme.colors.faintLineColor};
  height: 50px;
  font-size: 16px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 50px);
`;

const Completed = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: calc(100% - 50px);
`;

const CompletedText = styled.span`
  font-size: 22px;
  opacity: 0.7;
`;

const ClearBtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ClearBtn = styled.button`
  font-size: 14px;
  opacity: 0.7;
`;

const HeaderTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShareBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ShareBtn = styled.button`
  font-size: 14px;
  color: ${(props) => props.theme.colors.blue};
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
  @media (min-width: 700px) {
    flex-direction: row;
  }
`;

const PhotoBox = styled.div`
  width: 100%;
  @media (min-width: 700px) {
    width: 60%;
  }
  border-right: solid 1px ${(props) => props.theme.colors.faintLineColor};
  border-bottom: solid 1px ${(props) => props.theme.colors.faintLineColor};
`;

const PhotoInputBox = styled.div<{ isSelected: boolean }>`
  position: relative;
  ${(props) => (props.isSelected ? "display:none;" : null)}
  width: 100%;
  height: 240px;
  @media (min-width: 700px) {
    height: 100%;
  }
`;

const PhotoInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  ::-webkit-file-upload-button {
    display: none;
  }
`;

const PhotoInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: 100%;
  font-size: 20px;
`;

const Photo = styled.img`
  width: 100%;
  object-fit: contain;
  object-position: top right;
`;

const TextBox = styled.div`
  width: 100%;
  @media (min-width: 700px) {
    width: 40%;
  }
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

const CREATE_PHOTO_MUTATION = gql`
  mutation createPhoto($file: Upload!, $caption: String) {
    createPhoto(file: $file, caption: $caption) {
      ok
      id
      error
    }
  }
`;

interface Inputs {
  caption: string;
}

const UploadPhotoModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const meData = useMe();
  const theme = useTheme();
  const [loadedPhoto, setLoadedPhoto] = useState("");
  const [isPhotoCreated, setIsPhotoCreated] = useState(false);
  const { register, handleSubmit, getValues, reset } = useForm<Inputs>();
  const photoInputRef = useRef<HTMLInputElement>(null);

  const updateMutation: MutationUpdaterFunction<
    createPhoto,
    createPhotoVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.createPhoto.ok && meData?.seeMe && loadedPhoto) {
      const newPhoto = {
        __typename: "Photo",
        id: data.createPhoto.id,
        url: loadedPhoto,
        caption: getValues("caption"),
        isLiked: false,
        totalLikes: 0,
        totalComments: 0,
        createdAt: Date.now() + "",
        user: {
          ...meData.seeMe,
        },
      };
      const newPhotoFragment = cache.writeFragment({
        data: newPhoto,
        fragment: gql`
          fragment NewPhoto on Photo {
            id
            url
            caption
            isLiked
            totalLikes
            totalComments
            createdAt
            user {
              id
              avatar
              username
            }
          }
        `,
      });
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [newPhotoFragment, ...prev];
          },
          seePhotosByUser(prev, { storeFieldName }) {
            if (
              storeFieldName ===
              `seePhotosByUser:({"userId":${meData.seeMe?.id}})`
            )
              return [newPhotoFragment, ...prev];
          },
        },
      });
      setIsPhotoCreated(true);
    }
  };

  const [createPhotoMutation, { loading }] = useMutation<
    createPhoto,
    createPhotoVariables
  >(CREATE_PHOTO_MUTATION, { update: updateMutation });

  const onValid: SubmitHandler<Inputs> = async ({ caption }) => {
    const files = photoInputRef.current?.files;
    if (!loading && files && files.length) {
      createPhotoMutation({ variables: { file: files[0], caption } });
    }
  };

  const onSelectPhoto: React.ChangeEventHandler<HTMLInputElement> = () => {
    const files = photoInputRef.current?.files;
    if (files?.length) {
      const photoUrl = URL.createObjectURL(files[0]);
      setLoadedPhoto(photoUrl);
    }
  };

  const initSelected = () => {
    setLoadedPhoto("");
  };

  const onClose = () => {
    setIsOpen(false);
    initSelected();
    setIsPhotoCreated(false);
    reset();
  };

  return (
    <BasicModal
      contentElement={(props: any) => (
        <Container {...props}>
          {!loading && !isPhotoCreated && (
            <>
              <ModalHeader>
                <ClearBtnContainer>
                  <ClearBtn onClick={initSelected}>Clear</ClearBtn>
                </ClearBtnContainer>
                <HeaderTitle>Create new post</HeaderTitle>
                <ShareBtnContainer>
                  <ShareBtn onClick={handleSubmit(onValid)}>Share</ShareBtn>
                </ShareBtnContainer>
              </ModalHeader>
              <FormBox>
                <PhotoBox>
                  <PhotoInputBox isSelected={Boolean(loadedPhoto)}>
                    <PhotoInput
                      ref={photoInputRef}
                      id="photoInput"
                      onInput={onSelectPhoto}
                      type="file"
                      accept="image/*"
                    />
                    <PhotoInputLabel htmlFor="photoInput">
                      <FontAwesomeIcon icon={faImage} size="2x" />
                      Drag photos here
                    </PhotoInputLabel>
                  </PhotoInputBox>
                  {loadedPhoto && <Photo src={loadedPhoto} />}
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
                  />
                </TextBox>
              </FormBox>
            </>
          )}
          {loading && (
            <>
              <SharingHeader>Sharing</SharingHeader>
              <Loading>
                <BeatLoader size={22} color={theme.colors.textColor} />
              </Loading>
            </>
          )}
          {isPhotoCreated && (
            <>
              <SharingHeader>Post shared</SharingHeader>
              <Completed>
                <FontAwesomeIcon size="5x" icon={faCheckCircle} />
                <CompletedText>Your post has been shared.</CompletedText>
              </Completed>
            </>
          )}
        </Container>
      )}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default UploadPhotoModal;
