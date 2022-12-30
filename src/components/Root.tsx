import { Wrap } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Root() {
  return (
    <Wrap position={'relative'} pt={'89px'} justify={'center'}>
      <Header />
      <Outlet />
    </Wrap>
  );
}
