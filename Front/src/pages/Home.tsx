import { Box, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import useCurrentUser from '../hooks/useCurrentUser';
import { styled } from 'styled-components';
import media from '../helpers/media';

const Main = styled.div`
  max-width: ${media.desktop};
  margin: 0 auto;
  padding: 0 14px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Home() {
  const { user } = useCurrentUser();
  return (
    <>
      <Layout>
        <Container>
          <Main>
            <Box w="100%">
              <Text fontSize="xl">Seja Bem-Vindo(a), {user?.name}.</Text>
            </Box>
          </Main>
        </Container>
      </Layout>
    </>
  );
}

export default Home;
