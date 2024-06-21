/* eslint-disable import/order */
import { Button, Text, Loader, Modal, Input, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconMailForward, IconMap2, IconPlus } from '@tabler/icons-react';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useAuth } from '@/features/auth';
import { formatterDate } from '@/features/history';
import {
  useCreateActivity,
  useGeoLocation,
  useGetAttendance,
  useGetEmployeeLocation,
  useGetSchedule,
} from '../api';
import { useGetActivityDetail, useGetActivityAlias } from '../api/getActivity';
import { CardAttendance } from '../components';
import { ActivityDetailType, AttendanceType, EmployeeLocationType } from '../types';
import { IconInfoCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const Attendance: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const employee_id = creds?.employee_id;

  const [opened, { open, close }] = useDisclosure(false);

  const [attendance, setAttendance] = useState<AttendanceType>();
  const { data: dataAttendance, refetch: RefetchAttendance } = useGetAttendance(
    employee_id,
    formatterDate(new Date(), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (dataAttendance) {
      setAttendance(dataAttendance);
    }
  }, [dataAttendance]);

  const { data, error, isLoading } = useGetSchedule(
    employee_id,
    formatterDate(new Date(), 'yyyy-MM-dd')
  );

  const [activityDetail, setActivityDetail] = useState<ActivityDetailType[]>([]);
  const { data: dataActivity, refetch } = useGetActivityDetail(
    creds?.employee_id,
    formatterDate(new Date(), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (dataActivity) {
      setActivityDetail(dataActivity);
    }
  }, [dataActivity]);

  //[GET LOCATION OUTLETS]
  const [employeeLocation, setEmployeeLocation] = useState<EmployeeLocationType[]>([]);
  const { data: DataEmployeeLocation, isLoading: LoadingEmployeeLocation } = useGetEmployeeLocation(
    creds?.employee_id
  );
  useEffect(() => {
    if (DataEmployeeLocation) {
      setEmployeeLocation(DataEmployeeLocation);
    }
  }, [DataEmployeeLocation]);

  // [END GET LOCATION OUTLETS]

  // [All About Location 🤯]
  const location = useGeoLocation();
  const [statusLocation, setStatusLocation] = useState(false);
  const customIcon = new Icon({
    iconUrl: '/images/my-icon.svg',
    iconSize: [50, 50],
  });
  function calculateDistance(
    lat1: number | undefined,
    lon1: number | undefined,
    lat2: number | undefined,
    lon2: number | undefined
  ): number {
    const R = 6371; // Radius bumi dalam kilometer
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
  const [attendanceLocationId, setAttendanceLocationId] = useState<number>();
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

      if (markers.length > 0) {
        const closestMarker = markers.reduce((prev, current) => {
          return prev.distance < current.distance ? prev : current;
        });

        if (closestMarker.distance <= radius) {
          setStatusLocation(true);
        } else {
          setStatusLocation(false);
        }

        setAttendanceLocationId(closestMarker.attendance_location_id);
      }

      if (markers.length == 1) {
        if (markers[0].distance <= radius) {
          setStatusLocation(true);
        } else {
          setStatusLocation(false);
        }
      } else {
        console.log('Error');
      }
    }
  }, [location, employeeLocation]);

  console.log(attendanceLocationId);

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

  // [Add kegiatan]
  const mutationAddActivity = useCreateActivity();
  const handleActivity = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const activityData = {
      attendance_id: attendance?.id,
      custom1: formActivity.values.custom1,
      custom2: formActivity.values.custom2,
      custom3: formActivity.values.custom3,
      custom4: formActivity.values.custom4,
      custom5: formActivity.values.custom5,
      custom6: formActivity.values.custom6,
      custom7: formActivity.values.custom7,
      custom8: formActivity.values.custom8,
      custom9: formActivity.values.custom9,
      custom10: formActivity.values.custom10,
      activity_lon: (location.coordinates?.longitude ?? 0).toString(),
      activity_lat: (location.coordinates?.latitude ?? 0).toString(),
    };

    await mutationAddActivity.mutateAsync(activityData, {
      onSuccess: (data) => {
        console.log('Success:', data);
        refetch();

        close();
      },
    });
  };
  // [End add kegiatan]
  // [END ACTIVITY]

  if (loadingActivityAlias) {
    return (
      <div className="w-full col-span-12">
        <section className="min-h-96 flex flex-col items-center justify-center mt-10">
          <Loader size={50} />
          <span className="font-bold text-slate-400 text-xl mt-10">Memuat lokasi absen...</span>
        </section>
      </div>
    );
  }

  if (LoadingEmployeeLocation) {
    return (
      <div className="w-full col-span-12">
        <section className="min-h-96 flex flex-col items-center justify-center mt-10">
          <Loader size={50} />
          <span className="font-bold text-slate-400 text-xl mt-10">Memuat lokasi absen...</span>
        </section>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full col-span-12">
        <section className="min-h-96 flex flex-col items-center justify-center mt-10">
          <Loader size={50} />
          <span className="font-bold text-slate-400 text-xl mt-10">Memuat lokasi absen...</span>
        </section>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center my-20 font-bold">{error.message}</div>;
  }

  const dataSchedule = data;

  return (
    <main className="min-h-96 relative">
      {!isLoading && employeeLocation.length == 0 ? (
        <div className="w-full col-span-12">
          <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

          <section className="min-h-96 flex flex-col items-center justify-center mt-10">
            <img
              className="w-40 mb-2 bg-slate-200 rounded-full p-2"
              src="/images/blank-canvas.svg"
              alt=""
            />
            <span className="font-bold text-slate-400 text-2xl mt-3">Oops!</span>
            <span className="font-bold text-slate-400 text-base">
              Lokasi absen anda belum ditentukan
            </span>
            <span className="text-slate-400 text-sm">Harap hubungi admin</span>
          </section>
        </div>
      ) : (
        <>
          <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>
          {/* // Card Map */}
          <section className="bg-white mx-auto max-w-xs w-full -mt-10 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
            <div className="flex justify-between text-xs items-center p-2">
              <span className="text-base font-bold text-blue-700">Lokasi</span>
              <IconMap2 className="opacity-80" size={20} />
            </div>
            <div className="w-full pb-2">
              <MapContainer
                key={location.loaded ? 'loaded' : 'notLoaded'}
                style={{ height: '33vh' }}
                center={[location.coordinates?.latitude ?? 0, location.coordinates?.longitude ?? 0]}
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
                  position={[
                    location.coordinates?.latitude ?? 0,
                    location.coordinates?.longitude ?? 0,
                  ]}
                  icon={myIcon}
                >
                  <Popup>Lokasi saya</Popup>
                </Marker>
                <Circle
                  center={[
                    location.coordinates?.latitude ?? 0,
                    location.coordinates?.longitude ?? 0,
                  ]}
                  radius={70}
                  pathOptions={myCircle}
                />
              </MapContainer>
            </div>
          </section>
          {/* // End card map */}
          {/* // Absen card */}
          <CardAttendance
            schedule={dataSchedule[0]}
            refetchAttendance={RefetchAttendance}
            attendance={attendance}
            long={location.coordinates?.longitude}
            lat={location.coordinates?.latitude}
            statusLocation={statusLocation}
            attendance_location_id={attendanceLocationId}
            employee_location={employeeLocation}
          />
          {/* // End absen card */}

          {/* // Tugas card */}
          <section className="bg-white mx-auto max-w-xs w-full mt-2 mb-7 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
            <div className="flex justify-between text-xs items-center p-2">
              <span className="text-base font-bold text-blue-700">Kegiatan hari ini</span>
              <Button
                disabled={attendance?.check_in == null || attendance?.check_out != null}
                onClick={open}
                className="shadow-sm me-1"
                size="xs"
              >
                <IconPlus className="-ms-1" size={18} />
              </Button>
            </div>
            <Divider size={'sm'} />
            <div className="w-full p-2">
              {activityDetail.length > 0 ? (
                activityDetail.map((activity, index) => (
                  <section
                    key={index}
                    className="bg-white mx-auto max-w-xs w-full z-50 relative p-2 px-2 text-slate-700 "
                  >
                    <div className="flex justify-between text-xs items-center mb-2">
                      <span className="text-sm font-bold text-blue-700">Kegiatan {index + 1}</span>
                      <Button
                        onClick={() =>
                          navigate(`/activity/detail/`, {
                            state: {
                              activity: activity,
                              alias: activityAlias[0],
                              index: index,
                            },
                          })
                        }
                        variant="transparent"
                        className="shadow-xs "
                        size="xs"
                      >
                        <IconInfoCircle size={18} />
                      </Button>
                    </div>
                    <div className="grid grid-cols-12 gap-x-2">
                      {activityDetail != null && activityAlias[0] != null
                        ? Array.from(
                            { length: 10 },
                            (_, i) =>
                              activityAlias[0][`cs${i + 1}_name`] != '' && (
                                <div key={i} className="mb-1 col-span-6 w-full">
                                  <Text size="xs" fw={700}>
                                    {activityAlias[0][`cs${i + 1}_name`]}
                                  </Text>
                                  <Text truncate="end" style={{ textAlign: 'left' }} size="xs">
                                    {activity[`custom${i + 1}`]}
                                  </Text>
                                </div>
                              )
                          )
                        : ''}
                    </div>
                    <div className="text-right mt-2 me-2">
                      <Text truncate="end" size="xs">
                        {formatterDate(new Date(activity['created_at'] ?? 0), 'HH:mm')}
                      </Text>
                    </div>
                    <Divider size={'xs'} className="  " />
                  </section>
                ))
              ) : (
                <div className="w-full col-span-12">
                  <section className="min-h-96 flex flex-col items-center justify-center mt-10">
                    <img
                      className="w-40 mb-2 bg-slate-200 rounded-full p-2"
                      src="/images/blank-canvas.svg"
                      alt=""
                    />
                    <span className="font-bold text-slate-400 text-lg">
                      Belum ada data kegiatan
                    </span>
                  </section>
                </div>
              )}
            </div>
          </section>
          {/* // End tugas card */}
        </>
      )}

      <Modal opened={opened} onClose={close} title="Tambah kegiatan">
        <form onSubmit={handleActivity}>
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
            {location.loaded && !location.error ? (
              <>
                <Marker
                  position={[
                    location.coordinates?.latitude ?? 0,
                    location.coordinates?.longitude ?? 0,
                  ]}
                  icon={customIcon}
                >
                  <Popup>Lokasi anda</Popup>
                </Marker>
                <Circle
                  center={[
                    location.coordinates?.latitude ?? 0,
                    location.coordinates?.longitude ?? 0,
                  ]}
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
                          {...formActivity.getInputProps(`custom${i + 1}`)}
                        />
                      </Input.Wrapper>
                    </div>
                  )
              )
            : ''}
          <div className="mb-2 mt-5">
            <Button type="submit" fullWidth rightSection={<IconMailForward size={'20px'} />}>
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};
