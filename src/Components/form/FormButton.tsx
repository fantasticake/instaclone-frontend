import styled from "styled-components";

const FormButton = styled.button`
  margin-top: 6px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors.blue};
  width: 90%;
  height: 32px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  ${(props) => (props.disabled ? "opacity: 0.5" : null)}
`;

export default FormButton;
