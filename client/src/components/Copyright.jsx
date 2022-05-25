import React from 'react'

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Logo() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://firelibrary.herokuapp.com/">
        FireLibrary
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};