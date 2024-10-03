import { Button, Container } from '@mui/material';

interface Props {}

const HomePaige = (props: Props) => {
  console.log('HomePaige');
  return (
    <Container style={{ marginTop: '9rem' }} maxWidth='xl'>
      <Button fullWidth variant='contained'>
        Home Page
      </Button>
    </Container>
  );
};

export default HomePaige;
