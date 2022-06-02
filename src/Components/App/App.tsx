import React from 'react';
import Assets from '../../Assets';
import { Box, Button } from '@mui/material';
import styled from 'styled-components';

const AppHeader = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

function App() {
  return (
    <Box
      sx={{
        textAlign: 'center'
      }}>
      <AppHeader>
        <Box
          component="img"
          src={Assets('logo')}
          alt="logo"
          sx={{
            height: '40vmin',
            pointerEvents: 'none'
          }}
        />
        <Button variant="contained" color="primary" href="/auth/login">
          Login
        </Button>
        <Button variant="contained" color="secondary" href="/user">
          User
        </Button>
      </AppHeader>
    </Box>
  );
}

export default App;
