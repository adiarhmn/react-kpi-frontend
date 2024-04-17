import { Text } from '@mantine/core';
import { IconChevronRight, IconMap2, IconUser } from '@tabler/icons-react';

export const BiodataInfo: React.FC = () => {
  return (
    <>
      <section className="bg-white mx-auto max-w-xs w-full mt-4 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-blue-700">Data diri pegawai</span>
          <IconUser className="opacity-80" size={20} />
        </div>
        <div className="w-full pb-2 pt-2 ms-4">
          <div className="gap-2 align-item-left">
            <Text size="xs">Nomor Induk Pegawai</Text>
            <Text size="xs" fw={700}>
              2201301122
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">Nama lengkap pegawai</Text>
            <Text size="xs" fw={700}>
              Dian Lucky Prayogi
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">Pendidikan terakhir</Text>
            <Text size="xs" fw={700}>
              SMKN 3 Boyolangu
            </Text>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 pb-2 pt-2 ms-4">
          <div className="gap-2 align-item-left">
            <Text size="xs">Gelar depan</Text>
            <Text size="xs" fw={700}>
              -
            </Text>
          </div>
          <div className="ps-2 gap-2 align-item-left">
            <Text size="xs">Gelar belakang</Text>
            <Text size="xs" fw={700}>
              -
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">Jenis kelamin</Text>
            <Text size="xs" fw={700}>
              Laki - laki
            </Text>
          </div>
          <div className="mt-2 ps-2 gap-2 align-item-left">
            <Text size="xs">Tanggal lahir</Text>
            <Text size="xs" fw={700}>
              23 Mei 2003
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">No Whatsapp</Text>
            <Text size="xs" fw={700}>
              081349445267
            </Text>
          </div>
          <div className="mt-2 ps-2 gap-2 align-item-left">
            <Text size="xs">Agama</Text>
            <Text size="xs" fw={700}>
              Islam
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">Nomor KTP</Text>
            <Text size="xs" fw={700}>
              350404xxxxxxxxx2
            </Text>
          </div>
          <div className="mt-2 mb-2 ps-2 gap-2 align-item-left">
            <Text size="xs">Nomor BPJS </Text>
            <Text size="xs" fw={700}>
              -
            </Text>
          </div>
        </div>
      </section>
      <section className="bg-white mx-auto max-w-xs w-full mt-2 mb-6 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-blue-700">Data alamat pegawai</span>
          <IconMap2 className="opacity-80" size={20} />
        </div>
        <div className="w-full grid grid-cols-2  pb-2 pt-2 ms-4">
          <div className="gap-2 align-item-left">
            <Text size="xs">Provinsi</Text>
            <Text size="xs" fw={700}>
              Jawa Timur
            </Text>
          </div>
          <div className="ps-2 gap-2 align-item-left">
            <Text size="xs">Kabupaten</Text>
            <Text size="xs" fw={700}>
              Tulungagung
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">Kecamatan</Text>
            <Text size="xs" fw={700}>
              Ngantru
            </Text>
          </div>
          <div className="mt-2 ps-2 gap-2 align-item-left">
            <Text size="xs">Kelurahan</Text>
            <Text size="xs" fw={700}>
              Pulerejo
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">RT</Text>
            <Text size="xs" fw={700}>
              003
            </Text>
          </div>
          <div className="mt-2 ps-2 gap-2 align-item-left">
            <Text size="xs">RW</Text>
            <Text size="xs" fw={700}>
              001
            </Text>
          </div>
          <div className="mt-2 gap-2 align-item-left">
            <Text size="xs">Kode POS</Text>
            <Text size="xs" fw={700}>
              66252
            </Text>
          </div>
        </div>
      </section>
    </>
  );
};
