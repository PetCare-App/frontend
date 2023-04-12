import { Button, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { Container, Form, Header } from "./styles";

export const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Container>
       <Header className="header">
        <span>Por favor digite suas informações de login</span>
      </Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Username" {...register("username")} />
        <Input placeholder="Senha" type="password" {...register("password", { required: true })} />
        {errors.exampleRequired && <span>Campo Obrigatório</span>}
        <Button variant="contained" type="submit">Login</Button>      
        </Form>
    </Container>
  )
};
