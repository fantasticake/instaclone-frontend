import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../variables";
import { deleteAccount } from "../__generated__/deleteAccount";

const Button = styled.button`
  color: ${(props) => props.theme.colors.blue};
`;

const DELETE_ACCOUNT_MUTATION = gql`
  mutation deleteAccount {
    deleteAccount {
      ok
      error
    }
  }
`;

const DeleteAccountBtn = () => {
  const navigate = useNavigate();
  const [deleteAccountMutation, { loading }] = useMutation<deleteAccount>(
    DELETE_ACCOUNT_MUTATION,
    {
      update: () => {},
    }
  );

  const onClick = () => {
    if (!loading) {
      deleteAccountMutation();
    }
  };
  return <Button onClick={onClick}>Temporarily disable my account</Button>;
};

export default DeleteAccountBtn;
