import { Button, FileInput, Modal, Text, TextInput } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconChevronLeft, IconChevronRight, IconClockHour8, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EduList } from '../components/EduList';

export const EduBackground: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 50em)');
  const navigate = useNavigate();
  const [tahunMasuk, setTahunMasuk] = useState<Date | null>(null);
  const [tahunLulus, setTahunLulus] = useState<Date | null>(null);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      jenjang: '',
      jurusan: '',
      namaSekolah: '',
      lulusanAsal: '',
      gelar: '',
    },
    validate: {
      jenjang: (value) =>
        value.length < 5 ? 'Jenjang setidaknya harus memuat lebih dari 2 karakter' : null,
      namaSekolah: (value) =>
        value.length < 2 ? 'Nama sekolah setidaknya harus memuat lebih dari 4 karakter' : null,
      lulusanAsal: (value) =>
        value.length < 2 ? 'Lulusan asal setidaknya harus memuat lebih dari 2 karakter' : null,
      gelar: (value) =>
        value.length < 2 ? 'Gelar setidaknya harus memuat lebih dari 2 karakter' : null,
    },
  });

  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center text-blue-700 gap-3">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Data pendidikan</h2>
          </div>
          <button
            className="bg-transparent me-2"
            onClick={() => navigate('/profile/edu-background/add')}
          >
            <IconPlus size={21} className="font-bold rounded-md" />
          </button>
        </div>
      </section>

      <EduList />
    </main>
  );
};
