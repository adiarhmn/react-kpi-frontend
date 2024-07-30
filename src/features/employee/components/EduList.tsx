import { Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useAuth } from '@/features/auth';

import { useDeleteEducation, useGetEduBackground } from '../api/EduBackground/';
import { EducationBackground } from '../types';

export const EduList: React.FC = () => {
  const { creds } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const [educations, setEducations] = useState<EducationBackground[]>([]);
  const { data: DataEduBackground } = useGetEduBackground(creds?.employee_id);
  useEffect(() => {
    if (DataEduBackground) {
      setEducations(DataEduBackground);
    }
  }, [DataEduBackground]);

  const [educationToDelete, setEducationToDelete] = useState<EducationBackground>();
  const navigate = useNavigate();

  const openDeleteModal = (education: EducationBackground) => {
    setEducationToDelete(education);
    open();
  };

  const deleteEducationMutation = useDeleteEducation();
  const deleteEducation = async () => {
    deleteEducationMutation.mutateAsync(educationToDelete?.id, {
      onSuccess: (data) => {
        console.log('Success Delete:', data);
        const newEducation = educations.filter((edu) => edu.id !== educationToDelete?.id);
        setEducations(newEducation);
        close();
        Swal.fire({
          width: '80%',
          title: 'Data pendidikan berhasil dihapus!',
          timer: 3000,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      },
    });
  };

  return (
    <main>
      {educations.length > 0 ? (
        educations.map((edu, index) => (
          <section
            key={index}
            className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700"
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
                  onClick={() => navigate('/profile/edu-background/edit', { state: { edu } })}
                >
                  <IconPencil color="#FAB005" size={20} className="font-bold rounded-md" />
                </button>
                <button className="bg-transparent me-2" onClick={() => openDeleteModal(edu)}>
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
        <section className="min-h-96 flex flex-col items-center justify-center ">
          <img
            className="w-28 mb-2 bg-slate-200 rounded-full p-2"
            src="/images/blank-canvas.svg"
            alt=""
          />
          <span className="font-bold text-slate-400 text-sm">Belum ada data pendidikan</span>
        </section>
      )}

      <Modal
        opened={opened}
        onClose={close}
        centered
        title={<span className="font-bold">Konfirmasi Hapus ?</span>}
      >
        <div>
          <span>Apakah anda yakin ingin menghapus data pendidikan</span>
          <span className="font-semibold text-blue-600"> {educationToDelete?.name}</span>
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          {deleteEducationMutation.isPending ? (
            <Button color="red" disabled>
              Loading...
            </Button>
          ) : (
            <Button onClick={deleteEducation}>Yakin</Button>
          )}

          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </main>
  );
};
