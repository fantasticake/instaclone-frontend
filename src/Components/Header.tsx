import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
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

const Column = styled.div`
  width: 300px;
  max-width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoBox = styled(Link)`
  align-self: flex-start;
  width: 110px;
  margin-top: 10px;
`;

const SearchBox = styled.input`
  height: 30px;
  width: 220px;
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
  gap: 20px;
`;

const ThemeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  font-size: 26px;
`;

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

const Header = () => {
  const data = useMe();
  return data ? (
    <Container>
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
          <ThemeBtn onClick={toggleTheme}>
            <FontAwesomeIcon icon={themeVar() == "light" ? faMoon : faSun} />
          </ThemeBtn>
          <ProfileBtn to={`/users/${data?.seeMe?.id}`}>
            <Avatar avatar={data?.seeMe?.avatar} />
          </ProfileBtn>
        </Buttons>
      </Column>
    </Container>
  ) : null;
};

export default Header;
