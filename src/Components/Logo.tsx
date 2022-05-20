import styled from "styled-components";
import logoWhite from "../images/logoWhite.png";
import logoBlack from "../images/logoBlack.png";
import { useReactiveVar } from "@apollo/client";
import { themeVar } from "../variables";

const SLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Logo = () => {
  const theme = useReactiveVar(themeVar);
  return (
    <SLogo src={theme == "light" ? logoBlack : logoWhite} alt="Instaclone" />
  );
};

export default Logo;
