import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useMe from "../hooks/useMe";
import Avatar from "./Avatar";
import { logout } from "../variables";

const Container = styled.div``;

const AvatarContainer = styled.div`
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

const ModalOutside = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 960px;
  background-color: transparent;
`;

const Modal = styled.div`
  position: absolute;
  top: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 230px;
  border: solid 2px ${(props) => props.theme.colors.faintLineColor};
`;

const Btn = styled(Link)`
  display: flex;
  padding: 14px;
  font-size: 14px;
  width: 100%;
  :hover {
    background-color: ${(props) => props.theme.colors.blurryBackgroundColor};
  }
`;

const BtnIcon = styled.div`
  font-size: 15px;
  margin-right: 14px;
`;

const LogoutBtn = styled.button`
  width: 100%;
  text-align: left;
  border-top: solid 2px ${(props) => props.theme.colors.faintLineColor};
  padding: 14px;
  font-size: 14px;
  width: 100%;
  :hover {
    background-color: ${(props) => props.theme.colors.blurryBackgroundColor};
  }
`;

const ProfileBtn = () => {
  const meData = useMe();
  const modalRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const onClickOutside = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  const onClickLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container>
      <AvatarContainer onClick={() => setIsModalOpen(true)}>
        <Avatar avatar={meData?.seeMe?.avatar} />
      </AvatarContainer>
      <ModalOutside onClick={onClickOutside} isOpen={isModalOpen}>
        <ModalContainer>
          <Modal ref={modalRef}>
            <Btn to={`/users/${meData?.seeMe?.id}`}>
              <BtnIcon>
                <FontAwesomeIcon icon={faUserCircle} />
              </BtnIcon>
              Profile
            </Btn>
            <Btn to={"/accounts/edit"}>
              <BtnIcon>
                <FontAwesomeIcon icon={faGear} />
              </BtnIcon>
              Setting
            </Btn>
            <LogoutBtn onClick={onClickLogout}>Log Out</LogoutBtn>
          </Modal>
        </ModalContainer>
      </ModalOutside>
    </Container>
  );
};

export default ProfileBtn;
