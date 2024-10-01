import { Button, Container } from '@material-ui/core';

interface Props {}

const LoginPaige = (props: Props) => {
  return (
    <Container style={{ marginTop: '9rem' }} maxWidth='xl'>
      <Button fullWidth variant='contained'>
        Login Page
      </Button>
    </Container>
  );
};

export default LoginPaige;
