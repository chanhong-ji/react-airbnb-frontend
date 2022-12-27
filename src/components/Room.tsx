import {
  Box,
  HStack,
  Image,
  Text,
  Center,
  AspectRatio,
  GridItem,
  Grid,
} from '@chakra-ui/react';
import { FaRegHeart, FaStar } from 'react-icons/fa';

export default function Room() {
  return (
    <GridItem>
      {/* Image */}
      <Box overflow={'hidden'} w='full' rounded='xl' position='relative'>
        <AspectRatio ratio={1}>
          <Image
            boxSize={'full'}
            src='https://a0.muscache.com/im/pictures/c2a3570d-9782-45f1-9a0e-43c7f9580bdd.jpg?im_w=720'
            objectFit={'cover'}
          />
        </AspectRatio>
        <Center
          position='absolute'
          right={4}
          top={4}
          color={'white'}
          cursor={'pointer'}
        >
          <FaRegHeart size={'20px'} />
        </Center>
      </Box>

      {/* Information */}
      <Grid mt={2} px={1} templateRows={'repeat(4, 1fr)'}>
        <Grid w={'full'} templateColumns={'5fr 1fr'}>
          <Text fontSize={'sm'} fontWeight='bold' noOfLines={1}>
            타이틀
          </Text>
          <HStack spacing={'1'} justifySelf={'flex-end'}>
            <FaStar fontSize={'x-small'} />
            <Text fontSize={'sm'}>5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize={'sm'} color='gray' noOfLines={1}>
          거리
        </Text>
        <Text fontSize={'sm'} color='gray' noOfLines={1} mt={-1}>
          날짜
        </Text>
        <Text fontSize={'sm'} fontWeight='semibold' noOfLines={1}>
          가격
        </Text>
      </Grid>
    </GridItem>
  );
}
