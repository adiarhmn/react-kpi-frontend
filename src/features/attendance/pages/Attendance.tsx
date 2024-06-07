import { Button, Text, Loader, Modal, Input, Textarea, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowBarToRight, IconMap2, IconPlus } from '@tabler/icons-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
// eslint-disable-next-line import/order
import { Icon } from 'leaflet';
// eslint-disable-next-line import/order
import { useEffect, useState } from 'react';
// import withReactContent from 'sweetalert2-react-content';

import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { useAuth } from '@/features/auth';

import { useCreateActivity, useGeoLocation, useGetAttendance, useGetSchedule } from '../api';
import { useGetActivity, useGetActivityAlias } from '../api/getActivity';
import { CardAttendance } from '../components';
import { ActivityType, AttendanceType } from '../types';

export const Attendance: React.FC = () => {
  // const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const { creds } = useAuth();
  const employee_id = creds?.employee_id;
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(() => {
    const savedState = localStorage.getItem('isCheckedIn');
    return savedState ? JSON.parse(savedState) : false;
  });
  useEffect(() => {
    localStorage.setItem('isCheckedIn', JSON.stringify(isCheckedIn));
  }, [isCheckedIn]);
  // const [status, setStatus] = useState<string | null>(localStorage.getItem('isCheckedIn'));

  const [opened, { open, close }] = useDisclosure(false);
  const date = new Date();
  const dateToday = format(date, 'yyyy-MM-dd', { locale: id });

  const [attendance, setAttendance] = useState<AttendanceType>();
  const { data: dataAttendance } = useGetAttendance(employee_id, dateToday);
  useEffect(() => {
    if (dataAttendance) {
      setAttendance(dataAttendance[0]);
    }
  }, [dataAttendance]);

  console.log('Data attendance : ', attendance);
  const { data, error, isLoading } = useGetSchedule(employee_id, dateToday);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const { data: dataActivity, refetch } = useGetActivity(attendance?.id);
  useEffect(() => {
    if (dataActivity) {
      setActivities(dataActivity);
    }
  }, [dataActivity]);
  // console.log('Data schedule', data);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      activityName: '',
      activityDescription: '',
    },
    validate: {
      activityName: (value) => (value === '' ? 'harap mengisi judul kegiatan' : null),
      activityDescription: (value) => (value === '' ? 'Deskripso kegiatan harus diisi' : null),
    },
  });

  // [Add kegiatan]
  const mutationAddActivity = useCreateActivity();
  const handleActivity = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const activityData = {
      attendance_id: attendance?.id,
      name: form.values.activityName,
      description: form.values.activityDescription,
    };

    await mutationAddActivity.mutateAsync(activityData, {
      onSuccess: (data) => {
        console.log('Success:', data);
        refetch();

        close();
        // console.log('Apakah sudah checkin :', localStorage.getItem('isCheckIn'));
      },
    });
  };
  // [End add kegiatan]

  // [All About Location 🤯]
  const location = useGeoLocation();
  console.log('Tipe data coordinates : ', typeof location.coordinates?.longitude);
  const [statusLocation, setStatusLocation] = useState(false);
  console.log('UseGeoLocation : ', location);
  useEffect(() => {
    if (location.loaded && !location.error) {
      const latOffice: number = -3.7529315029676833;
      const lonOffice: number = 114.76686669474925;
      const distance = calculateDistance(
        location.coordinates?.latitude,
        location.coordinates?.longitude,
        latOffice,
        lonOffice
      );

      // [PENTING! 🥶🥶]
      const radius: number = 0.12;
      // [!!!!!!!!!]

      if (distance <= radius) {
        setStatusLocation(true);
      } else {
        setStatusLocation(false);
      }
      console.log('Distance : ', distance);
    }
  }, [location]);

  console.log('Jarak status : ', statusLocation);

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius bumi dalam kilometer
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * (1 - Math.cos(dLon))) /
        2;
    return R * 2 * Math.asin(Math.sqrt(a));
  }

  const officeIcon: any = new Icon({
    iconUrl: '/images/office-icon.svg',
    iconSize: [50, 50],
  });

  const myIcon: any = new Icon({
    iconUrl: '/images/my-icon.svg',
    iconSize: [60, 60],
  });

  const myCircle: any = {
    color: '#CDE8E5',
    fillColor: 'blue',
    fillOpacity: 0.1,
  };

  const officeCircle: any = {
    color: 'white',
    fillColor: 'red',
    fillOpacity: 0.2,
  };

  interface Marker {
    geocode: [number, number]; // Menggunakan tipe tuple langsung
    popUp: string;
    icon: any;
    option: any;
    radius: number;
  }

  const markers: Marker[] = [
    {
      geocode: [-3.7529315029676833, 114.76686669474925],
      popUp: 'Lokasi kantor',
      icon: officeIcon,
      option: officeCircle,
      radius: 120,
    },
    {
      geocode: [location.coordinates?.latitude ?? 0, location.coordinates?.longitude ?? 0],
      popUp: 'Lokasi saya',
      icon: myIcon,
      option: myCircle,
      radius: 70,
    },
  ];

  // [End Location]

  // [ACTIVITY 🤔🤔]
  const [activityAlias, setActivityAlias] = useState([]);
  const { data: dataActivityAlias, isLoading: loadingActivityAlias } = useGetActivityAlias(
    creds?.company_id
  );
  useEffect(() => {
    if (dataActivityAlias) {
      setActivityAlias(dataActivityAlias);
    }
  }, [dataActivityAlias]);

  const formActivity = useForm({
    validateInputOnChange: true,
    initialValues: {
      custom1: '',
      custom2: '',
      custom3: '',
      custom4: '',
      custom5: '',
      custom6: '',
      custom7: '',
      custom8: '',
      custom9: '',
      custom10: '',
    },
    validate: {
      custom1: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom2: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom3: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom4: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom5: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom6: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom7: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom8: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom9: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
      custom10: (value) => (value === '' ? 'Field tidak boleh kosong' : null),
    },
  });
  // [END ACTIVITY]

  if (loadingActivityAlias) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-600 text-center my-20 font-bold">{error.message}</div>;
  }

  const dataSchedule = data;
  console.log('Data activity : ', activities);
  console.log('Data attendance : ', attendance);
  console.log('Data isCheckedIn : ', isCheckedIn);
  console.log('Data alias : ', activityAlias);

  return (
    <main className="min-h-96 relative">
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      {/* Card Map */}
      <section className="bg-white mx-auto max-w-xs w-full -mt-10 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
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
            // center={[-3.753033208345266, 114.76683450763974]}
            zoom={15}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {!location.loaded && location.error ? (
              <Marker position={[-3.753033208345266, 114.76683450763974]}>
                <Popup>Lokasi anda</Popup>
              </Marker>
            ) : (
              markers.map((marker, index) => (
                <div key={index}>
                  <Marker position={marker.geocode} icon={marker.icon}>
                    <Popup>{marker.popUp}</Popup>
                  </Marker>
                  <Circle
                    center={marker.geocode}
                    radius={marker.radius}
                    pathOptions={marker.option}
                  />
                </div>
              ))
            )}
          </MapContainer>
        </div>
      </section>
      {/* End card map */}

      {/* Absen card */}
      <CardAttendance
        schedule={dataSchedule[0]}
        setIsCheckIn={setIsCheckedIn}
        isCheckedIn={isCheckedIn}
        long={location.coordinates?.longitude}
        lat={location.coordinates?.latitude}
        statusLocation={statusLocation}
      />
      {/* End absen card */}

      {/* Tugas card */}
      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="text-base font-bold text-blue-700">Kegiatan</span>
          <Button
            disabled={isCheckedIn == false}
            onClick={open}
            className="shadow-sm me-1"
            size="xs"
          >
            <IconPlus className="-ms-1" size={18} />
          </Button>
        </div>
        <div className="w-full pb-2">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index}>
                {' '}
                <div className="-mt-2 p-2">
                  <Text size="xs" fw={700}>
                    Judul
                  </Text>
                  <Text style={{ textAlign: 'justify' }} size="sm">
                    {activity?.name}
                  </Text>
                </div>
                <div className="mt-1 p-2">
                  <Text size="xs" fw={700}>
                    Deskripsi kegiatan
                  </Text>
                  <Text style={{ textAlign: 'justify' }} size="sm">
                    {activity?.description}
                  </Text>
                </div>
                <Divider my="md" />
              </div>
            ))
          ) : (
            <div className="w-full col-span-12">
              <section className="min-h-96 flex flex-col items-center justify-center mt-10">
                <img
                  className="w-40 mb-2 bg-slate-200 rounded-full p-2"
                  src="/images/blank-canvas.svg"
                  alt=""
                />
                <span className="font-bold text-slate-400 text-lg">Belum ada data kegiatan</span>
              </section>
            </div>
          )}
        </div>
      </section>
      {/* End tugas card */}

      <Modal opened={opened} onClose={close} title="Tambah kegiatan">
        <form onSubmit={handleActivity}>
          {activityAlias[0] != null
            ? Array.from(
                { length: 10 },
                (_, i) =>
                  activityAlias[0][`cs${i + 1}_name`] != '' && (
                    <div key={i} className="mb-2">
                      <Input.Wrapper
                        label={activityAlias[0][`cs${i + 1}_name`]}
                        description=""
                        error=""
                      >
                        <Input
                          placeholder="masukkan judul kegiatan"
                          {...form.getInputProps(`custom${i + 1}`)}
                        />
                      </Input.Wrapper>
                    </div>
                  )
              )
            : ''}
          <div className="mb-2 mt-5">
            <Button type="submit" fullWidth rightSection={<IconArrowBarToRight />}>
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};
