import {
  faMoon,
  faSun,
  faPlusSquare,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useMe from "../hooks/useMe";
import { themeVar, toggleTheme } from "../variables";
import Avatar from "./Avatar";
import Logo from "./Logo";
import UploadPhotoModal from "./modals/UploadPhotoModal";
import ProfileBtn from "./ProfileBtn";
import SearchUserBox from "./SearchUserBox";

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

const MessageBtn = styled(Button)`
  font-size: 22px;
`;

const CreateBtn = styled(Button)``;

const ThemeBtn = styled(Button)``;

const Header = () => {
  const data = useMe();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  return data ? (
    <Container>
      <UploadPhotoModal isOpen={isUploadOpen} setIsOpen={setIsUploadOpen} />
      <Content>
        <Column>
          <LogoBox to={"/"}>
            <Logo />
          </LogoBox>
        </Column>
        <Column>
          <SearchUserBox />
        </Column>
        <Column>
          <Buttons>
            <Link to={"/rooms"}>
              <MessageBtn>
                <FontAwesomeIcon icon={faPaperPlane} />
              </MessageBtn>
            </Link>
            <CreateBtn onClick={() => setIsUploadOpen(true)}>
              <FontAwesomeIcon icon={faPlusSquare} />
            </CreateBtn>
            <ThemeBtn onClick={toggleTheme}>
              <FontAwesomeIcon icon={themeVar() == "light" ? faMoon : faSun} />
            </ThemeBtn>
            <ProfileBtn />
          </Buttons>
        </Column>
      </Content>
    </Container>
  ) : null;
};

export default Header;
