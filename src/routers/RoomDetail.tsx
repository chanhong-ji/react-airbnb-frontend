import {
    Avatar,
    Box,
    Divider,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    SimpleGrid,
    Skeleton,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoom } from "../api";
import { IRoom } from "../types";
import { FaStar } from "react-icons/fa";
import Reviews from "../components/Reviews";
import BookingCalendar from "../components/BookingCalendar";

export default function Room() {
    const { roomPk } = useParams();
    const { isLoading, data: room } = useQuery<IRoom>(
        [`room:${roomPk}`, roomPk],
        getRoom
    );

    return (
        <VStack w={"53vw"}>
            {!isLoading && room && (
                <>
                    {/* Title */}
                    <SimpleGrid row={2} py={4} px={3} width="full">
                        <Heading fontSize={"2xl"}>{room.name}</Heading>
                        <HStack
                            pt={2}
                            fontSize={"sm"}
                            fontWeight="semibold"
                            justify={"space-between"}
                        >
                            <HStack>
                                <HStack>
                                    <FaStar />
                                    <Text>4.97</Text>
                                </HStack>
                                <Link to={"reviews"}>
                                    <Text textDecor={"underline"}>
                                        후기 256 개
                                    </Text>
                                </Link>
                                <Text>위치, 한국</Text>
                            </HStack>
                            <HStack>
                                <Box>
                                    <Text>공유하기</Text>
                                </Box>
                                <Box>
                                    <Text>저장</Text>
                                </Box>
                            </HStack>
                        </HStack>
                    </SimpleGrid>

                    {/* Photos */}
                    <Grid
                        h={"27vw"}
                        w={"full"}
                        templateColumns={"repeat(4, 1fr)"}
                        templateRows={"1fr 1fr"}
                        gap={2}
                        overflow={"hidden"}
                        rounded={"xl"}
                    >
                        {[0, 1, 2, 3, 4].map((index) => (
                            <GridItem
                                colSpan={index === 0 ? 2 : 1}
                                rowSpan={index === 0 ? 2 : 1}
                                overflow={"hidden"}
                                key={index}
                                bg="whitesmoke"
                            >
                                <Skeleton
                                    isLoaded={!isLoading}
                                    h="100%"
                                    w="100%"
                                >
                                    {index < room.photos.length && (
                                        <Image
                                            objectFit={"cover"}
                                            w="100%"
                                            h="100%"
                                            src={room.photos[index].file}
                                        />
                                    )}
                                </Skeleton>
                            </GridItem>
                        ))}
                    </Grid>

                    {/* Info */}
                    <Grid templateColumns={"2fr 1fr"} columnGap={10} pt={4}>
                        <Box>
                            <HStack px={1} py={5} justify={"space-between"}>
                                <SimpleGrid column={1}>
                                    <Heading fontSize={"xl"}>
                                        {room.owner.username}님이 호스팅하는
                                        펜션
                                    </Heading>
                                    <HStack mt={1.5} fontSize={"sm"}>
                                        <Text>최대인원 x명</Text>
                                        <span aria-hidden="true">·</span>
                                        <Text>방 {room.rooms}개</Text>
                                        <span aria-hidden="true">·</span>
                                        <Text>욕실 {room.toilets}개</Text>
                                    </HStack>
                                </SimpleGrid>
                                <Avatar
                                    name={room.owner.username}
                                    src={room.owner.avatar}
                                />
                            </HStack>
                        </Box>
                        <BookingCalendar
                            booked={room.booked}
                            checkInDisable={room.check_in_disable}
                        />
                    </Grid>

                    {/* Reviews */}
                    <Divider />
                    <Reviews owner={room.owner} rating={room.rating} />
                </>
            )}
        </VStack>
    );
}
