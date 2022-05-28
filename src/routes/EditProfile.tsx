import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import FormButton from "../Components/form/FormButton";
import FormInput from "../Components/form/FormInput";
import Header from "../Components/Header";
import useMe from "../hooks/useMe";
import {
  editProfile,
  editProfileVariables,
} from "../__generated__/editProfile";

import { useEffect, useState } from "react";
import DeleteAccountBtn from "../Components/DeleteAccountBtn";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 920px;
  margin-top: 30px;
  border: solid 1px ${(props) => props.theme.colors.faintLineColor};
  padding: 30px 0;
  padding-left: 180px;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const LabelBox = styled.div`
  width: 200px;
  margin-right: 30px;
  display: flex;
  justify-content: flex-end;
  font-weight: 500;
`;

const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  font-size: 40px;
  border-radius: 20px;
  overflow: hidden;
`;

const UserBoxColumn = styled.div``;

const Username = styled.div``;

const AvatarForm = styled.form`
  display: flex;
  align-items: center;
`;

const AvatarInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const AvatarLabel = styled.label`
  font-size: 14px;
  color: ${(props) => props.theme.colors.blue};
  cursor: pointer;
  margin-right: 10px;
`;

const SaveBtnContainer = styled.div`
  button {
    width: 50px;
    height: 26px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const InputContainer = styled.div`
  width: 360px;
  input {
    height: 36px;
    padding: 0 8px;
  }
`;

const InputName = styled.span``;

const BottomBtnBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 40px;
`;

const SubmitBtnContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  button {
    width: 70px;
  }
  margin-right: 20px;
`;

interface Inputs {
  email: string;
}

interface AvatarInputs {
  avatars: File[];
}

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($email: String, $avatar: Upload) {
    editProfile(email: $email, avatar: $avatar) {
      ok
      error
    }
  }
`;

const EditProfile = () => {
  const meData = useMe();
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState("");
  const { register: registerAvatar, handleSubmit: handleSubmitAvatar } =
    useForm<AvatarInputs>({
      mode: "onChange",
    });
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const updateMutation: MutationUpdaterFunction<
    editProfile,
    editProfileVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.editProfile.ok && meData?.seeMe) {
      cache.modify({
        id: `User:${meData.seeMe.id}`,
        fields: {
          email() {
            return getValues("email");
          },
        },
      });
    }
  };

  const updateAvatarMutation: MutationUpdaterFunction<
    editProfile,
    editProfileVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.editProfile.ok && meData?.seeMe) {
      cache.modify({
        id: `User:${meData.seeMe.id}`,
        fields: {
          avatar(prev) {
            return selectedAvatarUrl;
          },
        },
      });
    }
  };

  const [editProfileMutation, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION);

  const onValid: SubmitHandler<Inputs> = ({ email }) => {
    if (!loading) {
      editProfileMutation({ variables: { email }, update: updateMutation });
    }
  };

  const onValidAvatar: SubmitHandler<AvatarInputs> = ({
    avatars: [avatar],
  }) => {
    if (!loading && avatar) {
      editProfileMutation({
        variables: { avatar },
        update: updateAvatarMutation,
      });
    }
  };

  const onSelectAvatar = (e: any) => {
    if (e.target.files && e.target.files.length != 0) {
      const url = URL.createObjectURL(e.target.files[0]);
      setSelectedAvatarUrl(url);
    }
  };

  useEffect(() => {
    if (meData?.seeMe?.email) {
      reset({ email: meData?.seeMe?.email });
    }
  }, [meData?.seeMe, reset]);

  return (
    <Container>
      <Header />
      <Content>
        <UserBox>
          <LabelBox>
            <AvatarContainer>
              <Avatar
                avatar={
                  selectedAvatarUrl ? selectedAvatarUrl : meData?.seeMe?.avatar
                }
              />
            </AvatarContainer>
          </LabelBox>
          <UserBoxColumn>
            <Username>{meData?.seeMe?.username}</Username>
            <AvatarForm>
              <AvatarInput
                {...registerAvatar("avatars", { required: true })}
                onChange={onSelectAvatar}
                id="avatarInput"
                type="file"
              />
              <AvatarLabel htmlFor="avatarInput">
                Change Profile Photo
              </AvatarLabel>
              <SaveBtnContainer>
                <FormButton
                  disabled={!selectedAvatarUrl}
                  onClick={handleSubmitAvatar(onValidAvatar)}
                >
                  Save
                </FormButton>
              </SaveBtnContainer>
            </AvatarForm>
          </UserBoxColumn>
        </UserBox>
        <Form>
          <InputBox>
            <LabelBox>
              <InputName>Username</InputName>
            </LabelBox>
            <InputContainer>
              <FormInput readOnly defaultValue={meData?.seeMe?.username} />
            </InputContainer>
          </InputBox>
          <InputBox>
            <LabelBox>
              <InputName>Email</InputName>
            </LabelBox>
            <InputContainer>
              <FormInput {...register("email", { required: true })} />
            </InputContainer>
          </InputBox>
          <BottomBtnBox>
            <SubmitBtnContainer>
              <FormButton disabled={!isValid} onClick={handleSubmit(onValid)}>
                Sumbit
              </FormButton>
            </SubmitBtnContainer>
            <DeleteAccountBtn />
          </BottomBtnBox>
        </Form>
      </Content>
    </Container>
  );
};

export default EditProfile;
