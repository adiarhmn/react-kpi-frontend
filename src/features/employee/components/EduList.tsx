import { Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  console.log('Data education : ', educations);

  const [educationToDelete, setEducationToDelete] = useState<EducationBackground>();
  const deleteEducationMutation = useDeleteEducation();
  const navigate = useNavigate();

  const openDeleteModal = (education: EducationBackground) => {
    setEducationToDelete(education);
    open();
  };

  const confirmDeleteEducation = async () => {
    if (educationToDelete) {
      deleteEducation(educationToDelete.id!);
      close();
    }
  };

  const deleteEducation = async (id: number) => {
    deleteEducationMutation.mutateAsync(id);
    // Update Division Data
    const newDivision = educations.filter((edu) => edu.id !== id);
    setEducations(newDivision);
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
                  onClick={() => navigate('/profile/edit', { state: { edu } })}
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
        <section className="min-h-96 flex flex-col items-center justify-center mt-10">
          <img
            className="w-40 mb-2 bg-slate-200 rounded-full p-2"
            src="/images/blank-canvas.svg"
            alt=""
          />
          <span className="font-bold text-slate-400 text-xl">Belum ada data pendidikan</span>
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
            <Button onClick={confirmDeleteEducation}>Yakin</Button>
          )}

          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </main>
  );
};
