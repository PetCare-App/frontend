import React, { useEffect, useState } from 'react';
import { usePetCareContext } from "../../context";
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Form } from './Form';
import { User } from '../../types/users';

export const Users = () => {
  const navigate = useNavigate();
  const { user, getUser } = usePetCareContext();

  // const [setUser] = useState({} as User)


  // useEffect(() => {getUser()}, [])

  console.log(user)
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Form currentUser={user} />
    </Container>
  );
};