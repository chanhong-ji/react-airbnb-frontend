import {
  Button,
  Center,
  HStack,
  LightMode,
  useDisclosure,
} from '@chakra-ui/react';
import { FaAirbnb } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { ColorModeSwitcher } from './ColorModeSwitcher';

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
        <Center color={'red'}>
          <FaAirbnb fontSize={'48'} />
        </Center>
      </Link>

      <HStack>
        <ColorModeSwitcher />
        <Button onClick={onLoginOpen}>Login</Button>
        <LightMode>
          <Button colorScheme={'red'} onClick={onSignupOpen}>
            Sign up
          </Button>
        </LightMode>
      </HStack>

      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </HStack>
  );
}
