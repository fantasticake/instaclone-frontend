import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import useMe from "../hooks/useMe";
import Logo from "./Logo";

const Container = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px ${(props) => props.theme.colors.faintLineColor};
  height: 70px;
  padding: 0 120px;
`;

const Column = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoBox = styled(Link)`
  align-self: flex-start;
  height: 46px;
  margin-top: 14px;
`;

const SearchBox = styled.input`
  height: 30px;
  width: 260px;
  padding: 0 14px;
  border-radius: 8px;
  font-family: FontAwesome;
  font-size: 16px;
`;

const Buttons = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ThemeBtn = styled.div`
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

const ProfileBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
`;

const Avatar = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Header = () => {
  const theme = useTheme();
  const data = useMe();
  return (
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
          <ThemeBtn></ThemeBtn>
          <ProfileBtn to={`/users/${data?.seeMe?.id}`}>
            {data?.seeMe?.avatar ? (
              <Avatar src={data.seeMe.avatar} />
            ) : (
              <FontAwesomeIcon icon={faUser} color={theme.colors.textColor} />
            )}
          </ProfileBtn>
        </Buttons>
      </Column>
    </Container>
  );
};

export default Header;
