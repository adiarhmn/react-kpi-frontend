import { TextInput } from '@mantine/core';

export const FormFreelancer: React.FC = () => {
  return (
    <form>
      <TextInput className="mb-3" label="Nama Lengkap" placeholder="Nama Lengkap" required />
    </form>
  );
};
