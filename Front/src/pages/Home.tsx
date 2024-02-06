import { Box, Text } from '@chakra-ui/react';
import { styled } from 'styled-components';
import CardLastLoan from '../components/CardLastLoan';
import CardLastVisitor from '../components/CardLastVisitor';
import Layout from '../components/Layout';
import media from '../helpers/media';
import useCurrentUser from '../hooks/useCurrentUser';
import useKeyLoans from '../hooks/useKeyLoans';
import useVisitors from '../hooks/useVisitors';
import { Link } from 'react-router-dom';

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
  const { Visitors } = useVisitors();
  const { loans } = useKeyLoans();

  return (
    <>
      <Layout>
        <Container>
          <Main>
            <Box w="100%">
              <Text fontSize={{ base: 'lg', md: 'xl' }}>Seja Bem-Vindo(a), {user?.name}.</Text>
            </Box>
            <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} gap={4} mt={6}>
              {Visitors ? (
                <>
               
                  <CardLastVisitor {...Visitors[0]} />
                 
                </>
              ) : (
                <></>
              )}
              {loans ? (
                <>
               
                  <CardLastLoan {...loans[0]} keyInfo={loans[0].key} key={loans[0].id} />
                  
                </>
              ) : (
                <></>
              )}
            </Box>
          </Main>
        </Container>
      </Layout>
    </>
  );
}

export default Home;
