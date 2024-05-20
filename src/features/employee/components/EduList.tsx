import { Text } from '@mantine/core';
import { IconChevronRight, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEduBackground } from '../api/EduBackground/getEduBackground';
import { EducationBackground } from '../types';

export const EduList: React.FC = () => {
  const [educations, setEducations] = useState<EducationBackground[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEducations() {
      const data = await getEduBackground();
      setEducations(Array.isArray(data) ? data : []);
    }
    fetchEducations();
  }, []);

  return (
    <main>
      {educations.length > 0 ? (
        educations.map((edu, index) => (
          <section
            key={index}
            className="bg-white mx-auto max-w-xs w-full mt-4 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700"
          >
            <div className="flex justify-between text-xs items-center p-2">
              <div>
                <span style={{ fontSize: '16px' }} className="font-bold text-blue-700">
                  {edu?.type}
                </span>
              </div>
              <div>
                <button
                  className=" bg-transparent me-2"
                  onClick={() => navigate('/profile/edu-background/add')}
                >
                  <IconPencil color="#FAB005" size={20} className="font-bold rounded-md" />
                </button>
                <button
                  className="bg-transparent me-2"
                  onClick={() => navigate('/profile/edu-background/add')}
                >
                  <IconTrash color="#F03E3E" size={20} className="font-bold rounded-md" />
                </button>
              </div>
            </div>
            <div className="w-full grid grid-cols-2 pb-2 pt-2 ms-4">
              <div className="gap-2 align-item-left">
                <Text size="xs">Nama sekolah</Text>
                <Text size="xs" fw={700}>
                  {edu?.name}
                </Text>
              </div>
              <div className="ps-2 gap-2 align-item-left">
                <Text size="xs">Jenjang</Text>
                <Text size="xs" fw={700}>
                  {edu?.type}
                </Text>
              </div>
              <div className="mt-2 gap-2 align-item-left">
                <Text size="xs">Jurusan</Text>
                <Text size="xs" fw={700}>
                  {edu?.major}
                </Text>
              </div>
              <div className="mt-2 ps-2 gap-2 align-item-left">
                <Text size="xs">Lulusan asal</Text>
                <Text size="xs" fw={700}>
                  {edu?.graduate_from}
                </Text>
              </div>
              <div className="mt-2 gap-2 align-item-left">
                <Text size="xs">Tahun masuk</Text>
                <Text size="xs" fw={700}>
                  {edu?.entry_year}
                </Text>
              </div>
              <div className="mt-2 ps-2 gap-2 align-item-left">
                <Text size="xs">Tahun lulus</Text>
                <Text size="xs" fw={700}>
                  {edu?.graduation_year}
                </Text>
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="min-h-96 flex flex-col items-center justify-center mt-10">
          <img
            className="w-40 mb-2 bg-slate-200 rounded-full p-2"
            src="/images/blank-canvas.svg"
            alt=""
          />
          <span className="font-bold text-slate-400 text-xl">Belum ada data pendidikan</span>
        </section>
      )}
    </main>
  );
};
