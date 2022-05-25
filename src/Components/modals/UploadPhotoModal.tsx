import ReactModal from "react-modal";
import styled, { useTheme } from "styled-components";
import useMe from "../../hooks/useMe";
import Avatar from "../Avatar";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
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

const Container = styled.div`
  width: 760px;
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

const ClearBtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ClearBtn = styled.button`
  font-size: 14px;
  color: tomato;
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
  height: 410px;
`;

const PhotoBox = styled.div`
  width: 420px;
  border-right: solid 1px ${(props) => props.theme.colors.faintLineColor};
  box-sizing: content-box;
`;

interface PhotoInputBoxProps {
  isSelected: boolean;
}

const PhotoInputBox = styled.div<PhotoInputBoxProps>`
  ${(props) => (props.isSelected ? "display:none;" : null)}
  width: 420px;
  height: 90%;
`;

const PhotoInput = styled.input`
  position: absolute;
  width: 420px;
  height: 410px;
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

const TextBox = styled.div``;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
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
  padding: 0 20px;
  height: 300px;
  width: 330px;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  line-height: 26px;
`;

interface Inputs {
  files: File[];
  caption: string;
}

const CREATE_PHOTO_MUTATION = gql`
  mutation createPhoto($file: Upload!, $caption: String) {
    createPhoto(file: $file, caption: $caption) {
      ok
      id
      error
    }
  }
`;

const UploadPhotoModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const meData = useMe();
  const theme = useTheme();
  const [selectedPhoto, setSelectedPhoto] = useState<Blob | MediaSource>();
  const [loadedPhoto, setLoadedPhoto] = useState("");
  const { register, handleSubmit, getValues } = useForm<Inputs>();

  const updateMutation: MutationUpdaterFunction<
    createPhoto,
    createPhotoVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.createPhoto.ok && meData?.seeMe) {
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
          __ref: `User:${meData.seeMe.id}`,
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
              username
              avatar
            }
          }
        `,
      });
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [...prev, newPhotoFragment];
          },
        },
      });
    }
  };

  const [createPhotoMutation, { loading }] = useMutation<
    createPhoto,
    createPhotoVariables
  >(CREATE_PHOTO_MUTATION, { update: updateMutation });

  const onValid: SubmitHandler<Inputs> = async ({ files: [file], caption }) => {
    if (!loading) {
      createPhotoMutation({ variables: { file, caption } });
    }
  };

  const initSelected = () => {
    setSelectedPhoto(undefined);
    setLoadedPhoto("");
  };

  const onSelectPhoto = (e: any) => {
    if (!e.target.files || e.target.files.length == 0)
      setSelectedPhoto(undefined);
    else setSelectedPhoto(e.target.files[0]);
  };

  const onClose = () => {
    setIsOpen(false);
    initSelected();
  };

  useEffect(() => {
    let photoUrl: string;
    if (typeof selectedPhoto == "undefined") {
      setLoadedPhoto("");
    } else {
      photoUrl = URL.createObjectURL(selectedPhoto);
      setLoadedPhoto(photoUrl);
    }
    return () => {
      URL.revokeObjectURL(photoUrl);
    };
  }, [selectedPhoto]);

  return (
    <ReactModal
      style={{
        overlay: {
          zIndex: 1,
          backgroundColor: theme.colors.blurryBackgroundColor,
        },
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: theme.colors.backgroundColor,
          borderRadius: "18px",
          padding: "0px",
        },
      }}
      contentElement={(props) => (
        <Container {...props}>
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
              <PhotoInputBox isSelected={Boolean(selectedPhoto)}>
                <PhotoInput
                  {...register("files", { required: true })}
                  id="photoInput"
                  onChange={onSelectPhoto}
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
        </Container>
      )}
      isOpen={isOpen}
      onRequestClose={onClose}
    />
  );
};

export default UploadPhotoModal;
