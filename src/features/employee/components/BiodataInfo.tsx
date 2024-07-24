import { Text } from '@mantine/core';
import { IconMap2, IconUser } from '@tabler/icons-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

import { EmployeeType } from '@/admin_features/types';
import { formatterDate } from '@/features/history';
type BiodataProps = {
  employee: EmployeeType | undefined;
};

export const BiodataInfo: React.FC<BiodataProps> = ({ employee }) => {
  const BaseURL = import.meta.env.VITE_API_URL;
  return (
    <>
      <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-lg rounded-lg flex flex-col mt-2">
        <div className="flex justify-between items-center text-blue-700">
          <div className="flex items-center">
            <Text fw={700} c="blue">
              Foto profil
            </Text>
          </div>
          <IconUser className="opacity-80" size={25} />
        </div>
        <div className="w-full text-center mx-auto p-2 w-80 text-slate-700 px-2">
          <div className="flex justify-center">
            <div>
              <div className="h-28 w-28 text-white rounded-full">
                {employee?.profile_pic ? (
                  <img
                    src={`${BaseURL}/public/employee-files/${employee?.profile_pic}`}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <img
                    src="/images/profile-pic.svg"
                    alt="Preview"
                    className="h-full w-full object-cover rounded-full"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-4 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center p-2">
          <Text fw={700} c="blue">
            Data diri
          </Text>
          <IconUser className="opacity-80" size={20} />
        </div>
        <div className="w-full pb-2 pt-2 ms-4">
          <div className="gap-2 align-item-left">
            <Text size="xs">Nomor Induk Pegawai</Text>
            <Text size="xs" fw={700}>
              {employee?.nip != null ? employee.nip : '-'}
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">Nama lengkap pegawai</Text>
            <Text size="xs" fw={700}>
              {employee?.name != null ? employee.name : '-'}
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">Pendidikan terakhir</Text>
            <Text size="xs" fw={700}>
              {employee?.last_education != null ? employee?.last_education : '-'}
            </Text>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 pb-2 pt-2 ms-4">
          <div className="gap-2 align-item-left">
            <Text size="xs">Gelar depan</Text>
            <Text size="xs" fw={700}>
              {employee?.first_degree != null ? employee.first_degree : '-'}
            </Text>
          </div>
          <div className="ps-2 gap-2 align-item-left">
            <Text size="xs">Gelar belakang</Text>
            <Text size="xs" fw={700}>
              {employee?.last_degree != null ? employee.last_degree : '-'}
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">Jenis kelamin</Text>
            <Text size="xs" fw={700}>
              {employee?.sex != null ? employee.sex : '-'}
            </Text>
          </div>
          <div className="mt-2 ps-2 gap-2 align-item-left">
            <Text size="xs">Tanggal lahir</Text>
            <Text size="xs" fw={700}>
              {employee?.birth_date ? formatterDate(employee.birth_date, 'dd MMM yyyy') : '-'}
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">No Whatsapp</Text>
            <Text size="xs" fw={700}>
              {employee?.phone != null ? employee.phone : '-'}
            </Text>
          </div>
          <div className="mt-2 ps-2 gap-2 align-item-left">
            <Text size="xs">Agama</Text>
            <Text size="xs" fw={700}>
              {employee?.religion != null ? employee.religion : '-'}
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">Nomor KTP</Text>
            <Text size="xs" fw={700}>
              {employee?.nik != null ? employee.nik : '-'}
            </Text>
          </div>
          <div className="mt-2 mb-2 ps-2 gap-2 align-item-left">
            <Text size="xs">Nomor BPJS </Text>
            <Text size="xs" fw={700}>
              {employee?.no_bpjs != null ? employee.no_bpjs : '-'}
            </Text>
          </div>
        </div>
      </section>
      <section className="bg-white mx-auto max-w-xs w-full mt-2 mb-6 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center p-2">
          <Text fw={700} c="blue">
            Data alamat
          </Text>
          <IconMap2 className="opacity-80" size={20} />
        </div>
        <div className="w-full grid grid-cols-2  pb-2 pt-2 ms-4">
          <div className="gap-2 align-item-left">
            <Text size="xs">Provinsi</Text>
            <Text size="xs" fw={700}>
              {employee?.province != null ? employee.province : '-'}
            </Text>
          </div>
          <div className="ps-2 gap-2 align-item-left">
            <Text size="xs">Kabupaten</Text>
            <Text size="xs" fw={700}>
              {employee?.district != null ? employee.district : '-'}
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">Kecamatan</Text>
            <Text size="xs" fw={700}>
              {employee?.subdistrict != null ? employee.subdistrict : '-'}
            </Text>
          </div>
          <div className="mt-2 ps-2 gap-2 align-item-left">
            <Text size="xs">Kelurahan</Text>
            <Text size="xs" fw={700}>
              {employee?.village != null ? employee.village : '-'}
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">RT</Text>
            <Text size="xs" fw={700}>
              {employee?.rt != null ? employee.rt : '-'}
            </Text>
          </div>
          <div className="mt-2 ps-2 gap-2 align-item-left">
            <Text size="xs">RW</Text>
            <Text size="xs" fw={700}>
              {employee?.rw != null ? employee.rw : '-'}
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">Kode POS</Text>
            <Text size="xs" fw={700}>
              {employee?.postal_code != null ? employee.postal_code : '-'}
            </Text>
          </div>
        </div>
      </section>
    </>
  );
};
