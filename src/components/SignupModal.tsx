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
    Text,
    useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { IPasswordSignupForm, ISignupError } from "../types";
import SocialLogin from "./SocialLogin";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPasswordSignup } from "../api";
import { useNavigate } from "react-router-dom";

interface ISignupProps {
    isOpen: boolean;
    onClose: () => void;
}

function ErrorMessage({ message }: { message: string }) {
    return (
        <Text
            fontSize={"sm"}
            fontWeight={"semibold"}
            color="red.400"
            mt={-2}
            mb={2}
            textAlign={"center"}
        >
            {message}
        </Text>
    );
}

export default function SignupModal({ isOpen, onClose }: ISignupProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        getValues,
        setError,
        clearErrors,
        setFocus,
        reset,
    } = useForm<IPasswordSignupForm>();
    const queryClient = useQueryClient();
    const [IsPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
    const watchPasswordConfirm = watch(["password", "passwordConfirm"]);
    const toast = useToast();

    const mutation = useMutation<any, ISignupError, any>(getPasswordSignup, {
        onSuccess() {
            toast({
                title: "Sign up",
                description: "Welcome!!",
                status: "success",
            });
            queryClient.refetchQueries(["me"]);
            reset();
            onClose();
        },
        onError({ response: { data } }) {
            if (data.email || data.username) {
                if (data.email) {
                    setError("email", { message: data.email.at(0) });
                }
                if (data.username) {
                    setError("username", { message: data.username.at(0) });
                }
            } else {
                toast({
                    title: "Fail",
                    description: "Request is failed. Please try again",
                    status: "error",
                });
            }
        },
    });

    useEffect(() => {
        setIsPasswordConfirmed(
            !!getValues("passwordConfirm") &&
                getValues("password") === getValues("passwordConfirm")
        );
    }, [watchPasswordConfirm]);

    const onSubmit = ({
        username,
        email,
        password,
        passwordConfirm,
    }: IPasswordSignupForm) => {
        if (password !== passwordConfirm) {
            setError("result", { message: "Password confirm wrong" });
            setFocus("password");
            return;
        }

        mutation.mutate({ username, email, password });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign Up</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={"5"}>
                    {/* Form */}

                    <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}

                        <InputGroup size={"md"} mb={2}>
                            <InputLeftElement
                                children={
                                    <Center color={"grey"}>
                                        <FaEnvelope />
                                    </Center>
                                }
                            />
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                variant={"filled"}
                                {...register("email", {
                                    required: true,
                                    onChange: () => clearErrors("email"),
                                })}
                                isInvalid={!!errors.email}
                            />
                        </InputGroup>
                        {errors.email?.message && (
                            <ErrorMessage message={errors.email.message} />
                        )}

                        {/* Username */}
                        <InputGroup size={"md"} mb={2}>
                            <InputLeftElement
                                children={
                                    <Center color={"grey"}>
                                        <FaUser />
                                    </Center>
                                }
                            />
                            <Input
                                id="username"
                                placeholder="Username"
                                variant={"filled"}
                                {...register("username", {
                                    required: true,
                                    onChange: () => clearErrors("username"),
                                })}
                                isInvalid={!!errors.username}
                            />
                        </InputGroup>
                        {errors.username?.message && (
                            <ErrorMessage message={errors.username.message} />
                        )}

                        {/* Password */}
                        <InputGroup size={"md"} mb={2}>
                            <InputLeftElement
                                children={
                                    <Center color={"grey"}>
                                        <FaLock />
                                    </Center>
                                }
                            />
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                variant={"filled"}
                                {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 10,
                                        message: "It should be longer that 10",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message:
                                            "It should be shorter than or equal to 20",
                                    },
                                    onChange: () => clearErrors("result"),
                                })}
                                isInvalid={!!errors.password}
                                minLength={10}
                                maxLength={50}
                            />
                        </InputGroup>
                        {errors.password?.message && (
                            <ErrorMessage message={errors.password.message} />
                        )}

                        {/* Password Confirm */}
                        <InputGroup size={"md"} mb={2}>
                            <InputLeftElement
                                children={
                                    <Checkbox
                                        defaultChecked={false}
                                        isChecked={IsPasswordConfirmed}
                                        isDisabled
                                    />
                                }
                            />
                            <Input
                                id="passwordConfirm"
                                type="password"
                                placeholder="Password Confirm"
                                variant={"filled"}
                                {...register("passwordConfirm", {
                                    required: true,
                                    maxLength: 20,
                                })}
                                isInvalid={!!errors.passwordConfirm}
                            />
                        </InputGroup>
                        {errors.result?.message && (
                            <ErrorMessage message={errors.result.message} />
                        )}

                        {/* Signup Button */}
                        <Button
                            type="submit"
                            width="100%"
                            colorScheme={"red"}
                            mt={4}
                        >
                            Sign Up
                        </Button>
                    </FormControl>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
