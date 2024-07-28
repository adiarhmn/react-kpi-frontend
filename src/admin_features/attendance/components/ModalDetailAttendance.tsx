import { Badge, Button, Divider, Modal } from '@mantine/core';

import { LocationShow } from '@/admin_features/activity';
import { useGetActivityAlias, useGetActivityByEmployeeID } from '@/admin_features/activity/api';
import { ScheduleAttendanceType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

interface Props {
  opened: boolean;
  close: () => void;
  Attendance?: ScheduleAttendanceType;
  date: string;
}
export const ModalDetailAttendance: React.FC<Props> = ({ opened, close, Attendance, date }) => {
  const { creds } = useAuth();
  const { data, isLoading } = useGetActivityByEmployeeID(
    Attendance?.employee_schedule.employee.id ?? 0,
    date
  );

  const { data: ActivityAlias, isLoading: loadAlias } = useGetActivityAlias(creds?.company_id);

  if (isLoading || loadAlias) return <div>Loading...</div>;

  return (
    <Modal size={'lg'} opened={opened} onClose={close} title="Detail Presensi">
      {Attendance && Attendance?.Attendance.length > 0 ? (
        <LocationShow
          latitude={parseFloat(Attendance?.Attendance[0].attendance_lat)}
          longitude={parseFloat(Attendance?.Attendance[0].attendance_lon)}
          title="Lokasi Attendance"
        />
      ) : (
        <div className="flex justify-center items-center w-full h-24">
          <h1 className="text-red-500 font-semibold">Karyawan Belum Absen</h1>
        </div>
      )}
      <Divider my="xs" label="Detail Karyawan" labelPosition="left" />
      <table className="text-sm mb-8">
        <tbody>
          <tr className="capitalize">
            <td>Nama Karyawan</td>
            <td className="px-4">:</td>
            <td>{Attendance?.employee_schedule.employee.name}</td>
          </tr>
          <tr className="capitalize">
            <td>Telphone</td>
            <td className="px-4">:</td>
            <td>{Attendance?.employee_schedule.employee.phone}</td>
          </tr>
          <tr className="capitalize">
            <td>Divisi</td>
            <td className="px-4">:</td>
            <td>{Attendance?.employee_schedule.employee.division.division_name}</td>
          </tr>
        </tbody>
      </table>

      <Divider label="Jadwal Karyawan ini" labelPosition="left" />
      <table className="mb-8 text-sm">
        <tr className="capitalize">
          <td>Status</td>
          <td className="px-4">:</td>
          <td>
            {Attendance?.status == 'on' ? (
              <Badge color="green">Masuk</Badge>
            ) : (
              <Badge color="red">Libur</Badge>
            )}
          </td>
        </tr>
        <tr className="capitalize">
          <td>Shift</td>
          <td className="px-4">:</td>
          <td>{Attendance?.shift.shift_name}</td>
        </tr>
        <tr className="capitalize">
          <td>Shift In</td>
          <td className="px-4">:</td>
          <td>{Attendance?.shift.start_time}</td>
        </tr>
        <tr className="capitalize">
          <td>Shift Out</td>
          <td className="px-4">:</td>
          <td>{Attendance?.shift.end_time}</td>
        </tr>
      </table>
      <Divider label="Daftar Aktifitas" labelPosition="left" />
      {data && data.length > 0 ? (
        <div className="overflow-x-auto mt-2">
          <table className="text-xs w-full">
            <thead>
              <tr>
                {Array.from(
                  { length: 10 },
                  (_, i) =>
                    ActivityAlias[0][`cs${i + 1}_name`] != '' && (
                      <td
                        key={i}
                        className="font-bold capitalize border border-slate-300 min-w-36 p-1 py-3"
                      >
                        {ActivityAlias[0][`cs${i + 1}_name`]}
                      </td>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {data?.map((activity: any, index: number) => {
                return (
                  <tr key={index}>
                    {Array.from(
                      { length: 10 },
                      (_, i) =>
                        activity[`custom${i + 1}`] != '' && (
                          <td key={i} className="p-1 py-3 border border-slate-300 min-w-36">
                            {activity[`custom${i + 1}`]}
                          </td>
                        )
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-24">
          <h1 className="text-red-500 font-semibold">Belum Ada Aktivitas Hari Ini</h1>
        </div>
      )}

      <div className="pb-12">
        <Button color="gray" onClick={close} className="mt-4" style={{ float: 'right' }} size="xs">
          Tutup
        </Button>
      </div>
    </Modal>
  );
};
