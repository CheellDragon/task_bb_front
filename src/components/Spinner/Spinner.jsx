import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex', left: "calc(50% - 15vh)",top:"30vh", justifyContent: "center", position: 'absolute'}}>
      <CircularProgress size="30vh"/>
    </Box>
  );
}
