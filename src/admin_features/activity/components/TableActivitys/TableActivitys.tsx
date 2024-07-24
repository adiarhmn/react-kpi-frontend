import { Button, Divider, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetActivityAlias, useGetActivitys } from '../../api';

import { LocationShow } from './LocationActivity';

interface TableActivitysProps {
  date: string;
}
export const TableActivitys: React.FC<TableActivitysProps> = ({ date }) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const [opened, { open, close }] = useDisclosure(false);
  const [DataActivityToShow, setDataActivityToShow] = useState<any>(undefined);
  const {
    data: DataActivity,
    error: errorActivity,
    isLoading: loadingActivity,
  } = useGetActivitys(creds?.company_id, date);

  const { data: DataActivityAlias, isLoading: LoadingActivityAlias } = useGetActivityAlias(
    creds?.company_id
  );

  if (loadingActivity || LoadingActivityAlias) {
    return <div>Loading...</div>;
  }
  if (errorActivity || !DataActivity) {
    return <div className="text-red-600 text-center my-20 font-bold">{errorActivity?.message}</div>;
  }

  if (DataActivityAlias.length === 0) {
    return (
      <div className="min-h-52 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="text-center">Tidak Ada Data Variabel Aktivitas</div>
          <div className="text-xs text-slate-400 mb-2 -mt-1">
            Tekan Tombol untuk membuat variabel aktivitas
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={14}></IconPlus>}>
            Buat Aktivitas
          </Button>
        </div>
      </div>
    );
  }

  console.log(DataActivity);
  return (
    <>
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold">Nama Karyawan</Table.Th>
            {Array.from(
              { length: 10 },
              (_, i) =>
                DataActivityAlias[0][`cs${i + 1}_name`] != '' && (
                  <Table.Th key={i} className="font-bold capitalize">
                    {DataActivityAlias[0][`cs${i + 1}_name`]}
                  </Table.Th>
                )
            )}
            <Table.Th className="font-bold">Detail</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {DataActivity?.map((activity: any, index: number) => {
            return (
              <Table.Tr key={index}>
                <Table.Td>{activity.attendance.employee.name}</Table.Td>
                {Array.from(
                  { length: 10 },
                  (_, i) =>
                    activity[`custom${i + 1}`] != '' && (
                      <Table.Th key={i} className="capitalize">
                        {activity[`custom${i + 1}`]}
                      </Table.Th>
                    )
                )}
                <Table.Td>
                  <Button
                    size="xs"
                    onClick={() => {
                      setDataActivityToShow(activity);
                      open();
                    }}
                  >
                    Detail
                  </Button>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>

      <Divider my="lg" mt="xl" label="Daftar Lokasi Aktifitas Karyawan" labelPosition="left" />

      <div className="mt-2">
        <MapContainer
          style={{ height: '50vh', zIndex: 0 }}
          center={[
            DataActivity[0]?.activity_lat ?? -3.7536276323430213,
            DataActivity[0]?.activity_lon ?? 114.7677391547546,
          ]}
          zoom={10}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {DataActivity?.map((location: any) => (
            <Marker key={location.id} position={[location?.activity_lat, location?.activity_lon]}>
              <Popup>
                <h4>{location.attendance.employee.name}</h4>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <Modal size={'lg'} opened={opened} onClose={close} title="Detail Aktifitas">
        <LocationShow
          latitude={DataActivityToShow?.activity_lat}
          longitude={DataActivityToShow?.activity_lon}
          title="Lokasi Aktifitas"
        />
        <Divider my="xs" label="Detail Karyawan" labelPosition="left" />
        <table className="text-xs mb-8">
          <tbody>
            <tr className="capitalize">
              <td>Nama Karyawan</td>
              <td className="px-4">:</td>
              <td>{DataActivityToShow?.attendance.employee.name}</td>
            </tr>
            <tr className="capitalize">
              <td>Telphone</td>
              <td className="px-4">:</td>
              <td>{DataActivityToShow?.attendance.employee.phone}</td>
            </tr>
          </tbody>
        </table>
        <Divider my="xs" label="Daftar Aktifitas" labelPosition="left" />
        <table className="text-xs">
          <tbody>
            {Array.from(
              { length: 10 },
              (_, i) =>
                DataActivityAlias[0][`cs${i + 1}_name`] != '' && (
                  <tr key={i} className="capitalize">
                    <td>{DataActivityAlias[0][`cs${i + 1}_name`]}</td>
                    <td className="px-4">:</td>
                    <td>{DataActivityToShow?.[`custom${i + 1}`] ?? ''}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>

        <div className="mb-12">
          <Button
            color="gray"
            onClick={close}
            className="mt-4"
            style={{ float: 'right' }}
            size="xs"
          >
            Tutup
          </Button>
        </div>
      </Modal>
    </>
  );
};
