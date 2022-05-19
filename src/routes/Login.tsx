import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import FormButton from "../Components/form/FormButton";
import FormInput from "../Components/form/FormInput";
import logo from "../images/logo.png";
import { tokenVar } from "../variables";
import { login, loginVariables } from "../__generated__/login";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 280px;
  border: solid 4px ${(props) => props.theme.colors.borderColor};
  border-radius: 6px;
  margin-bottom: 12px;
`;

const Logo = styled.img`
  width: 180px;
  height: 70px;
  margin: 20px 0;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubBox = styled.div`
  padding: 20px;
  width: 280px;
  border: solid 4px ${(props) => props.theme.colors.borderColor};
  text-align: center;
  font-size: 14px;
`;

const SLink = styled(Link)`
  color: ${(props) => props.theme.colors.blue};
  font-weight: 600;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

interface Inputs {
  username: string;
  password: string;
}

const Login = () => {
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const [loginMutation, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION
  );

  const onSubmit: SubmitHandler<Inputs> = async ({ username, password }) => {
    if (!loading) {
      const { data } = await loginMutation({
        variables: { username, password },
      });
      if (data?.login.token) {
        window.localStorage.setItem("token", data.login.token);
        tokenVar(data.login.token);
      }
    }
  };

  return (
    <Container>
      <LoginBox>
        <Logo src={logo} alt="Logo" />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            defaultValue={state?.username || ""}
            {...register("username", { required: true })}
            placeholder="Username"
          />
          <FormInput
            defaultValue={state?.password || ""}
            {...register("password", { required: true })}
            placeholder="Password"
            type={"password"}
          />
          <FormButton onClick={handleSubmit(onSubmit)} disabled={!isValid}>
            Log In
          </FormButton>
        </Form>
      </LoginBox>
      <SubBox>
        Don't have an account? <SLink to={"/signup"}> Sign up</SLink>
      </SubBox>
    </Container>
  );
};

export default Login;
