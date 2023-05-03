import { Button, Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  Container,
  Content,
  ErrorSpan,
  Form,
  Header,
  LabelSignup,
  Strong,
  StyledTextField,
} from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../services/loginService";
import { Link, useNavigate } from "react-router-dom";
import Background from "../../components/background";
import logoImg from "../../assets/logo.png";
import { useState } from "react";

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
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

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
      await login(data).then((response) => {
        console.log(response.data);
        navigate("/dashboard");
      });
    } catch (error) {
      setError("Usuário ou senha incorretos.");
    }
  };
  return (
    <Background>
      <Container>
        <Header>
          <img src={logoImg} alt="Logo" />
          <span>Por favor digite suas informações de login</span>
        </Header>
        <Content>
          <Form
            style={{ border: "5px black" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {error && <div>{error}</div>}
            <StyledTextField
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              {...register("email")}
            />
            {errors.email && <ErrorSpan>{errors.email.message}</ErrorSpan>}
            <StyledTextField
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <ErrorSpan>{errors.password.message}</ErrorSpan>
            )}

            <Button
              style={{
                backgroundColor: "#FAB06A",
                color: "#fff",
                width: "31vh",
              }}
              disabled={!isValid}
              variant="contained"
              type="submit"
            >
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
    </Background>
  );
};
