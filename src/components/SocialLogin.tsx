import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";
import config from "../config";

export default function SocialLogin() {
    const getGithubUrl = () => {
        const params = new URLSearchParams({
            client_id: config.gh.clientId,
            scope: "read:user,user:email",
        }).toString();
        return `https://github.com/login/oauth/authorize?` + params;
    };

    const getKakaoUrl = () => {
        const params = new URLSearchParams({
            client_id: config.kakao.clientId,
            response_type: "code",
            redirect_uri: config.kakao.redirectUrl,
        }).toString();
        return `https://kauth.kakao.com/oauth/authorize?` + params;
    };

    return (
        <Box>
            <HStack my={"8"}>
                <Divider />
                <Text
                    fontSize={"xs"}
                    textTransform={"uppercase"}
                    color={"gray.500"}
                    as={"b"}
                >
                    Or
                </Text>
                <Divider />
            </HStack>
            <VStack>
                <Button
                    w={"100%"}
                    colorScheme={"gray"}
                    fontWeight="semibold"
                    leftIcon={<FaGithub />}
                    as={"a"}
                    href={getGithubUrl()}
                >
                    Continue with Github
                </Button>
                <Button
                    w={"100%"}
                    colorScheme={"yellow"}
                    fontWeight="semibold"
                    leftIcon={<FaComment />}
                    as={"a"}
                    href={getKakaoUrl()}
                >
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    );
}
