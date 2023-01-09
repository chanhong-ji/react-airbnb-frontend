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
    Text,
    useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { postPasswordLogin } from "../api";
import { IError, IPasswordLoginForm, IResponse } from "../types";
import SocialLogin from "./SocialLogin";

interface ILoginProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: ILoginProps) {
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation<IResponse, IError, IPasswordLoginForm>(
        postPasswordLogin,
        {
            onSuccess: () => {
                toast({
                    title: "Login",
                    description: "Welcome to come back",
                    duration: 5000,
                    status: "success",
                });
                queryClient.refetchQueries(["me"]);
                reset();
                onClose();
            },
        }
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IPasswordLoginForm>();

    const onSubmit = (data: IPasswordLoginForm) => {
        mutation.mutate(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={"5"}>
                    {/* Form */}

                    <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
                        <InputGroup size={"md"}>
                            <InputLeftElement
                                children={
                                    <Center color={"grey"}>
                                        <FaUser />
                                    </Center>
                                }
                            />
                            <Input
                                placeholder="Username"
                                variant={"filled"}
                                {...register("username", {
                                    required: true,
                                })}
                                isInvalid={!!errors.username}
                                maxLength={150}
                            />
                        </InputGroup>
                        <InputGroup size={"md"} mt={2}>
                            <InputLeftElement
                                children={
                                    <Center color={"grey"}>
                                        <FaLock />
                                    </Center>
                                }
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                variant={"filled"}
                                maxLength={20}
                                {...register("password", {
                                    required: true,
                                })}
                                isInvalid={!!errors.password}
                            />
                        </InputGroup>

                        {/* Login button */}
                        <Button
                            type="submit"
                            width="100%"
                            colorScheme={"red"}
                            mt={4}
                            isLoading={mutation.isLoading}
                        >
                            Login
                        </Button>
                        {mutation.isError && (
                            <Text
                                color="red.500"
                                textAlign={"center"}
                                fontSize="sm"
                                mt={2}
                                fontWeight="semibold"
                            >
                                {mutation.error.response.data.message}
                            </Text>
                        )}
                    </FormControl>

                    {/* Social Login */}
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
