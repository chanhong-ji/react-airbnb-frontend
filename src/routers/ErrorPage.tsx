import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <VStack id='error-page' justify='center' bgColor='gray.100' minH='100vh'>
      <Heading>Page not found.</Heading>
      <Text>It seems that you're lost</Text>
      <Link to='/'>
        <Button colorScheme='blackAlpha'>Go Home</Button>
      </Link>
    </VStack>
  );
}
