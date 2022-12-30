import { AspectRatio, Box, HStack, Skeleton } from '@chakra-ui/react';

export default function RoomSkeleton() {
  return (
    <Box>
      <AspectRatio ratio={1}>
        <Skeleton rounded={'xl'} />
      </AspectRatio>
      <HStack justifyContent={'space-between'} mt={2}>
        <Skeleton rounded='lg' width='60%' height={5} />
        <Skeleton rounded='lg' width='15%' height={5} />
      </HStack>
      <Skeleton rounded='lg' width='30%' height={4} mt={1} />
      <Skeleton rounded='lg' width='30%' height={4} mt={1} />
      <Skeleton rounded='lg' width='25%' height={5} mt={2} />
    </Box>
  );
}
