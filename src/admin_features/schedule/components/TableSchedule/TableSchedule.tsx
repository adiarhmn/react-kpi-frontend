import { Button, Modal, Select, Table } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconSettings } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

import { SchedulesType, EditScheduleItemType } from '@/admin_features/schedule/types';
import { useGetShift } from '@/admin_features/shift/api';
import { ShiftType } from '@/admin_features/types';

import { useEditFreeDay } from '../../api';
import { useGetSchedule } from '../../api/getSchedule';

type TableScheduleProps = {
  month: Date;
  setMonth: (month: Date) => void;
  setIsSchedule: (value: boolean) => void;
};

export const TableSchedule: React.FC<TableScheduleProps> = ({ month, setMonth, setIsSchedule }) => {
  const [FreeDays, setFreeDay] = useState(false);
  const [opened, modal] = useDisclosure(false);
  const [dataSchedule, setDataSchedule] = useState<SchedulesType[]>([]);
  const [DataEditFreeDay, setDataEditFreeDay] = useState<EditScheduleItemType[]>([]);
  const MutationEditItemSchedule = useEditFreeDay();
  const { data, refetch } = useGetSchedule(month.getMonth() + 1, month.getFullYear());
  const { data: dataShift, isLoading: loadingGetShift } = useGetShift();
  // Use State Untuk Mengganti Shift atau default Libur
  const form = useForm({
    initialValues: {
      value_edit: 'libur',
    },
  });

  useEffect(() => {
    if (data) {
      setDataSchedule(data.data);
      if (data.data.length > 0) {
        setIsSchedule(true);
      } else {
        setIsSchedule(false);
      }
    }

    if (dataShift) {
      console.log('Data Shit :', dataShift.data);
    }
  }, [data, dataShift, setIsSchedule]);

  //Simpan Data Edit Libur
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

  const HandleConfirmEditItemSchedule = async () => {
    const data_submit = HandleFormValue();
    MutationEditItemSchedule.mutateAsync(data_submit, {
      onSuccess: (data) => {
        modal.close();
        refetch();
        notifications.show({
          message: 'Berhasil Mengubah Jadwal',
          color: 'green',
        });

        console.log('Success :', data);
      },
    });
  };

  const ResetDataEditItemSchedule = () => {
    setDataEditFreeDay([]);
    modal.close();
  };

  useEffect(() => {
    console.log('Clicked');
    console.log(DataEditFreeDay);
  }, [DataEditFreeDay, dataSchedule]);

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
        <MonthPickerInput
          className="w-56"
          placeholder="Pilih Bulan"
          value={month}
          onChange={(value) => {
            if (value === null) {
              setMonth(new Date());
            } else {
              setMonth(value);
            }
          }}
        ></MonthPickerInput>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setFreeDay(!FreeDays);
              if (DataEditFreeDay.length > 0) {
                modal.open();
              }
            }}
            style={{ zIndex: FreeDays ? 9999 : 1, position: 'relative' }}
            leftSection={<IconSettings size={15} />}
          >
            {FreeDays ? 'Simpan' : 'Edit Jadwal'}
          </Button>
        </div>
      </div>
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
                <Table.Th className="sticky left-0 bg-white">
                  <sub>Nama</sub>\<sup>Tgl</sup>
                </Table.Th>
                {Array.from({ length: data?.data[0]?.Schedules.length }).map((_, index) => (
                  <Table.Th key={index}>{index + 1}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {dataSchedule.map((item: any, rowIndex: number) => (
                <Table.Tr key={rowIndex}>
                  <Table.Td className="sticky left-0 bg-white">{item.employee.name}</Table.Td>
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
        <div className="text-center text-slate-400 my-20">Tidak ada jadwal yang tersedia</div>
      )}
    </section>
  );
};
