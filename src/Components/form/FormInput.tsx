import styled from "styled-components";

const FormInput = styled.input`
  width: 85%;
  height: 30px;
  border-radius: 4px;
  margin-bottom: 6px;
  ::placeholder {
    font-size: 12px;
    color: ${(props) => props.theme.colors.textColor};
    opacity: 0.5;
  }
`;

export default FormInput;
