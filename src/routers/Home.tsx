import { Grid } from '@chakra-ui/react';
import Room from '../components/Room';
import RoomSkeleton from '../components/RoomSkeleton';

export default function Home() {
  const columnConfig = {
    base: '1fr',
    sm: 'repeat(2,1fr)',
    md: 'repeat(3,1fr)',
    lg: 'repeat(3,1fr)',
    xl: 'repeat(5,1fr)',
    '2xl': 'repeat(6,1fr)',
  };
  const pxConfig = {
    base: 4,
    sm: 5,
    md: 6,
    lg: 10,
    xl: 16,
    '2xl': 20,
  };
  return (
    <Grid
      width={'full'}
      templateColumns={columnConfig}
      columnGap={6}
      rowGap={10}
      px={pxConfig}
      pt={5}
    >
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
      <RoomSkeleton />
    </Grid>
  );
}
