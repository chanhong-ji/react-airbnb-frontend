import {
  Button,
  Center,
  Checkbox,
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

interface ISignupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: ISignupProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={'5'}>
          <FormControl>
            <InputGroup size={'md'} mb={2}>
              <InputLeftElement
                children={
                  <Center color={'grey'}>
                    <FaUser />
                  </Center>
                }
              />
              <Input type='email' placeholder='Username' variant={'filled'} />
            </InputGroup>
            <InputGroup size={'md'} mb={2}>
              <InputLeftElement
                children={
                  <Center color={'grey'}>
                    <FaUser />
                  </Center>
                }
              />
              <Input placeholder='Name' variant={'filled'} />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup size={'md'} mb={2}>
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
            <InputGroup size={'md'} mb={2}>
              <InputLeftElement
                children={
                  <Checkbox
                    colorScheme={'blue'}
                    defaultChecked={false}
                    // checked={false}
                    isReadOnly
                  />
                }
              />
              <Input
                type='password'
                placeholder='Password Confirm'
                variant={'filled'}
              />
            </InputGroup>
          </FormControl>
          <Button width='100%' colorScheme={'red'} mt={4}>
            Sign Up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
