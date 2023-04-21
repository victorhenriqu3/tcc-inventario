import { Box, Image, Text } from "@chakra-ui/react";

function Home() {
  return (
    <Box alignItems='center'><Image src="/logo-IFRO.png" width={200} pt={5} />
      <Text textAlign='center' mt={4} fontWeight={600} fontSize={16}>{new Intl.DateTimeFormat('pt-BR', {
        dateStyle:'short', timeStyle: 'short'
      }).format(new Date())}</Text></Box>);
}

export default Home;
