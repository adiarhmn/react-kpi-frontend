import { Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { getEduBackground } from '../api/getEduBackground';

export const EduList: React.FC = () => {
  const [Educations, setEdu] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await getEduBackground();
      setEdu(res);
    }
    fetchUsers();
  }, []);

  // console.log(Edu);
  {
    Educations.map((edu, index) => {
      return (
        <section className="bg-white mx-auto max-w-xs w-full mt-4 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
          <div className="flex justify-between text-xs items-center p-2">
            <span className="font-bold text-blue-700">SMA/SMK</span>
            <IconChevronRight className="opacity-80" size={20} />
          </div>
          <div className="w-full grid grid-cols-2 pb-2 pt-2 ms-4">
            <div className="gap-2 align-item-left">
              <Text size="xs">Nama sekolah</Text>
              <Text size="xs" fw={700}>
                SMKN 3 Boyolangu
              </Text>
            </div>
            <div className="ps-2 gap-2 align-item-left">
              <Text size="xs">Jenjang</Text>
              <Text size="xs" fw={700}>
                SMA / SMK
              </Text>
            </div>
            <div className="mt-2 gap-2 align-item-left">
              <Text size="xs">Jurusan</Text>
              <Text size="xs" fw={700}>
                Teknik Otomasi Industri
              </Text>
            </div>
            <div className="mt-2 ps-2 gap-2 align-item-left">
              <Text size="xs">Lulusan asal</Text>
              <Text size="xs" fw={700}>
                Dalam negeri
              </Text>
            </div>
            <div className="mt-2 gap-2 align-item-left">
              <Text size="xs">Tahun masuk</Text>
              <Text size="xs" fw={700}>
                2018
              </Text>
            </div>
            <div className="mt-2 ps-2 gap-2 align-item-left">
              <Text size="xs">Tahun lulus</Text>
              <Text size="xs" fw={700}>
                2022
              </Text>
            </div>
          </div>
        </section>
      );
    });
  }
};
