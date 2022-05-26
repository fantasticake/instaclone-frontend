import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import useMe from "../hooks/useMe";
import {
  createComment,
  createCommentVariables,
} from "../__generated__/createComment";

const Form = styled.form`
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 46px;
  border-top: solid 1px ${(props) => props.theme.colors.faintLineColor};
`;

const Input = styled.input`
  border: none;
  height: 100%;
  width: 100%;
`;

const SubmitBtn = styled.button`
  color: ${(props) => props.theme.colors.blue};
  ${(props) => (props.disabled ? "opacity: 0.4;" : null)}
  ${(props) => (props.disabled ? "cursor: default;" : null)}
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

interface Inputs {
  payload: string;
}

const CommentForm = ({ photoId }: { photoId: number }) => {
  const meData = useMe();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
    getValues,
  } = useForm<Inputs>({ mode: "onChange" });

  const [createCommentMutation, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION);

  const updateMutation: MutationUpdaterFunction<
    createComment,
    createCommentVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.createComment && meData?.seeMe) {
      const { id: commentId } = data.createComment;
      const newComment = {
        __typename: "Comment",
        id: commentId,
        payload: getValues("payload"),
        user: {
          ...meData.seeMe,
        },
      };
      const newCommentFragment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment NewComment on Comment {
            __typename
            id
            payload
            user {
              id
              username
            }
          }
        `,
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          totalComments(prev) {
            return prev + 1;
          },
        },
      });
      cache.modify({
        id: `ROOT_QUERY`,
        fields: {
          seeComments(prev, { storeFieldName }) {
            if (`seeComments:{"photoId":${photoId}}` == storeFieldName) {
              return [newCommentFragment, ...prev];
            }
            return prev;
          },
        },
      });
    }
  };

  const onValid: SubmitHandler<Inputs> = async ({ payload }) => {
    if (!loading) {
      await createCommentMutation({
        variables: { photoId: photoId, payload },
        update: updateMutation,
      });
      setValue("payload", "");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("payload", { required: true })}
        placeholder="Add a comment..."
      />
      <SubmitBtn onClick={handleSubmit(onValid)} disabled={!isValid}>
        Post
      </SubmitBtn>
    </Form>
  );
};

export default CommentForm;
