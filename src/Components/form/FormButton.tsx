import { ClipLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.blue};
  width: 90%;
  height: 32px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  color: white;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  ${(props) => (props.disabled ? "opacity: 0.5" : null)}
`;

const FormButton = ({ loading, children, ...rest }: any) => {
  const theme = useTheme();

  return (
    <Button {...rest}>
      {loading ? (
        <ClipLoader size={20} color={theme.colors.textColor} />
      ) : (
        children
      )}
    </Button>
  );
};

export default FormButton;
