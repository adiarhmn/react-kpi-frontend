/* eslint-disable linebreak-style */
import { Modal, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustmentsCog, IconAlertCircle } from '@tabler/icons-react';

import { Companys } from '@/features/auth';
import { useGetCompanys } from '@/superadmin/company';

export const NavSuperadmin: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const ID_COMPANY = localStorage.getItem('id_company') ?? 0;
  const NAME_COMPANY = localStorage.getItem('name_company');

  const { data, isLoading, isError } = useGetCompanys();

  if (isLoading) {
    return (
      <NavLink
        className="rounded-xl mb-1"
        label="Loading"
        component="button"
        leftSection={<IconAlertCircle size={22} />}
        active={true}
        variant="filled"
      />
    );
  }

  const store_idCompany = (id: number, name: string) => {
    try {
      localStorage.setItem('id_company', id.toString());
      localStorage.setItem('name_company', name);
      close();
      window.location.reload();
    } catch (error) {
      console.error('Error storing the company ID:', error);
    }
  };

  if (isError) {
    return (
      <NavLink
        className="rounded-xl mb-1"
        label="Error"
        component="button"
        leftSection={<IconAlertCircle size={22} />}
        active={true}
        variant="filled"
      />
    );
  }

  return (
    <>
      <NavLink
        className="rounded-xl mb-1"
        label={<div className="text-xs">{NAME_COMPANY ?? 'Pilih Company'}</div>}
        component="button"
        onClick={open}
        rightSection={<IconAdjustmentsCog size={22} />}
        active={true}
        variant="filled"
      />

      <Modal opened={opened} onClose={close} title="Daftar Company">
        <div>
          <div className="text-sm font-semibold">Daftar Company</div>
          <div className="text-xs text-slate-400 font-semibold -mt-1">
            Pilih Company Untuk Dikelola
          </div>

          <div className="grid gap-2 mt-5">
            {data.map((company: Companys, index: number) => {
              return (
                <NavLink
                  className="rounded-md mb-1"
                  key={index}
                  label={
                    <div className="flex gap-5">
                      <span>{index + 1}.</span>
                      <span>{company.name}</span>
                    </div>
                  }
                  onClick={() => store_idCompany(company.id ?? 1, company.name)}
                  active={company.id == ID_COMPANY}
                />
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};
