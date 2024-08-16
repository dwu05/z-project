import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Container,
  Stack,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

const apiPort = `http://localhost:5080/users/`

export const Login = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submitLogin = async () => {
    try {
      const response = await fetch(`${apiPort}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('username', usernameInput);
        navigate(`/UserInventory/${data.user.id}`);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Login error ocurred.');
    }
  };

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <>
      <Box>
        <Heading display="flex" justifyContent="center" marginTop="1em">
          Avenger's Inventory Login
        </Heading>
        <Container display="flex" flexDirection="column" alignItems="center" marginTop="1em">
          <Stack spacing={4} maxW="sm">
            <InputGroup size="md">
              <Input
                placeholder="Username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </InputGroup>
            <InputGroup size="md">
              <Input
                placeholder="Enter password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <InputRightElement width="4.5rem" />
            </InputGroup>
            <Button onClick={submitLogin}>Login</Button>
            {message && (
              <Text>{message}</Text>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};
