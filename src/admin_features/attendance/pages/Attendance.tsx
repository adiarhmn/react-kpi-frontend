/* eslint-disable linebreak-style */
import { Badge, Button, Divider, Modal, Table, UnstyledButton } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowUpRight, IconEye } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LocationShow } from '@/admin_features/activity';
import { ScheduleAttendanceType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';
import { DatetimeToDateString, DatetimeToTime, formatDateToString } from '@/utils/format';

import { useGetAttendance } from '../api';
import { StateAttendance } from '../components/StateAttendance';

export const Attendance: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (!creds) navigate('/login');

  const [date, setDate] = useState<Date>(new Date());
  const [opened, { open, close }] = useDisclosure(false);
  const [Attendance, setAttendance] = useState<ScheduleAttendanceType>();

  const { data: DataAttendances, isLoading: LoadingGetAttendance } = useGetAttendance(
    formatDateToString(date.toString()),
    creds?.company_id
  );

  const handleDetail = (data: ScheduleAttendanceType) => {
    setAttendance(data);
  };

  if (LoadingGetAttendance) return <div>Loading...</div>;
  return (
    <main>
      <section className="bg-white rounded-lg shadow-lg p-5">
        <div className="grid lg:grid-cols-2">
          <div className="">
            <div>
              <h1 className="font-semibold">
                Presensi Karyawan : {DatetimeToDateString(date.toDateString())}
              </h1>
              <div className="-mt-1 text-xs text-slate-400 mb-2">
                Berikut data presensi karyawan
              </div>
            </div>
            <DatePickerInput
              className="max-w-56"
              placeholder="Pick date"
              value={date}
              onChange={(value) => setDate(value as Date)}
            />
          </div>
          <div>
            <Button
              className="border-2 shadow-lg lg:max-w-40 lg:float-end"
              rightSection={<IconArrowUpRight size={14} />}
            >
              Download PDF
            </Button>
          </div>
        </div>
        <Divider
          className="mt-4 mb-3"
          label={
            <span className="text-sm">
              Data Cepat Presensi : {DatetimeToDateString(date.toDateString())}
            </span>
          }
        />
        <StateAttendance date={formatDateToString(date.toDateString())} />
        <Divider
          className="mt-8"
          label={
            <span className="text-sm">
              Daftar Presensi Pada : {DatetimeToDateString(date.toDateString())}
            </span>
          }
        />
        <div className="overflow-x-auto mt-3">
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="font-semibold" style={{ width: 300 }}>
                  Nama Karyawan
                </Table.Th>
                <Table.Th className="font-semibold" style={{ width: 200 }}>
                  Divisi
                </Table.Th>
                <Table.Th className="font-semibold" style={{ width: 200 }}>
                  Check In | Check Out
                </Table.Th>
                <Table.Th className="font-semibold">Shift</Table.Th>
                <Table.Th className="font-semibold">Status Kerja</Table.Th>
                <Table.Th className="font-semibold">Keterangan</Table.Th>
                <Table.Th>
                  <div className="text-center font-semibold">Detail</div>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {DataAttendances?.map((item: ScheduleAttendanceType) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.employee_schedule.employee.name}</Table.Td>
                  <Table.Td>{item.employee_schedule.employee.division.division_name}</Table.Td>

                  {item.Attendance.length > 0 ? (
                    <Table.Td>
                      {item.Attendance.length > 0 && item.Attendance[0].check_in != null ? (
                        <Badge color="green">{DatetimeToTime(item.Attendance[0].check_in)}</Badge>
                      ) : (
                        ''
                      )}
                      {' | '}
                      {item.Attendance.length > 0 && item.Attendance[0].check_out != null ? (
                        <Badge color="red">{DatetimeToTime(item.Attendance[0].check_out)}</Badge>
                      ) : (
                        <Badge color="red">-</Badge>
                      )}
                    </Table.Td>
                  ) : (
                    <Table.Td>-</Table.Td>
                  )}
                  <Table.Td className="capitalize">
                    {item.shift ? item.shift.shift_name : '-'}
                  </Table.Td>
                  <Table.Td className="uppercase">
                    {item.status == 'off' ? (
                      <Badge color="red">
                        <div className="w-10 text-center">Libur</div>
                      </Badge>
                    ) : (
                      <Badge color="blue">
                        <div className="w-10 text-center">Masuk</div>
                      </Badge>
                    )}

                    {item.status == 'on' ? (
                      <Badge
                        variant="outline"
                        color={item.attendance_place == 'WFH' ? 'green' : 'yellow'}
                        className="ml-2"
                      >
                        {item.attendance_place == 'WFH' ? 'WFH' : 'WFO'}
                      </Badge>
                    ) : (
                      ''
                    )}
                  </Table.Td>

                  {item.Attendance.length > 0 ? (
                    <Table.Td className="flex gap-2">
                      {item.Attendance.length > 0 && item.Attendance[0]?.status == 'present' && (
                        <Badge color="green">
                          <div className="w-20 text-center">Hadir</div>
                        </Badge>
                      )}

                      {item.Attendance.length > 0 && item.Attendance[0]?.status == 'late' && (
                        <div>
                          <Badge color="green">
                            <div className="w-20 text-center">Hadir</div>
                          </Badge>
                          <Badge color="red">
                            <div className="text-center">T</div>
                          </Badge>
                        </div>
                      )}
                    </Table.Td>
                  ) : (
                    <Table.Td>
                      {item.attendance_status.toLowerCase() == 'belum hadir' ? (
                        <Badge color="red">
                          <div className="w-20 text-center">{item.attendance_status}</div>
                        </Badge>
                      ) : (
                        <Badge variant="default" color="red">
                          <div className="w-20 text-center">{item.attendance_status}</div>
                        </Badge>
                      )}
                    </Table.Td>
                  )}
                  <Table.Td className="text-center">
                    <UnstyledButton
                      onClick={() => {
                        handleDetail(item);
                        open();
                      }}
                    >
                      <IconEye size={20} className="text-blue-600" />
                    </UnstyledButton>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

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
              </tbody>
            </table>

            <div className="pb-12">
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
        </div>
      </section>
    </main>
  );
};
