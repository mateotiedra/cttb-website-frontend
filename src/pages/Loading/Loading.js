import React, { useEffect, useState } from 'react';

import { CircularProgress, Box, Typography } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';

function Loading() {
  const [seconds, setSeconds] = useState(3);
  const [displayMessage, setDisplayMessage] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setDisplayMessage(true);
    }
  }, [setDisplayMessage, seconds]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography
          variant='body1'
          color={displayMessage ? 'text.primary' : 'transparent'}
          sx={{ transitionDuration: '500ms' }}
        >
          Le chargement peut prendre quelques secondes...
        </Typography>
      </Box>
    </Box>
  );
}

export default Loading;