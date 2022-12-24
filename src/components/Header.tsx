import { Button, Center, HStack, useDisclosure } from '@chakra-ui/react';
import { FaAirbnb } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default function Header() {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();

  return (
    <HStack justify={'space-between'} px={10} py={5} borderBottomWidth={1}>
      <Link to={'/'}>
        <Center>
          <FaAirbnb fontSize={'48'} />
        </Center>
      </Link>
      <HStack>
        <Button onClick={onLoginOpen}>Login</Button>
        <Button colorScheme={'red'} onClick={onSignupOpen}>
          Sign up
        </Button>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </HStack>
  );
}
