import { Button, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  Container,
  Content,
  ErrorSpan,
  Form,
  Header,
  LabelSignup,
  Strong,
} from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../services/loginService";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Campo e-mail obrigatório")
    .email("Digite um e-mail válido!"),
  password: yup
    .string()
    .required("Campo senha é obrigatório")
    .min(8, "Senha deve conter no mínimo 8 dígitos"),
});

interface FormData {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header className="header">
        <span>Por favor digite suas informações de login</span>
      </Header>
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="E-mail" {...register("email")} />
          {errors.email && <ErrorSpan>{errors.email.message}</ErrorSpan>}
          <Input
            placeholder="Senha"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <ErrorSpan>{errors.password.message}</ErrorSpan>}
          <Button disabled={!isValid} variant="contained" type="submit">
            Login
          </Button>
          <LabelSignup>
            Não tem uma conta?
            <Strong>
              <Link to="/register">&nbsp;Registre-se</Link>
            </Strong>
          </LabelSignup>
        </Form>
      </Content>
    </Container>
  );
};
