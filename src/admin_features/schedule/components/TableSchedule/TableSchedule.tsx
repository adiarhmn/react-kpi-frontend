/* eslint-disable linebreak-style */
import { ActionIcon, Button, CopyButton, Modal, Select, Table } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconClipboardText,
  IconCopy,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { SchedulesType, EditScheduleItemType } from '@/admin_features/schedule/types';
import { useGetShift } from '@/admin_features/shift/api';
import { ShiftType } from '@/admin_features/types';
import { formatDateToString, getDaysInMonth, getStartAndEndOfMonth } from '@/utils/format';

import { useDeleteScheduleEmployee, useEditFreeDay } from '../../api';
import { useGetSchedule } from '../../api/getSchedule';
import { DataPasteScheduleMonth, usePasteMonthSchedule } from '../../api/pasteMonthSchedule';
import { DataPasteSchedule, usePasteSchedule } from '../../api/pasteSchedule';

type TableScheduleProps = {
  month: Date;
  setMonth: (month: Date) => void;
  setIsSchedule: (value: boolean) => void;
};

export const TableSchedule: React.FC<TableScheduleProps> = ({ month, setMonth, setIsSchedule }) => {
  // Data Master Schedule
  const [dataSchedule, setDataSchedule] = useState<SchedulesType[]>([]);
  const { data, refetch } = useGetSchedule(month.getMonth() + 1, month.getFullYear());
  const { data: dataShift, isLoading: loadingGetShift } = useGetShift();
  const location = useLocation();

  // Edit Data
  const [opened, modal] = useDisclosure(false);
  const [FreeDays, setFreeDay] = useState(false);
  const [DataEditFreeDay, setDataEditFreeDay] = useState<EditScheduleItemType[]>([]);
  const MutationEditItemSchedule = useEditFreeDay();

  // State For Copy Data Schedule
  const [DataCopySchedule, setDataCopySchedule] = useState<SchedulesType>();
  const MutationPaste = usePasteSchedule();
  const MutationPasteMonth = usePasteMonthSchedule();
  const [MonthCopyDataSchedule, setMonthCopyDataSchedule] = useState<SchedulesType[]>([]);

  // Delete Data Schedule
  const MutationDeleteEmployeeSchedule = useDeleteScheduleEmployee();

  // Get Month Location
  const monthLocation =
    new URLSearchParams(location.search).get('month') ?? formatDateToString(new Date().toString());

  // Use State Untuk Mengganti Shift atau default Libur
  const form = useForm({
    initialValues: {
      value_edit: 'libur',
    },
  });

  // Update Data Schedule When Data Schedule Change
  useEffect(() => {
    if (data) {
      setDataSchedule(data.data);
      if (data.data.length > 0) {
        setIsSchedule(true);
      } else {
        setIsSchedule(false);
      }
    }
  }, [data, dataShift, setIsSchedule]);

  // [START] Copy Data Schedule
  const SaveCopySchedule = (index: number) => {
    setDataCopySchedule(dataSchedule[index]);
  };

  const PasteDataSchedule = (index: number) => {
    const DataPaste: DataPasteSchedule = {
      beforeDataSchedule: DataCopySchedule,
      afterDataSchedule: dataSchedule[index],
    };

    MutationPaste.mutateAsync(DataPaste, {
      onSuccess: () => {
        refetch();
        notifications.show({
          message: 'Berhasil Menyalin Jadwal',
          color: 'green',
        });
      },
      onError: () => {
        notifications.show({
          message: 'Gagal Menyalin Jadwal',
          color: 'red',
        });
      },
    });

    console.log('Data Paste:', DataPaste);
  };

  const handlePasteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { startOfMonth, endOfMonth } = getStartAndEndOfMonth(monthLocation);

    const DataPasteMonth: DataPasteScheduleMonth = {
      DataScheduleOld: MonthCopyDataSchedule,
      month: month.getMonth() + 1,
      year: month.getFullYear(),
      default_shift: dataShift.data[0].id,
      date_start: formatDateToString(startOfMonth.toString()),
      date_end: formatDateToString(endOfMonth.toString()),
    };

    await MutationPasteMonth.mutateAsync(DataPasteMonth, {
      onSuccess: (data) => {
        console.log('Success Paste: ', data);
        refetch();
      },
    });
  };
  // [END] Copy Data Schedule

  //[START] Simpan Data Edit Libur
  //  => Update State Data Edit FreeDay
  const EditFreeDays = async (newFreeDay: EditScheduleItemType) => {
    const newEditLibur = [...DataEditFreeDay];
    const index = newEditLibur.findIndex((item) => item.schedule_id === newFreeDay.schedule_id);
    if (index === -1) {
      setDataEditFreeDay((prev) => prev.concat(newFreeDay));
    } else {
      setDataEditFreeDay((prev) =>
        prev.filter((item) => item.schedule_id !== newFreeDay.schedule_id)
      );
    }
  };

  //  => Handle Form Value (MAPING DATA FOR REQUEST BODY TO API)
  const HandleFormValue = () => {
    if (form.values.value_edit != 'libur') {
      const new_data_edit: EditScheduleItemType[] = DataEditFreeDay.map((data_edit) => {
        return {
          schedule_id: data_edit.schedule_id,
          status: 'on',
          shift_id: parseInt(form.values.value_edit),
        };
      });

      return new_data_edit;
    } else {
      const new_data_edit: EditScheduleItemType[] = DataEditFreeDay.map((data_edit) => {
        return {
          schedule_id: data_edit.schedule_id,
          status: 'off',
          shift_id: data_edit.shift_id,
        };
      });
      return new_data_edit;
    }
  };

  //  => Reset State Data Edit FreeDay
  const ResetDataEditItemSchedule = () => {
    refetch();
    setDataEditFreeDay([]);
    modal.close();
  };

  //  => Handle Confirm Edit Schedule (Save Data)
  const HandleConfirmEditItemSchedule = async () => {
    const data_submit = HandleFormValue();
    MutationEditItemSchedule.mutateAsync(data_submit, {
      onSuccess: (data) => {
        modal.close();
        refetch();
        ResetDataEditItemSchedule();
        notifications.show({
          message: 'Berhasil Mengubah Jadwal',
          color: 'green',
        });

        console.log('Success :', data);
      },
    });
  };
  //[END] Simpan Data Edit Libur

  // Delete Data Schedule from Employee
  const DeleteEmployeeSchedule = (id: number) => {
    console.log('Delete Schedule');
    MutationDeleteEmployeeSchedule.mutateAsync(id, {
      onError: () => {
        console.log('Error Delete Schedule Employee:');
        notifications.show({
          message: 'Gagal Menghapus Jadwal ',
          color: 'red',
        });
      },
      onSuccess: () => {
        refetch();
        notifications.show({
          message: 'Berhasil Menghapus Jadwal',
          color: 'green',
        });
      },
    });
  };

  // Loading Data
  if (loadingGetShift) {
    return <div>Loading...</div>;
  }

  const OptionDataShiftSelection = dataShift.data.map((shift: ShiftType) => {
    return {
      label: shift.shift_name,
      value: shift.id.toString(),
    };
  });

  const ShowScheduleCell = (scheduleItem: EditScheduleItemType) => {
    if (scheduleItem.checked) {
      return { className: 'bg-blue-600 text-white', value: <IconCheck size={10} /> };
    } else if (scheduleItem.status == 'off') {
      return { className: 'bg-red-600 text-white', value: '-' };
    } else {
      return { className: '', value: scheduleItem.shift_id };
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-3">
      <div className="mb-3 flex gap-2 justify-between flex-wrap">
        <form action="">
          <MonthPickerInput
            className="w-56"
            placeholder="Pilih Bulan"
            value={month}
            onChange={(value) => {
              setDataCopySchedule(undefined);
              if (value === null) {
                setMonth(monthLocation ? new Date(monthLocation) : new Date());
              } else {
                setMonth(value);
              }
            }}
          ></MonthPickerInput>
        </form>
        {dataSchedule.length > 0 ? (
          <div className="flex gap-2">
            <CopyButton value="KPI">
              {({ copied, copy }) => (
                <Button
                  color={copied ? 'yellow' : 'green'}
                  leftSection={<IconCopy size={15}></IconCopy>}
                  variant="light"
                  onClick={() => {
                    copy();
                    setMonthCopyDataSchedule(dataSchedule);
                  }}
                >
                  Copy Jadwal
                </Button>
              )}
            </CopyButton>
            <Button
              onClick={() => {
                setFreeDay(!FreeDays);
                setDataCopySchedule(undefined);
                if (DataEditFreeDay.length > 0 && FreeDays) {
                  modal.open();
                }
              }}
              style={{ zIndex: FreeDays ? 9999 : 1, position: 'relative' }}
              leftSection={<IconSettings size={15} />}
            >
              {FreeDays ? 'Simpan' : 'Edit Jadwal'}
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>

      {/* Informasi Shift */}

      <div className="mb-4">
        <div className="text-xs">Keterangan :</div>
        <table className="text-xs">
          <tbody>
            {dataShift.data.map((shift: ShiftType) => (
              <tr key={shift.id}>
                <td className="text-center font-bold">{shift.id}</td>
                <td className="w-5 text-center"> : </td>
                <td className="w-10">{shift.shift_name}</td>
                <td className="pl-2">{shift.start_time + ' - ' + shift.end_time}</td>
              </tr>
            ))}
            <tr>
              <td className="text-center font-bold">-</td>
              <td className="w-5 text-center"> : </td>
              <td className="w-10">Libur</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table Jadwal */}
      <div
        className="absolute bg-black opacity-50 top-0 left-0 w-full h-screen"
        style={{ zIndex: FreeDays ? 999 : 1, display: FreeDays ? '' : 'none' }}
      ></div>
      {dataSchedule.length > 0 && (
        <div
          className="relative bg-white overflow-x-auto border border-slate-300"
          style={{ zIndex: FreeDays ? 9999 : 1 }}
        >
          <Table withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="sticky left-0 bg-gray-200 min-w-60 font-semibold">
                  <sub>Nama</sub>\<sup>Tgl</sup>
                </Table.Th>
                {Array.from({ length: getDaysInMonth(monthLocation) }).map((_, index) => (
                  <Table.Th className="bg-gray-200 font-semibold" key={index}>
                    {index + 1}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {dataSchedule.map((item: any, rowIndex: number) => (
                <Table.Tr key={rowIndex}>
                  <Table.Td className="sticky left-0 bg-gray-200">
                    <div className="w-full flex justify-between">
                      <span>{item.employee.name}</span>
                      <ActionIcon.Group>
                        {
                          // Menampilkan Tombol Copy Schedule
                          DataCopySchedule ? (
                            <ActionIcon
                              variant="default"
                              onClick={() => PasteDataSchedule(rowIndex)}
                              loading={MutationPaste.isPending}
                            >
                              <IconClipboardText size={12} />
                            </ActionIcon>
                          ) : (
                            <ActionIcon
                              variant="default"
                              onClick={() => SaveCopySchedule(rowIndex)}
                            >
                              <IconCopy size={15} />
                            </ActionIcon>
                          )
                        }
                        <ActionIcon
                          variant="default"
                          onClick={() => DeleteEmployeeSchedule(item.id)}
                        >
                          <IconTrash size={15} className="text-red-600" />
                        </ActionIcon>
                      </ActionIcon.Group>
                    </div>
                  </Table.Td>
                  {item?.Schedules.map((schedule: any, colIndex: number) => (
                    <Table.Td
                      key={colIndex}
                      onClick={() => {
                        if (FreeDays) {
                          const newSchedule = [...dataSchedule];
                          console.log(newSchedule);
                          newSchedule[rowIndex].Schedules[colIndex].status =
                            newSchedule[rowIndex].Schedules[colIndex].status == 'off'
                              ? 'on'
                              : 'off';
                          newSchedule[rowIndex].Schedules[colIndex].checked =
                            newSchedule[rowIndex].Schedules[colIndex].checked == true
                              ? false
                              : true;
                          setDataSchedule(newSchedule);

                          //   Menyimpan Data Untuk Direquest
                          const newFreeDay: EditScheduleItemType = {
                            schedule_id: newSchedule[rowIndex].Schedules[colIndex].id,
                            status: newSchedule[rowIndex].Schedules[colIndex].status,
                            shift_id: newSchedule[rowIndex].Schedules[colIndex].shift_id,
                          };
                          EditFreeDays(newFreeDay);
                        }
                      }}
                      className={`cursor-pointer ${ShowScheduleCell(schedule).className}`}
                    >
                      {ShowScheduleCell(schedule).value}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          {/* Modal Konfirmasi Edit Schedule */}
          <Modal
            opened={opened}
            onClose={() => {
              modal.close();
              ResetDataEditItemSchedule();
              refetch();
            }}
            title={<span className="font-semibold text-sm">Konfirmasi Edit Jadwal ?</span>}
            withCloseButton={false}
          >
            <div>
              <div>
                <span>Pilih Ganti </span>
                <Select
                  allowDeselect={false}
                  data={[...OptionDataShiftSelection, { value: 'libur', label: 'Libur' }]}
                  value={form.values.value_edit}
                  {...form.getInputProps('value_edit')}
                />
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <Button
                  onClick={() => {
                    HandleConfirmEditItemSchedule();
                  }}
                  loading={MutationEditItemSchedule.isPending}
                >
                  Ya
                </Button>
                <Button onClick={ResetDataEditItemSchedule} color="red">
                  Tidak
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {dataSchedule.length === 0 && (
        <div className="text-center text-slate-400 my-20">
          <div className="mb-2">Tidak ada jadwal yang tersedia</div>
          {MonthCopyDataSchedule.length > 0 && (
            <form onSubmit={handlePasteSubmit}>
              <Button type="submit" leftSection={<IconClipboardText size={15} />}>
                Paste
              </Button>
            </form>
          )}
        </div>
      )}
    </section>
  );
};
