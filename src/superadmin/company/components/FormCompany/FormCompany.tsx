import { Button, FileInput, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconImageInPicture, IconPhotoUp } from '@tabler/icons-react';

interface FormCompanyProps {
  onSubmit: (data: any) => void;
  opened: boolean;
  loading: boolean;
  onClose: () => void;
}

export const FormCompany: React.FC<FormCompanyProps> = ({ onSubmit, opened, loading, onClose }) => {
  const form = useForm({
    initialValues: {
      name: '',
      shift_active: '1',
      company_url: '',
      company_logo: null as File | null,
    },
  });

  //   Mengeksesi form data company
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name: form.values.name,
      companyUrl: form.values.company_url,
      company_logo: form.values.company_logo,
      shift_active: form.values.shift_active === '1' ? true : false,
    };
    console.log(data);
    try {
      onSubmit(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<span className="font-semibold">Form Company</span>}
      size={'xl'}
    >
      <section className="grid grid-cols-2 gap-2">
        <form onSubmit={handleSubmit}>
          <TextInput
            className="mb-3"
            label="Nama Company"
            placeholder="Nama Company"
            required
            {...form.getInputProps('name')}
          />
          <TextInput
            className="mb-3"
            label="URL Company"
            placeholder="URL atau LINK Company"
            required
            {...form.getInputProps('company_url')}
          />

          <Select
            label="Status Fitur Shift"
            className="mb-3"
            placeholder="Pilih"
            required
            defaultValue={form.values.shift_active}
            data={[
              { value: '1', label: 'Aktif' },
              { value: '0', label: 'Tidak Aktif' },
            ]}
            {...form.getInputProps('shift_active')}
          />

          <FileInput
            onChange={(file) => form.setFieldValue('company_logo', file)}
            accept="image/png,image/jpeg"
            leftSection={<IconPhotoUp size={18} />}
            label="Logo Company"
            placeholder="Pilih Logo Company"
            leftSectionPointerEvents="none"
          />

          <div className="flex gap-3">
            <Button type="submit" color="blue" className="mt-5" loading={loading}>
              Simpan
            </Button>
            <Button
              onClick={() => {
                onClose();
              }}
              type="button"
              color="gray"
              className="mt-5"
            >
              Batal
            </Button>
          </div>
        </form>

        {form.values.company_logo ? (
          <div className="bg-slate-100 mt-5 h-44 max-h-44 rounded-md flex items-center overflow-hidden border border-slate-400">
            <img
              src={URL.createObjectURL(form.values.company_logo)}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="bg-slate-100 mt-5 h-44 max-h-44 rounded-lg flex items-center">
            <IconImageInPicture className="m-auto" size={20} />
          </div>
        )}
      </section>
    </Modal>
  );
};
