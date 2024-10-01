import { Button, Container } from '@material-ui/core';

interface Props {}

const HomePaige = (props: Props) => {
  return (
    <Container style={{ marginTop: '9rem' }} maxWidth='xl'>
      <Button fullWidth variant='contained'>
        Home Page
      </Button>
    </Container>
  );
};

export default HomePaige;
