/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { Badge, Button, Divider, Modal, Text, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronLeft, IconClock24, IconDeviceTablet, IconMap2 } from '@tabler/icons-react';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import {
  AttendanceType,
  EmployeeLocationType,
  useGeoLocation,
  useGetEmployeeLocation,
} from '@/features/attendance';
import { useGetAttendance } from '@/features/attendance/api/getAttendance';
import { useAuth } from '@/features/auth';
import { formatterDate } from '@/features/history/api/getAbsence';

import { useCreateOvertime } from '../api/createOvertime';
import { useUpdateOvertime } from '../api/updateOvertime';
import { OvertimeType } from '../types';
import { useGetOvertimeDaily } from '../api/getOvertime';

export const AddOvertime: React.FC = () => {
  const { creds } = useAuth();
  const [overtime, setOvertime] = useState<OvertimeType>();
  const { data: DataOvertime, refetch: RefetchOvertime } = useGetOvertimeDaily(
    creds?.employee_id,
    formatterDate(new Date(), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (DataOvertime) {
      setOvertime(DataOvertime);
    }
  }, [DataOvertime]);

  console.log('data overtimeeeeeeeeee : ', overtime);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      detail: '',
    },
    validate: {
      detail: (value) => (value === '' ? 'harap mengisi detail kegiatan' : null),
    },
  });

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [opened, { open, close }] = useDisclosure(false);
  const [attendance, setAttendance] = useState<AttendanceType>();
  const { data: DataAttendanceToday } = useGetAttendance(
    creds?.employee_id,
    formatterDate(currentDate, 'yyyy-MM-dd')
  );

  useEffect(() => {
    if (DataAttendanceToday) {
      setAttendance(DataAttendanceToday);
    }
  }, [DataAttendanceToday]);

  const navigate = useNavigate();

  useEffect(() => {
    const updateCurrentDate = () => {
      setCurrentDate(new Date());
    };
    const intervalId = setInterval(updateCurrentDate, 1000);
    return () => clearInterval(intervalId);
  }, []);

  //[GET LOCATION OUTLETS]
  // const [locationOutlet, setLocationOutlet] = useState(true);
  const [employeeLocation, setEmployeeLocation] = useState<EmployeeLocationType[]>([]);
  const { data: DataEmployeeLocation } = useGetEmployeeLocation(creds?.employee_id);
  useEffect(() => {
    if (DataEmployeeLocation) {
      setEmployeeLocation(DataEmployeeLocation);
    }
  }, [DataEmployeeLocation]);
  // [END GET LOCATION OUTLETS]

  // [All About Location 🤯]
  const [statusLocation, setStatusLocation] = useState(false);
  const location = useGeoLocation();
  function calculateDistance(
    lat1: number | undefined,
    lon1: number | undefined,
    lat2: number | undefined,
    lon2: number | undefined
  ): number {
    const R = 6371;
    const dLat = (((lat2 ?? 0) - (lat1 ?? 0)) * Math.PI) / 180;
    const dLon = (((lon2 ?? 0) - (lon1 ?? 0)) * Math.PI) / 180;
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos(((lat1 ?? 0) * Math.PI) / 180) *
        Math.cos(((lat2 ?? 0) * Math.PI) / 180) *
        (1 - Math.cos(dLon))) /
        2;
    return R * 2 * Math.asin(Math.sqrt(a));
  }
  const [markers, setMarkers] = useState<any[]>([]);
  // const [attendanceLocationId, setAttendanceLocationId] = useState<number>();
  useEffect(() => {
    if (location.loaded && !location.error) {
      const officeIcon = new Icon({
        iconUrl: '/images/office-icon.svg',
        iconSize: [50, 50],
      });

      const officeCircle = {
        color: 'white',
        fillColor: 'red',
        fillOpacity: 0.2,
      };

      const markers = employeeLocation.map((emp_loc) => ({
        geocode: [
          parseFloat(emp_loc.attendance_location.latitude),
          parseFloat(emp_loc.attendance_location.longitude),
        ],
        distance: Math.round(
          calculateDistance(
            location.coordinates?.latitude,
            location.coordinates?.longitude,
            parseFloat(emp_loc.attendance_location.latitude),
            parseFloat(emp_loc.attendance_location.longitude)
          ) * 1000
        ),
        popUp: emp_loc.attendance_location.name,
        icon: officeIcon,
        option: officeCircle,
        radius: 120,
        attendance_location_id: emp_loc.attendance_location_id,
      }));

      setMarkers(markers);

      // [PENTING! 🥶🥶]
      const radius = 120; // Jarak dalam meter
      // [!!!!!!!!!]
      if (markers.length > 1) {
        const closestMarker = markers.reduce((prev, current) => {
          return prev.distance < current.distance ? prev : current;
        });

        if (closestMarker.distance <= radius) {
          setStatusLocation(true);
        } else {
          setStatusLocation(false);
        }
        // setAttendanceLocationId(closestMarker.attendance_location_id);
      } else if (markers.length == 1) {
        if (markers[0].distance <= radius) {
          setStatusLocation(true);
        } else {
          setStatusLocation(false);
        }
      }
    } else {
      // setLocationOutlet(false);
    }
  }, [location, employeeLocation]);

  const myIcon: any = new Icon({
    iconUrl: '/images/my-icon.svg',
    iconSize: [60, 60],
  });

  const myCircle: any = {
    color: '#CDE8E5',
    fillColor: 'blue',
    fillOpacity: 0.1,
  };
  // [END ALL ABOUT LOCATION]

  // [Button start overtime]
  const mutationAddOvertime = useCreateOvertime();
  const handleOvertime = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const overtimeData = {
      attendance_id: attendance?.id,
      detail: form.values.detail,
      overtime_lat: (location.coordinates?.latitude ?? 0).toString(),
      overtime_lon: (location.coordinates?.longitude ?? 0).toString(),
    };

    await mutationAddOvertime.mutateAsync(overtimeData, {
      onSuccess: (data) => {
        console.log('Sukses : ', data);
        RefetchOvertime();
        close();
      },
    });
  };
  // [End Button start overtime]

  // [Button Stop Overtime]
  const mutationEndOvertime = useUpdateOvertime();

  const handleEndOvertime = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const attendanceCheckOut = {
      overtime_id: overtime?.id,
    };

    await mutationEndOvertime.mutateAsync(attendanceCheckOut, {
      onSuccess: (data) => {
        console.log('Sukses : ', data);
        RefetchOvertime();
      },
    });
  };

  console.log('Data attendance : ', attendance);
  return (
    <main className="min-h-96 relative">
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
            <h2 className="font-semibold ">Tambah lembur</h2>
          </div>
        </div>
      </section>

      {/* Card Map */}
      <section className="bg-white mx-auto max-w-xs w-full mt-3 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-base text-blue-700">Lokasi</span>
          <IconMap2 className="opacity-80" size={20} />
        </div>
        <div className="w-full pb-2">
          <MapContainer
            key={location.loaded ? 'loaded' : 'notLoaded'}
            style={{ height: '33vh' }}
            center={[location.coordinates?.latitude ?? 0, location.coordinates?.longitude ?? 0]}
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
                    <Popup>
                      {marker.popUp} <h1>({marker.distance} Meter)</h1>
                    </Popup>
                  </Marker>
                  <Circle
                    center={marker.geocode}
                    radius={marker.radius}
                    pathOptions={marker.option}
                  />
                </div>
              ))
            )}
            <Marker
              position={[location.coordinates?.latitude ?? 0, location.coordinates?.longitude ?? 0]}
              icon={myIcon}
            >
              <Popup>Lokasi saya</Popup>
            </Marker>
            <Circle
              center={[location.coordinates?.latitude ?? 0, location.coordinates?.longitude ?? 0]}
              radius={70}
              pathOptions={myCircle}
            />
          </MapContainer>
        </div>
      </section>
      {/* End card map */}

      {/* Absen card */}
      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-base text-blue-700">Absensi lembur</span>
          <IconDeviceTablet className="opacity-80" size={20} />
        </div>
        <div className="w-full divide-x divide-gray-300 p-1 -mb-2">
          <div className="ms-2 text-left">
            <Text style={{ marginLeft: '4px' }} size="auto" fw={700}>
              {formatterDate(currentDate, 'EEEE, dd MMMM yyyy')}
            </Text>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12">
              <div className="col-span-6 text-left mt-1 ms-1 mb-3">
                <Text style={{ marginLeft: '4px', paddingBottom: '2px' }} size="16px" fw={500}>
                  {formatterDate(currentDate, 'HH:mm')}
                </Text>
              </div>
              <div className=" col-span-6 text-right -mt-6">
                {overtime?.start_time == null ? (
                  <Button
                    onClick={open}
                    disabled={
                      attendance == undefined ||
                      statusLocation == false ||
                      overtime?.end_time != null
                    }
                    className="shadow-lg"
                    style={{ borderRadius: '15px', width: '110px' }}
                    size="sm"
                    color={attendance != undefined ? 'green' : 'grey'}
                  >
                    Mulai
                  </Button>
                ) : overtime?.end_time == null ? (
                  <form onSubmit={handleEndOvertime}>
                    <Button
                      type="submit"
                      className="shadow-lg"
                      style={{ borderRadius: '15px', width: '110px' }}
                      size="sm"
                      color="red"
                    >
                      Selesai
                    </Button>
                  </form>
                ) : (
                  <Button
                    disabled
                    className="shadow-lg"
                    style={{ borderRadius: '15px', width: '140px' }}
                    size="sm"
                    color="red"
                  >
                    Sudah lembur
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-7">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-base text-blue-700">Data lembur</span>
          <Badge
            size="xs"
            style={{
              marginLeft: '4px',
              borderRadius: '2px',
            }}
            color={
              overtime?.start_time == null ? 'red' : overtime?.end_time == null ? 'yellow' : 'green'
            }
          >
            {overtime?.start_time == null
              ? 'belum mulai'
              : overtime?.end_time == null
                ? 'sedang lembur'
                : 'selesai lembur'}
          </Badge>
        </div>
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
          <div className="col-span-2 text-center m-auto p-2">
            <Text size="30px" fw={700}>
              {formatterDate(currentDate, 'dd')}
            </Text>
            <Text style={{ marginTop: '-5px' }} size="md">
              {formatterDate(currentDate, 'MMM')}
            </Text>
          </div>
          <div className="col-span-10 ms-2 text-left">
            <div className="ms-2 -mb-2">
              <Text size="xs">Lembur mulai</Text>
              <Text size="sm" fw={700}>
                {overtime?.start_time != undefined
                  ? formatterDate(new Date(overtime.start_time), 'HH:mm')
                  : '-- -- '}
              </Text>
            </div>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12 mb-1">
              <div className="col-span-6 text-left mt-1 ms-2">
                <Text size="xs">Lembur selesai</Text>
                <Text size="sm" fw={700}>
                  {/* {formattedTime} */}
                  {overtime?.end_time != undefined
                    ? formatterDate(new Date(overtime.end_time), 'HH:mm')
                    : '-- -- '}
                </Text>
              </div>
              <div className="col-span-6 text-right -mt-1"></div>
            </div>
          </div>
        </div>
      </section>
      {/* End absen card */}

      {/* Modal tambah kegiatan lembur */}
      <Modal opened={opened} onClose={close} title="Pengajuan lembur">
        <form onSubmit={handleOvertime}>
          <div className="mb-2">
            <Textarea
              label="Kegiatan"
              placeholder="masukkan kegiatan yang akan dilakukan"
              autosize
              minRows={5}
              {...form.getInputProps('detail')}
            />
          </div>
          <div className="mb-2 mt-3">
            <Button type="submit" fullWidth rightSection={<IconClock24 />}>
              Mulai lembur
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};
