import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FaComment, FaGithub } from 'react-icons/fa';

export default function SocialLogin() {
  return (
    <Box>
      <HStack my={'8'}>
        <Divider />
        <Text
          fontSize={'xs'}
          textTransform={'uppercase'}
          color={'gray.500'}
          as={'b'}
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          w={'100%'}
          colorScheme={'blue'}
          fontWeight='semibold'
          leftIcon={<FaGithub />}
        >
          Continue with Github
        </Button>
        <Button
          w={'100%'}
          colorScheme={'yellow'}
          fontWeight='semibold'
          leftIcon={<FaComment />}
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
