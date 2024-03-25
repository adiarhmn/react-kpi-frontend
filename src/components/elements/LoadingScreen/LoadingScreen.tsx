import { Center, Loader } from '@mantine/core';

export const LoadingScreen: React.FC = () => {
  return (
    <Center className="w-full h-screen">
      <Loader />
    </Center>
  );
};
