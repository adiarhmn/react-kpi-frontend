import { Avatar, Badge, Button, FileInput, Modal, Select, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconChevronRight, IconImageInPicture, IconPhotoUp, IconPlus } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Companys, useAuth } from '@/features/auth';
import { useCreateCompany, useGetCompanys, useUpdateCompany } from '@/superadmin/company';
import { FormCompany } from '@/superadmin/company/components';

export const DashboardSuperadmin: React.FC = () => {
  const { creds } = useAuth();

  const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Company, setCompany] = useState<Companys | undefined>(undefined);
  const navigate = useNavigate();
  if (creds === null) navigate('/login');

  const { data: CompanyList, isLoading: LoadCompany, refetch } = useGetCompanys();

  // Create Company
  const MutationCreate = useCreateCompany();
  const MutationUpdate = useUpdateCompany();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);

  const handleCreate = async (data: any) => {
    MutationCreate.mutateAsync(data, {
      onSuccess() {
        close();
        refetch();
        notifications.show({
          title: 'Berhasil',
          message: 'Company berhasil ditambahkan',
          color: 'teal',
        });
      },
    });
  };

  const formEdit = useForm({
    initialValues: {
      id: 0,
      name: '',
      shift_active: '1',
      is_freelanced: '0',
      companyUrl: '',
      company_logo: null as File | null,
    },
  });

  const editCompany = (company: Companys) => {
    setCompany(company);
    openEdit();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formEdit.values);
    MutationUpdate.mutateAsync(formEdit.values, {
      onSuccess() {
        closeEdit();
        refetch();
        notifications.show({
          title: 'Berhasil',
          message: 'Company berhasil diupdate',
          color: 'teal',
        });
      },
    });
  };

  useEffect(() => {
    if (Company) {
      formEdit.setValues({
        id: Company.id,
        name: Company.name,
        shift_active: Company.shift_active ? '1' : '0',
        is_freelanced: Company.is_freelanced ? '1' : '0',
        companyUrl: Company.companyUrl,
        company_logo: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Company]);

  // Change Company
  const handleChangeCompany = (company: Companys) => {
    setCompany(company);
    if (company?.id) {
      localStorage.setItem('id_company', company?.id.toString());
      localStorage.setItem('COMPANY_DATA', JSON.stringify(company));
      localStorage.setItem('name_company', company?.name);
    }
    window.location.reload();
  };

  // Get Data Companys
  // Loading Get Data Companys
  if (LoadCompany) return <div>Loading...</div>;
  // RENDER COMPONENT =====================================================
  return (
    <main>
      {/* Dashboard Superadmin */}
      <section className="m-3 mx-7 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="font-semibold text-xl">
          Selamat Datang <span className="text-blue-600 font-semibold">Superadmin,</span>
        </h1>
      </section>

      {/* Daftar atau List Daftar Company */}
      <section className="m-3 mt-5 mx-7 p-6 bg-white rounded-lg shadow-lg">
        <div id="Header-List-Company" className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">Daftar Company atau Perusahaan</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar Company atau Perusahaan yang terdaftar
            </div>
          </div>

          <Button onClick={open} leftSection={<IconPlus size={18} />}>
            Tambah Company Baru
          </Button>
        </div>
        <div id="DataCompany" className="grid grid-cols-1 mt-5">
          <div id="ListCompany">
            <Table withColumnBorders withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="font-semibold" style={{ width: 70, textAlign: 'center' }}>
                    No
                  </Table.Th>
                  <Table.Th className="font-semibold">Logo</Table.Th>
                  <Table.Th className="font-semibold">Nama Company</Table.Th>
                  <Table.Th className="font-semibold">URL Company</Table.Th>
                  <Table.Th className="font-semibold">Status Shift</Table.Th>
                  <Table.Th className="font-semibold" style={{ width: 150, textAlign: 'center' }}>
                    Kelola Company
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {CompanyList?.map((company: Companys, index: number) => {
                  return (
                    <Table.Tr key={index}>
                      <Table.Td style={{ width: 70, textAlign: 'center' }}>{index + 1}</Table.Td>
                      <Table.Td style={{ width: 80 }}>
                        <Avatar
                          size={'lg'}
                          src={`${BaseURL}/public/company-logo/${company.company_logo}`}
                          radius={'sm'}
                        />
                      </Table.Td>
                      <Table.Td>{company?.name}</Table.Td>
                      <Table.Td>{company?.companyUrl}</Table.Td>
                      <Table.Td>{company?.shift_active == true ? 'Aktif' : 'Tidak Aktif'}</Table.Td>
                      <Table.Td>
                        {company?.is_freelanced ? (
                          <Badge color="teal">Freelance</Badge>
                        ) : (
                          <Badge color="gray">NonFreelance</Badge>
                        )}
                      </Table.Td>
                      <Table.Td>
                        <div className="flex gap-2 items-center justify-center">
                          <Button
                            onClick={() => handleChangeCompany(company)}
                            color="blue"
                            rightSection={<IconChevronRight size={20} />}
                          >
                            Masuk Company
                          </Button>
                          <Button
                            onClick={() => editCompany(company)}
                            color="yellow"
                            rightSection={<IconChevronRight size={20} />}
                          >
                            Edit
                          </Button>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </div>
        </div>
      </section>

      {/* Form Company */}
      <FormCompany
        onSubmit={handleCreate}
        onClose={close}
        loading={MutationCreate.isPending}
        opened={opened}
      />

      <Modal
        opened={openedEdit}
        onClose={closeEdit}
        title={<span className="font-semibold">Form Edit Company</span>}
        size={'xl'}
      >
        <section className="grid grid-cols-2 gap-2">
          <form onSubmit={handleSubmit}>
            <TextInput
              className="mb-3"
              label="Nama Company"
              placeholder="Nama Company"
              required
              {...formEdit.getInputProps('name')}
            />
            <TextInput
              className="mb-3"
              label="URL Company"
              placeholder="URL atau LINK Company"
              required
              {...formEdit.getInputProps('companyUrl')}
            />

            <Select
              label="Status Fitur Shift"
              className="mb-3"
              placeholder="Pilih"
              required
              data={[
                { value: '1', label: 'Aktif' },
                { value: '0', label: 'Tidak Aktif' },
              ]}
              {...formEdit.getInputProps('shift_active')}
            />
            <Select
              label="Status Fitur Pekerja Lepas"
              className="mb-3"
              placeholder="Pilih"
              required
              data={[
                { value: '1', label: 'Aktif' },
                { value: '0', label: 'Tidak Aktif' },
              ]}
              {...formEdit.getInputProps('is_freelanced')}
            />

            <FileInput
              onChange={(file) => formEdit.setFieldValue('company_logo', file)}
              accept="image/png,image/jpeg"
              leftSection={<IconPhotoUp size={18} />}
              label="Logo Company"
              placeholder="Pilih Logo Company"
              leftSectionPointerEvents="none"
            />

            <div className="flex gap-3">
              <Button type="submit" color="blue" className="mt-5">
                Simpan
              </Button>
              <Button
                onClick={() => {
                  closeEdit();
                }}
                type="button"
                color="gray"
                className="mt-5"
              >
                Batal
              </Button>
            </div>
          </form>

          {formEdit.values.company_logo ? (
            <div className="bg-slate-100 mt-5 h-44 max-h-44 rounded-md flex items-center overflow-hidden border border-slate-400">
              <img
                src={URL.createObjectURL(formEdit.values.company_logo)}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <>
              {Company?.company_logo ? (
                <div className="bg-slate-100 mt-5 h-44 max-h-44 rounded-md flex items-center overflow-hidden border border-slate-400">
                  <img
                    src={`${BaseURL}/public/company-logo/${Company?.company_logo}`}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="bg-slate-100 mt-5 h-44 max-h-44 rounded-lg flex items-center">
                  <IconImageInPicture className="m-auto" size={20} />
                </div>
              )}
            </>
          )}
        </section>
      </Modal>
    </main>
  );
};
