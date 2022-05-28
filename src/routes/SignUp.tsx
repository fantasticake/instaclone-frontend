import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormButton from "../Components/form/FormButton";
import FormInput from "../Components/form/FormInput";
import { signUp, signUpVariables } from "../__generated__/signUp";
import Logo from "../Components/Logo";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 280px;
  border: solid 3px ${(props) => props.theme.colors.borderColor};
  border-radius: 6px;
  margin-bottom: 12px;
`;

const LogoBox = styled.div`
  width: 190px;
  margin: 26px 0;
`;

const MainText = styled.span`
  text-align: center;
  font-weight: 600;
  opacity: 0.8;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-top: 26px;
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

const SIGNUP_MUTATION = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`;

interface Inputs {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const [signUpMutation, { loading }] = useMutation<signUp, signUpVariables>(
    SIGNUP_MUTATION
  );

  const onSubmit: SubmitHandler<Inputs> = async ({
    username,
    email,
    password,
    passwordConfirm,
  }) => {
    if (password == passwordConfirm && !loading) {
      const { data } = await signUpMutation({
        variables: { username, email, password },
      });
      if (data?.signUp.ok) {
        navigate("/", { state: { username, password } });
      }
    }
  };

  return (
    <Container>
      <SignupBox>
        <LogoBox>
          <Logo />
        </LogoBox>
        <MainText>Sign up to see photos and videos from your friends.</MainText>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            {...register("username", { required: true })}
            placeholder="Username"
          />
          <FormInput
            {...register("email", { required: true })}
            placeholder="Email"
          />
          <FormInput
            {...register("password", { required: true })}
            placeholder="Password"
            type={"password"}
          />
          <FormInput
            {...register("passwordConfirm", { required: true })}
            placeholder="Password Confirm"
            type={"password"}
          />
          <FormButton onClick={handleSubmit(onSubmit)} disabled={!isValid}>
            Sign up
          </FormButton>
        </Form>
      </SignupBox>
      <SubBox>
        Have an account? <SLink to={"/"}> Log in</SLink>
      </SubBox>
    </Container>
  );
};

export default SignUp;
