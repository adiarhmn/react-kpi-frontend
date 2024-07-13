/* eslint-disable import/order */
import { IconChevronLeft, IconPencil, IconPlus } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BiodataInfo } from '../components';

import { EmployeeType } from '@/admin_features/types';
import { useEffect, useState } from 'react';
import { useGetEmployee } from '../api/Profile';
import { useAuth } from '@/features/auth';
import Swal from 'sweetalert2';
import { Button } from '@mantine/core';

export const Biodata: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const [biodata, setBiodata] = useState<EmployeeType>();
  const { data: DataEmployee } = useGetEmployee(creds?.employee_id);
  useEffect(() => {
    if (DataEmployee) {
      setBiodata(DataEmployee);
    }
  }, [DataEmployee]);

  // [NOTIFICATION 🔔]
  const { state } = useLocation();
  useEffect(() => {
    const hasNotified = localStorage.getItem('hasNotifiedBiodata');
    if (state?.success && hasNotified != 'yes') {
      Swal.fire({
        width: '80%',
        title: state.success,
        timer: 3000,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      localStorage.setItem('hasNotifiedBiodata', 'yes');
    }
  }, [state, navigate]);
  // [END NOTIFICATION 🔔]

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
            <h2 className="font-semibold ">Data diri</h2>
          </div>
          <div>
            <Button
              className="shadow-sm me-1"
              size="xs"
              onClick={() => {
                navigate('edit', { state: { biodata: biodata } });
              }}
            >
              <IconPencil size={19}/>
            </Button>
          </div>
        </div>
      </section>

      <BiodataInfo employee={biodata} />
    </main>
  );
};
