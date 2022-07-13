import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import FormButton from "../Components/form/FormButton";
import FormError from "../Components/form/FormError";
import FormInput from "../Components/form/FormInput";
import Logo from "../Components/Logo";
import { setLogin } from "../variables";
import { login, loginVariables } from "../__generated__/login";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const LoginBox = styled.div`
  display: grid;
  gap: 10px;
  padding: 20px;
  width: 280px;
  border: solid 3px ${(props) => props.theme.colors.borderColor};
  border-radius: 6px;
  margin-bottom: 12px;
`;

const LogoBox = styled.div`
  width: 190px;
  margin: 16px auto;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  align-items: center;
`;

const SubBox = styled.div`
  padding: 20px;
  width: 280px;
  border: solid 3px ${(props) => props.theme.colors.borderColor};
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
  const { state }: { state: any } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const [loginMutation, { data, loading, error }] = useMutation<
    login,
    loginVariables
  >(LOGIN_MUTATION);

  const onSubmit: SubmitHandler<Inputs> = async ({ username, password }) => {
    if (!loading) {
      const { data } = await loginMutation({
        variables: { username, password },
      });
      if (data?.login.token) {
        setLogin(data.login.token);
      }
    }
  };

  return (
    <Container>
      <LoginBox>
        <LogoBox>
          <Logo />
        </LogoBox>
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
          <FormButton
            loading={loading}
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            Log In
          </FormButton>
        </Form>
        {data?.login.error && <FormError message={data.login.error} />}
        {error && <FormError message="Server error: Please try again" />}
      </LoginBox>
      <SubBox>
        Don't have an account? <SLink to={"/signup"}> Sign up</SLink>
      </SubBox>
    </Container>
  );
};

export default Login;
