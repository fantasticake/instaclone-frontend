import styled, { useTheme } from "styled-components";

import Cliploader from "react-spinners/ClipLoader";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Loading = () => {
  const theme = useTheme();

  return (
    <Container>
      <Cliploader color={theme.colors.textColor} />
    </Container>
  );
};

export default Loading;
