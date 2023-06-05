import { Box, Container, Image, Text, useToast } from '@chakra-ui/react';
import * as React from 'react';

import { QrScanner } from '@yudiel/react-qr-scanner';

function Home() {
  const [status, setStatus] = React.useState<string>('');

  const toast = useToast();

  React.useEffect(() => {
    setTimeout(() => {
      setStatus(' ');
    }, 3000);
  }, [status]);

  return (
    <Container>
      <Image src="/logo-IFRO.png" width={200} pt={5} />
      <Text textAlign="center" mt={4} fontWeight={600} fontSize={16}>
        {new Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(new Date())}
      </Text>

      <Box mt={10} p={5} maxWidth={'450px'} minWidth={'200px'}>
        <QrScanner
          scanDelay={3000}
          containerStyle={{
            borderRadius: '15px',
            border: '3px solid #00FF19',
          }}
          hideCount={true}
          constraints={{
            facingMode: 'environment',
            aspectRatio: 1 / 1,
            //width: { min: 640, ideal: 720, max: 1920 },
            //height: { min: 640, ideal: 720, max: 1080 }
          }}
          tracker={true}
          onDecode={() => {
            setStatus('Buscando...');
          }}
          onResult={(result) => {
            if (!toast.isActive('success')) {
              toast({
                title: `${result}`,
                duration: 2000,
                status: 'success',
                isClosable: true,
                position: 'top-right',
                id: 'success',
              });
            }
          }}
          onError={() => {
            if (!toast.isActive('error')) {
              toast({
                title: 'Não foi possível identificar sua Matrícula. Tente novamente.',
                duration: 3000,
                status: 'error',
                isClosable: true,
                id: 'error',
              });
            }
          }}
        />
        <Text mt={10} textAlign={'center'} fontWeight={600} fontSize={20}>
          {status}
        </Text>
      </Box>
    </Container>
  );
}

export default Home;
