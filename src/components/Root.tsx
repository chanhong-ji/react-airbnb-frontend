import { VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Root() {
    return (
        <VStack
            position={"relative"}
            pt={"89px"}
            bg={"white"}
            minHeight="100vh"
        >
            <Header />
            <Outlet />
        </VStack>
    );
}
