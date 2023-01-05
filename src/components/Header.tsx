import {
    Button,
    Center,
    HStack,
    LightMode,
    useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import useMeUser from "../lib/useMeUser";
import CMenu from "./Menu";

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
    const { meLoading, meUser } = useMeUser();

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

            {/* Menu */}
            {!meLoading && meUser ? (
                <CMenu {...meUser} />
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
