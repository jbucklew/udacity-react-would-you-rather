import React from 'react';

// Material UI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function NoMatch404 () {
  return (
    <Container maxWidth='xs'>
      <Typography variant='h5' noWrap align='center' gutterBottom>404 Error - Page not found</Typography>
    </Container>
  );
}
