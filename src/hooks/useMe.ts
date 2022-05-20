import { gql, useQuery } from "@apollo/client";
import { tokenVar } from "../variables";
import { seeMe } from "../__generated__/seeMe";

const SEEME_QUERY = gql`
  query seeMe {
    seeMe {
      id
      avatar
    }
  }
`;

const useMe = () => {
  const { data, loading } = useQuery<seeMe>(SEEME_QUERY);
  if (!loading && !data?.seeMe) {
    localStorage.removeItem("token");
    tokenVar(null);
  }
  return data;
};

export default useMe;
