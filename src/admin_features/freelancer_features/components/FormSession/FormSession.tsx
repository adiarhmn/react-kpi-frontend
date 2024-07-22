import { TextInput } from '@mantine/core';

export const FormSession: React.FC = () => {
  return (
    <form>
      <TextInput className="mb-3" label="Nama Sesi" placeholder="Nama Sesi" required />
    </form>
  );
};
