import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getKakaoLogin } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function KakaoConfirm() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { search } = useLocation();
    const toast = useToast();

    const confirmLogin = async () => {
        const code = new URLSearchParams(search).get("code");
        if (!code) {
            return navigate("/");
        }

        const { status, data } = await getKakaoLogin(code);

        if (status === 200) {
            queryClient.refetchQueries(["me"]);
            navigate("/");
            toast({
                status: "success",
                title: "Login",
                description: "Welcome to come back!!",
            });
        } else if (status === 201) {
            queryClient.refetchQueries(["me"]);
            navigate("/");
            toast({
                status: "success",
                title: "Sign up",
                description: "Welcome!",
            });
        } else {
            navigate("/");
            toast({
                status: "error",
                title: "Fail",
                description: data?.message || "",
            });
        }
    };

    useEffect(() => {
        confirmLogin();
    }, []);

    return (
        <VStack justify="center">
            <Heading mt={"200px"}>Kakao Login...</Heading>
            <Spinner size={"lg"} />
            <Text>Please wait for a few seconds...</Text>
        </VStack>
    );
}
