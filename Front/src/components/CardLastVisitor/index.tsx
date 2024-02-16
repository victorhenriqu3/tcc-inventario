import { Card, CardBody, CardFooter, Text } from '@chakra-ui/react';
import * as React from 'react';
import { VisitorsModel } from '../../services/visitors';

const CardLastVisitor: React.FunctionComponent<VisitorsModel> = (props) => {
  return (
    <>
      <Card bg="green.600" color="white" borderRadius={16} w="100%" as="a" href="/visitors">
        <CardBody display="flex" flexDirection="column" justifyContent="space-between">
          <Text fontWeight="600" fontSize={16} bg={'green.700'} borderRadius={8} my={2} p={2}>
            Último Visistante
          </Text>

          <Text fontWeight="600">{props.name ?? 'Não houve registro ainda.'}</Text>
          <Text color="whiteAlpha.800" fontSize={12}>
            {props.phone ?? void 0}
          </Text>
          {/*  <Text mt={3}>{props.reason}</Text> */}
        </CardBody>
        <CardFooter display={props.createdAt ? 'flex' : 'none'} flexDirection="row">
          <Text fontSize="sm" fontWeight="600" me={10}>
            Entrada:
            <br />
            <Text fontWeight="400">{props.createdAt}</Text>
          </Text>
          <Text fontSize="sm" fontWeight="600">
            Saída:
            <br />
            <Text fontWeight="400">{props.updatedAt ?? '--/--/----, --:--'}</Text>
          </Text>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardLastVisitor;
