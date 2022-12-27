import { Wrap } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Root() {
  return (
    <Wrap>
      <Header />
      <Outlet />
    </Wrap>
  );
}
