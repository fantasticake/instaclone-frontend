import styled from "styled-components";

const SFormError = styled.span`
  color: tomato;
  text-align: center;
  font-size: 16px;
`;

interface FormErrorProps {
  message: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return <SFormError>{message}</SFormError>;
};

export default FormError;
