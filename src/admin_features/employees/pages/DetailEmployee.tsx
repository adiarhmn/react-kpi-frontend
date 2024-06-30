import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

export const DetailEmployee: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <section className="bg-white rounded-lg  shadow-lg p-5">
      <div className="flex gap-3 items-center">
        <ActionIcon onClick={() => navigate(-1)} color="blue">
          <IconChevronLeft size={20} />
        </ActionIcon>
        <div>
          <h2 className="font-bold">Detail Karyawan : Adi Aulia Rahman</h2>
          <div className="-mt-1 text-xs text-slate-400">Berikut Detail Data Karyawan</div>
        </div>
      </div>
    </section>
  );
};
