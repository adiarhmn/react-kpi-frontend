import { ActionIcon, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const CreateDivision: React.FC = () => {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { division_name: '' },
    validate: {
      division_name: (value) => (value.length < 10 ? 'Name must have at least 10 letters' : null),
    },
  });

  const navigate = useNavigate();
  const NavBack = () => {
    navigate(-1);
  };
  type DivisionDataPost = {
    division_name: string;
  };
  const postCreateDivision = async (divisionDataPost: DivisionDataPost) => {
    const response = await axios.post(`${BaseURL}/division`, divisionDataPost);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postCreateDivision,
    onSuccess: (data) => {
      console.log(data);
      if (data.status == 201) {
        navigate(-1);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const divisionDataPost = {
      division_name: form.values.division_name,
    };
    mutation.mutateAsync(divisionDataPost);
  };

  return (
    <main>
      <section className="bg-white p-5 rounded-lg">
        <div className="flex gap-3 items-center">
          <ActionIcon onClick={NavBack} color="blue">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <h2 className="font-bold">Tambah Divisi</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk menambahkan divisi
            </div>
          </div>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <TextInput
              className="mb-3"
              label="Nama Divisi"
              placeholder="Nama Divisi"
              required
              {...form.getInputProps('division_name')}
            />
            <div className="flex gap-3">
              {mutation.isPending ? (
                <Button color="blue" className="mt-5" disabled>
                  Loading...
                </Button>
              ) : (
                <Button type="submit" color="blue" className="mt-5">
                  Simpan
                </Button>
              )}
              <Button onClick={NavBack} type="button" color="gray" className="mt-5">
                Batal
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
