import styled from "styled-components";

const FormButton = styled.button`
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

export default FormButton;
