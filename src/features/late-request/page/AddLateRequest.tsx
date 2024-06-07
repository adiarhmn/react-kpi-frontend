import { Button, Divider, Input, Loader, Select, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronLeft, IconMailForward, IconMap2 } from '@tabler/icons-react';
import { Icon } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { ScheduleType, useCreateAttendance, useGeoLocation } from '@/features/attendance';
import { useAuth } from '@/features/auth';
import { formatterDate } from '@/features/history';
// eslint-disable-next-line no-restricted-imports
import { useGetScheduleDaily } from '@/features/schedule/api';

import { useCreateLateRequest } from '../api';

export const AddLateRequest: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  // const [lateRequest, setLateRequest] = useState<lateRequestType[]>([]);
  const [schedule, setSchedule] = useState<ScheduleType>();
  const { data } = useGetScheduleDaily(creds?.id, formatterDate(new Date(), 'yyyy-MM-dd'));
  useEffect(() => {
    if (data) {
      setSchedule(data[0]);
    }
  }, [data]);
  // console.log('Data Schedule : ', schedule?.shift.shift_name);

  // [All About Location 🤯]
  const location = useGeoLocation();
  const customIcon = new Icon({
    iconUrl: '/images/my-icon.svg',
    iconSize: [50, 50],
  });
  // [End Location]

  // [FORM PENGAJUAN]
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      nameShift: schedule?.shift.shift_name,
      reason: '',
    },
    validate: {
      reason: (value) => (value === '' ? 'Alasan pengajuan harus diisi' : null),
    },
  });

  // console.log(form.getInputProps('nameShift'));
  // [END FORM PENGAJUAN]

  // [SET LOCALSTORAGE STATUS CHECKIN]
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(() => {
    const savedState = localStorage.getItem('isCheckedIn');
    return savedState ? JSON.parse(savedState) : false;
  });
  useEffect(() => {
    localStorage.setItem('isCheckedIn', JSON.stringify(isCheckedIn));
  }, [isCheckedIn]);
  // [END SET LOCALSTORAGE]

  // [ADD ATTENDANCE]
  const mutationCheckIn = useCreateAttendance();
  const createAttendance = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const attendanceCheckIn = {
      schedule_id: schedule?.id,
      employee_id: creds?.id,
      attendance_lat: location.coordinates?.latitude.toString(),
      attendance_lon: location.coordinates?.longitude.toString(),
    };

    await mutationCheckIn.mutateAsync(attendanceCheckIn, {
      onSuccess: (data) => {
        Swal.fire({
          width: '80%',
          title: 'Pengajuan absen berhasil!',
          timer: 3000,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        console.log('Success:', data);

        // console.log('Apakah sudah checkin :', localStorage.getItem('isCheckIn'));
      },
    });
  };
  // [END ADD ATTENDANCE]

  // [SUBMIT PENGAJUAN]

  const mutationAddLateRequest = useCreateLateRequest();
  const handleLateRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const lateRequestData = {
      employee_id: creds?.id,
      reason: form.values.reason,
    };

    await mutationAddLateRequest.mutateAsync(lateRequestData, {
      onSuccess: (data) => {
        console.log('Success:', data);
        setIsCheckedIn(true);
        createAttendance(event);
        // if (data.status == 201) {
        //   navigate(-1);
        // }
        close();
      },
    });
  };

  // [END SUBMIT PENGAJUAN]

  console.log('status checkin : ', isCheckedIn);
  return (
    <main className="min-h-96 relative">
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>
      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Pengajuan absen</h2>
          </div>
        </div>
      </section>
      {/* Card Map */}
      <section className="bg-white mx-auto max-w-xs w-full mt-4 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="text-base font-bold text-blue-700">Lokasi</span>
          <IconMap2 className="opacity-80" size={20} />
        </div>
        <div className="w-full pb-2">
          {/* <Image src="/images/map.png" height={160} alt="Map" />
           */}
          <MapContainer
            key={location.loaded ? 'loaded' : 'notLoaded'}
            style={{ height: '33vh' }}
            center={[location.coordinates?.latitude, location.coordinates?.longitude]}
            zoom={15}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {location.loaded && !location.error ? (
              <>
                <Marker
                  position={[location.coordinates?.latitude, location.coordinates?.longitude]}
                  icon={customIcon}
                >
                  <Popup>Lokasi anda</Popup>
                </Marker>
                <Circle
                  center={[location.coordinates?.latitude, location.coordinates?.longitude]}
                  radius={60}
                  pathOptions={{ color: '#CDE8E5', fillColor: 'blue', fillOpacity: 0.1 }}
                />
              </>
            ) : (
              <Marker position={[-3.753033208345266, 114.76683450763974]} icon={customIcon}>
                <Popup>Lokasi anda</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </section>
      {/* End card map */}

      {/* Form keterlambatan */}
      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="text-base font-bold text-blue-700">Form pengajuan</span>
        </div>
        <Divider size={'xs'} />
        <div className="w-full p-2">
          <form onSubmit={handleLateRequest}>
            <div className="mb-2">
              <Textarea
                label="Alasan pengajuan"
                placeholder="masukkan alasan pengajuan"
                autosize
                minRows={5}
                {...form.getInputProps('reason')}
              />
            </div>
            <div className="mb-2 mt-3">
              <Button
                disabled={isCheckedIn}
                type="submit"
                fullWidth
                rightSection={<IconMailForward size={'20px'} />}
              >
                Ajukan
              </Button>
            </div>
          </form>
        </div>
      </section>
      {/* End form keterlambatan */}
    </main>
  );
};
