import { Avatar, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { IReview } from "../types";

export default function Review({ payload, rating, user, created_at }: IReview) {
    const getMonth = (str: string) => {
        const date = new Date(str);
        return date.getFullYear() + "년 " + date.getMonth() + "월";
    };
    return (
        <Grid w={"full"} templateRows={"1fr 2fr"}>
            {/* User info */}
            <HStack mb={3}>
                <Avatar
                    name={user?.username || "Anonymous"}
                    src={user?.avatar}
                    size={"md"}
                />
                <VStack align={"flex-start"} pl={1} spacing={0}>
                    <Text fontWeight={"semibold"}>
                        {user?.username || "Anonymous"}
                    </Text>
                    <Text fontSize={"sm"} color={"gray"}>
                        {getMonth(created_at)}
                    </Text>
                </VStack>
            </HStack>

            {/* Payload */}
            <Text overflow="hidden" fontSize={"sm"}>
                {payload}
            </Text>
        </Grid>
    );
}
