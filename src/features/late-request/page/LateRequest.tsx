import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustmentsHorizontal, IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useAuth } from '@/features/auth';

import { useGetAttendanceRequest } from '../api/getAttendanceRequest';
import { LateRequestList } from '../components';
import { AttendanceRequestType } from '../types';

export const LateRequest: React.FC = () => {
  const { creds } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const hasNotifiedRef = useRef(false);
  useEffect(() => {
    if (state?.success && !hasNotifiedRef.current) {
      Swal.fire({
        width: '80%',
        title: state.success,
        timer: 3000,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      hasNotifiedRef.current = true;
    }
  }, [state, navigate]);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-2">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Absen</h2>
          </div>
          <span className="font-semibold">
            <Button
              className="shadow-sm me-1"
              size="xs"
              onClick={() => {
                navigate('/late-request/add');
              }}
            >
              <IconPlus className=" -ms-1" />
            </Button>
            <Button className="shadow-sm" size="xs" onClick={open}>
              <IconAdjustmentsHorizontal className=" -ms-1" />
            </Button>
          </span>
        </div>
      </section>

      <LateRequestList />
    </main>
  );
};
