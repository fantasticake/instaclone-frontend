import { gql, useLazyQuery } from "@apollo/client";
import { ChangeEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useMe from "../hooks/useMe";
import {
  searchUsers,
  searchUsersVariables,
} from "../__generated__/searchUsers";
import Avatar from "./Avatar";
import Loading from "./Loading";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  height: 34px;
  width: 140px;
  @media (min-width: 700px) {
    width: 260px;
  }
  padding: 0 14px;
  border-radius: 8px;
  font-family: FontAwesome;
  font-size: 18px;
  ::placeholder {
    font-size: 16px;
    opacity: 0.3;
  }
  z-index: 1;
`;

const UserListContainer = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  position: absolute;
  background-color: transparent;
  height: 90vh;
  width: 100%;
`;

const NoUserTxt = styled.span`
  opacity: 0.8;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 60px;
  max-height: 360px;
  overflow-y: auto;
  width: 400px;
  max-width: 90%;
  border: solid 2px ${(props) => props.theme.colors.faintLineColor};
  padding: 14px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const UserContainer = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  font-size: 40px;
  border-radius: 20px;
  overflow: hidden;
`;

const Username = styled.div``;

const SEARCH_USERS_QUERY = gql`
  query searchUsers($key: String!) {
    searchUsers(key: $key) {
      id
      username
      avatar
    }
  }
`;

const SearchUserBox = () => {
  const meData = useMe();
  const [searchInput, setSearchInput] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);
  const UserListRef = useRef<HTMLDivElement>(null);
  const [searchUsersQuery, { data, loading }] = useLazyQuery<
    searchUsers,
    searchUsersVariables
  >(SEARCH_USERS_QUERY);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    if (e.target.value) {
      setIsListOpen(true);
      searchUsersQuery({ variables: { key: e.target.value } });
    } else {
      setIsListOpen(false);
    }
  };

  const onClickContainer = (e: any) => {
    if (UserListRef.current && !UserListRef.current.contains(e.target)) {
      setIsListOpen(false);
      setSearchInput("");
    }
  };

  const onClickUser = () => {
    setIsListOpen(false);
  };

  return (
    <Container>
      <SearchInput
        value={searchInput}
        onChange={onChange}
        placeholder="&#xf002;   Search Users"
      />
      <UserListContainer isOpen={isListOpen} onClick={onClickContainer}>
        <UserList ref={UserListRef}>
          {loading ? (
            <Loading />
          ) : data?.searchUsers?.filter(
              (user) => user && user.id !== meData?.seeMe?.id
            ).length ? (
            data?.searchUsers
              ?.filter((user) => user && user.id !== meData?.seeMe?.id)
              .map(
                (user) =>
                  user && (
                    <Link
                      onClick={onClickUser}
                      key={user.id}
                      to={`/users/${user.id}`}
                    >
                      <UserContainer>
                        <AvatarContainer>
                          <Avatar avatar={user.avatar} />
                        </AvatarContainer>
                        <Username>{user.username}</Username>
                      </UserContainer>
                    </Link>
                  )
              )
          ) : (
            <NoUserTxt>No results</NoUserTxt>
          )}
        </UserList>
      </UserListContainer>
    </Container>
  );
};

export default SearchUserBox;
