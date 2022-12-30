import { Center, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getRoomReviews } from '../api';
import { IPublicUser, IReview } from '../types';
import Review from './Review';

interface IProps {
    owner: IPublicUser;
    rating: number;
}

export default function Reviews({ owner, rating }: IProps) {
    const { roomPk } = useParams();
    const { isLoading, data: reviews } = useQuery<IReview[]>(
        ['room', roomPk, 'reviews'],
        getRoomReviews
    );
    return (
        <VStack w={'full'}>
            {/* Title */}
            <HStack w={'full'} p={6} fontSize={'xl'} fontWeight='bold'>
                <Center fontSize={'sm'}>
                    <FaStar />
                </Center>
                <Text>{rating.toPrecision(2)}</Text>
                <span aria-hidden='true'>·</span>
                <Text>후기 {reviews?.length}개</Text>
            </HStack>

            {/* Reviews */}
            <SimpleGrid columns={2} w='full' spacing={1}>
                {reviews?.slice(0, 5).map((review) => (
                    <Review {...review} key={review.created_at} />
                ))}
            </SimpleGrid>
        </VStack>
    );
}
