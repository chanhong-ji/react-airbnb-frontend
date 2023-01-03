import {
    Avatar,
    Button,
    Center,
    HStack,
    LightMode,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useToast,
} from "@chakra-ui/react";
import { FaAirbnb } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import useMeUser from "../lib/useMeUser";
import { getLogout } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { meLoading, meUser, isLoggedIn } = useMeUser();
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

    const onLogout = async () => {
        const toastId = toast({
            title: "Loading...",
            description: "It takes a few seconds...",
            status: "loading",
        });
        await getLogout();
        queryClient.refetchQueries(["me"]);
        toast.update(toastId, {
            title: "Log out",
            duration: 4000,
            description: "see you later!",
            isClosable: true,
            status: "success",
        });
    };

    return (
        <HStack
            position={"fixed"}
            width={"full"}
            justify={{ base: "center", sm: "center", md: "space-between" }}
            px={20}
            py={5}
            borderBottomWidth={1}
            top={-1}
            left={-1}
        >
            {/* Logo */}
            <Link to={"/"}>
                <Center>
                    <FaAirbnb fontSize={"48"} />
                </Center>
            </Link>

            {/* Buttons */}
            {!meLoading && isLoggedIn ? (
                <Menu>
                    <MenuButton>
                        <Avatar src={meUser?.avatar} name={meUser?.username} />
                    </MenuButton>
                    <MenuList onClick={onLogout}>
                        <MenuItem>Log out</MenuItem>
                    </MenuList>
                </Menu>
            ) : (
                <HStack display={{ base: "none", sm: "none", md: "flex" }}>
                    <ColorModeSwitcher />
                    <Button onClick={onLoginOpen}>Login</Button>
                    <LightMode>
                        <Button colorScheme={"red"} onClick={onSignupOpen}>
                            Sign up
                        </Button>
                    </LightMode>
                </HStack>
            )}

            {/* Modal */}
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
        </HStack>
    );
}
