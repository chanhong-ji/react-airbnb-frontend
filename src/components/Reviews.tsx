import { useQuery } from "@tanstack/react-query";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";
import { getRoomReviews } from "../api";
import { IReview } from "../types";
import {
    Divider,
    Grid,
    HStack,
    SimpleGrid,
    Text,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Center,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";
import Review from "./Review";

interface IProps {
    roomPk: string;
    rating: number;
    totalReviews: number;
}

export default function Reviews({ roomPk, rating, totalReviews }: IProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [page, setPage] = useState(1);
    const lastPage = Math.floor(totalReviews / 6) + 1;

    const { data: reviews } = useQuery<IReview[]>(
        ["room", roomPk, "reviews", page],
        getRoomReviews
    );

    const onPrevPage = () => {
        setPage((now) => now - 1);
    };
    const onNextPage = () => {
        setPage((now) => now + 1);
    };

    return (
        <>
            {/* Title */}
            <VStack w={"full"}>
                <HStack w={"full"} p={6} fontSize={"xl"} fontWeight="bold">
                    <Center fontSize={"sm"}>
                        <FaStar />
                    </Center>
                    <Text>{rating.toPrecision(2)}</Text>
                    <span aria-hidden="true">·</span>
                    <Text>후기 {totalReviews}개</Text>
                </HStack>

                {/* Reviews */}
                <SimpleGrid columns={2} w="full" spacing={1}>
                    {reviews?.slice(0, 5).map((review) => (
                        <Review {...review} key={review.created_at} />
                    ))}
                </SimpleGrid>
            </VStack>
            <Button onClick={onOpen} alignSelf="start" variant={"outline"}>
                후기 {totalReviews}개 모두 보기
            </Button>
            <Divider />

            {/* Review Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay />
                <ModalContent width={"full"}>
                    <ModalHeader>후기 {totalReviews}개</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid templateColumns={"1fr 1fr"}>
                            {reviews?.map((review) => (
                                <Review key={review.pk} {...review} />
                            ))}
                        </Grid>
                    </ModalBody>

                    <ModalFooter justifyContent={"center"} position="relative">
                        <Box>
                            <Button
                                mr={3}
                                isDisabled={page === 1}
                                onClick={onPrevPage}
                            >
                                <FaAngleLeft />
                            </Button>
                            <Button
                                onClick={onNextPage}
                                isDisabled={page === lastPage}
                            >
                                <FaAngleRight />
                            </Button>
                        </Box>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={onClose}
                            position="absolute"
                            right={2}
                            bottom={4}
                        >
                            닫기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
