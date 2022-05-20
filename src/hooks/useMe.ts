import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { logout } from "../variables";
import { seeMe } from "../__generated__/seeMe";

const SEEME_QUERY = gql`
  query seeMe {
    seeMe {
      id
      username
      avatar
    }
  }
`;

const useMe = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery<seeMe>(SEEME_QUERY);
  if (!loading && !data?.seeMe) {
    logout();
    navigate("/");
  }
  return data;
};

export default useMe;
