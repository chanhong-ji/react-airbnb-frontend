import {
  Button,
  Center,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FaLock, FaUser } from 'react-icons/fa';
import SocialLogin from './SocialLogin';

interface ILoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: ILoginProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={'5'}>
          <FormControl pb={'2'}>
            <InputGroup size={'md'}>
              <InputLeftElement
                children={
                  <Center color={'grey'}>
                    <FaUser />
                  </Center>
                }
              />
              <Input type='email' placeholder='Username' variant={'filled'} />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup size={'md'}>
              <InputLeftElement
                children={
                  <Center color={'grey'}>
                    <FaLock />
                  </Center>
                }
              />
              <Input
                type='password'
                placeholder='Password'
                variant={'filled'}
              />
            </InputGroup>
          </FormControl>
          <Button width='100%' colorScheme={'red'} mt={4}>
            Login
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
