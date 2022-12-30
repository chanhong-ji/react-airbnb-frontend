import { Grid } from '@chakra-ui/react';
import Room from '../components/Room';
import RoomSkeleton from '../components/RoomSkeleton';
import { useQuery } from '@tanstack/react-query';
import { getRooms } from '../api';
import { IRoomList } from '../types';

const cssConfig = {
  columns: {
    base: '1fr',
    sm: 'repeat(2,1fr)',
    md: 'repeat(3,1fr)',
    lg: 'repeat(3,1fr)',
    xl: 'repeat(5,1fr)',
    '2xl': 'repeat(6,1fr)',
  },
  paddingX: {
    base: 4,
    sm: 5,
    md: 6,
    lg: 10,
    xl: 16,
    '2xl': 20,
  },
};

export default function Home() {
  const { isLoading, data: rooms } = useQuery<IRoomList[]>({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });
  return (
    <Grid
      px={cssConfig.paddingX}
      width={'full'}
      templateColumns={cssConfig.columns}
      columnGap={6}
      rowGap={10}
      pt={5}
    >
      {isLoading && (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      )}
      {rooms?.map((room) => (
        <Room {...room} key={room.pk} />
      ))}
    </Grid>
  );
}
