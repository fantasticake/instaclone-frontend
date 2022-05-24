import {
  faMoon,
  faSun,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import useMe from "../hooks/useMe";
import { themeVar, toggleTheme } from "../variables";
import Avatar from "./Avatar";
import Logo from "./Logo";

const Container = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px ${(props) => props.theme.colors.faintLineColor};
  height: 60px;
  width: 100%;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 920px;
  max-width: 90%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoBox = styled(Link)`
  align-self: flex-start;
  width: 110px;
  margin-top: 10px;
`;

const SearchBox = styled.input`
  height: 34px;
  width: 260px;
  padding: 0 14px;
  border-radius: 8px;
  font-family: FontAwesome;
  font-size: 18px;
  ::placeholder {
    font-size: 16px;
    opacity: 0.3;
  }
`;

const Buttons = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 20px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const CreateBtn = styled(Button)``;

const ThemeBtn = styled(Button)``;

const ProfileBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  font-size: 30px;
  overflow: hidden;
`;

const ModalContainer = styled.div`
  height: 460px;
  width: 760px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px ${(props) => props.theme.colors.faintLineColor};
  height: 50px;
  font-size: 16px;
`;

const FormBox = styled.div`
  display: flex;
  height: calc(100% - 50px);
`;

const PhotoInput = styled.input`
  width: 55%;
`;

const TextBox = styled.div``;

const UserBox = styled.div`
  display: flex;
`;

const AvatarContainer = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
`;

const Username = styled.span``;

const CaptionInput = styled.input``;

const Header = () => {
  const data = useMe();
  const theme = useTheme();
  const [isModal, setIsModal] = useState(false);
  return data ? (
    <Container>
      <Content>
        <Column>
          <LogoBox to={"/"}>
            <Logo />
          </LogoBox>
        </Column>
        <Column>
          <SearchBox placeholder="&#xf002;   Search" />
        </Column>
        <Column>
          <Buttons>
            <CreateBtn onClick={() => setIsModal(true)}>
              <FontAwesomeIcon icon={faPlusSquare} />
            </CreateBtn>
            <ThemeBtn onClick={toggleTheme}>
              <FontAwesomeIcon icon={themeVar() == "light" ? faMoon : faSun} />
            </ThemeBtn>
            <ProfileBtn to={`/users/${data?.seeMe?.id}`}>
              <Avatar avatar={data?.seeMe?.avatar} />
            </ProfileBtn>
          </Buttons>
        </Column>
      </Content>
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
          <ModalContainer {...props}>
            <ModalHeader>Create new post</ModalHeader>
            <FormBox>
              <PhotoInput type={"file"} />
              <TextBox>
                <UserBox>
                  <AvatarContainer>
                    <Avatar avatar={data.seeMe?.avatar} />
                  </AvatarContainer>
                  <Username>{data.seeMe?.username}</Username>
                </UserBox>
                <CaptionInput placeholder="Write a caption..." />
              </TextBox>
            </FormBox>
          </ModalContainer>
        )}
        isOpen={isModal}
        onRequestClose={() => setIsModal(false)}
      />
    </Container>
  ) : null;
};

export default Header;
