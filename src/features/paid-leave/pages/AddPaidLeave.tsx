/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { Button, Indicator, Textarea, rem } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendar, IconChevronLeft } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { AbsenceType, formatterDate, useGetAbsenceMonthly } from '@/features/history';
import { useCreateRequest } from '@/features/leave/api';
import { ScheduleType } from '@/features/attendance';
import { useGetScheduleMonthly } from '@/features/schedule/api';

export const AddPaidLeave: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      date_start: new Date(),
      date_end: new Date(new Date().setDate(new Date().getDate() + 5)),
      description: '',
    },
    validate: {
      description: (value) => (value === '' ? 'Keterangan tidak boleh kosong' : null),
    },
  });

  const mutationCreatePaidLeave = useCreateRequest();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const paidLeaveData = {
      date_start: formatterDate(form.values.date_start, 'yyyy-MM-dd'),
      date_end: formatterDate(form.values.date_end, 'yyyy-MM-dd'),
      type: 'cuti',
      description: form.values.description,
      employee_id: creds?.employee_id,
    };

    await mutationCreatePaidLeave.mutateAsync(paidLeaveData, {
      onSuccess: (data) => {
        localStorage.setItem('hasNotifiedPaidLeave', 'no');
        navigate('/paid-leave', {
          state: { success: `Pengajuan ${data.data.type} berhasil ditambahkan` },
        });
        close();
      },
    });
  };

  const icon = <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date.getMonth() + 1);
    setCurrentYear(date.getFullYear());
  };

  const generateDateRange = (start: Date | string, end: Date | string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray = [];

    // eslint-disable-next-line prefer-const
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };
  // [RED INDICATOR]
  const [scheduleOff, setScheduleOff] = useState<ScheduleType[]>([]);
  const { data: DataOff } = useGetScheduleMonthly(
    creds?.employee_id,
    currentMonth,
    currentYear,
    '',
    'off'
  );
  useEffect(() => {
    if (DataOff) {
      setScheduleOff(DataOff);
    }
  }, [DataOff]);

  const datesArray = scheduleOff.map((item) => {
    const date = new Date(item.date);
    const day = date.getDate();
    const month = date.getMonth();
    return { day, month };
  });
  // [END RED INDICATOR]

  // [TEAL INDICATOR]
  const [requestSick, setRequestSick] = useState<AbsenceType[]>([]);
  const [formattedAllDates, setFormattedAllDates] = useState([]);
  const { data: DataRequest } = useGetAbsenceMonthly(
    creds?.employee_id,
    currentMonth,
    currentYear,
    'sakit',
    'Disetujui'
  );
  useEffect(() => {
    if (DataRequest) {
      setRequestSick(DataRequest);
    }
  }, [DataRequest, currentMonth]);

  useEffect(() => {
    const allDates = requestSick.reduce((acc: any, item: any) => {
      const dates: any = generateDateRange(item.date_start, item.date_end);
      return acc.concat(dates);
    }, []);

    const formattedDates = allDates.map((date: any) => ({
      day: date.getDate(),
      month: date.getMonth() + 1, // getMonth() mengembalikan bulan dari 0-11, jadi tambahkan 1
      year: date.getFullYear(),
    }));

    setFormattedAllDates(formattedDates);
  }, [requestSick]);
  // [END TEAL INDICATOR]

  // [YELLOW INDICATOR]
  const [requestLeave, setRequestLeave] = useState<AbsenceType[]>([]);
  const [leaveDates, setLeaveDates] = useState([]);
  const { data: DataLeave } = useGetAbsenceMonthly(
    creds?.employee_id,
    currentMonth,
    currentYear,
    'izin',
    'Disetujui'
  );
  useEffect(() => {
    if (DataLeave) {
      setRequestLeave(DataLeave);
    }
  }, [DataLeave, currentMonth]);

  useEffect(() => {
    const allDates = requestLeave.reduce((acc: any, item: any) => {
      const dates: any = generateDateRange(item.date_start, item.date_end);
      return acc.concat(dates);
    }, []);

    const leaveDate = allDates.map((date: any) => ({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    }));

    setLeaveDates(leaveDate);
  }, [requestLeave]);
  // [END YELLOW INDICATOR]

  // [GRAPE INDICATOR]
  const [paidLeave, setPaidLeave] = useState<AbsenceType[]>([]);
  const [paidLeaveDates, setPaidLeaveDates] = useState([]);
  const { data: DataPaidLeave } = useGetAbsenceMonthly(
    creds?.employee_id,
    currentMonth,
    currentYear,
    'cuti',
    'Disetujui'
  );
  useEffect(() => {
    if (DataPaidLeave) {
      setPaidLeave(DataPaidLeave);
    }
  }, [DataPaidLeave, currentMonth]);

  useEffect(() => {
    const allDates = paidLeave.reduce((acc: any, item: any) => {
      const dates: any = generateDateRange(item.date_start, item.date_end);
      return acc.concat(dates);
    }, []);

    const paidLeaveDate = allDates.map((date: any) => ({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    }));

    setPaidLeaveDates(paidLeaveDate);
  }, [paidLeave]);
  // [END GRAPE INDICATOR]

  return (
    <main>
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
            <h2 className="font-semibold ">Pengajuan Cuti</h2>
          </div>
        </div>
        <div className="p-2 -mt-2">
          <form onSubmit={handleSubmitForm}>
            <div>
              <DatePickerInput
                valueFormat="dddd, DD MMM YYYY"
                label="Tanggal mulai"
                placeholder="Pilih tanggal"
                leftSection={icon}
                onNextMonth={handleMonthChange}
                onPreviousMonth={handleMonthChange}
                renderDay={(date) => {
                  const day = date.getDate();
                  const month = date.getMonth();
                  const showIndicatorOff = datesArray.some(
                    (d) => d.day === day && d.month === month
                  );
                  const showIndicatorAbsence = formattedAllDates.some(
                    (d: any) => d.day === day && d.month === month + 1
                  );
                  const showIndicatorLeave = leaveDates.some(
                    (d: any) => d.day === day && d.month === month + 1
                  );
                  const showIndicatorPaidLeave = paidLeaveDates.some(
                    (d: any) => d.day === day && d.month === month + 1
                  );

                  // console.log(showIndicatorAbsence);

                  return (
                    <div>
                      <div style={{ position: 'relative' }}>
                        {showIndicatorAbsence && (
                          <Indicator
                            size={6}
                            color="teal"
                            offset={-9}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          ></Indicator>
                        )}
                        <div>{day}</div>
                        {showIndicatorOff && (
                          <Indicator
                            size={6}
                            color="red"
                            offset={-9}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          />
                        )}
                        {showIndicatorLeave && (
                          <Indicator
                            size={6}
                            color="yellow"
                            offset={-9}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          />
                        )}
                        {showIndicatorPaidLeave && (
                          <Indicator
                            size={6}
                            color="grape"
                            offset={-9}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                }}
                {...form.getInputProps('date_start')}
              />
            </div>
            <div className="mt-2">
              <DatePickerInput
                valueFormat="dddd, DD MMM YYYY"
                label="Tanggal selesai"
                placeholder="Pilih tanggal"
                leftSection={icon}
                onNextMonth={handleMonthChange}
                onPreviousMonth={handleMonthChange}
                renderDay={(date) => {
                  const day = date.getDate();
                  const month = date.getMonth();
                  const showIndicatorOff = datesArray.some(
                    (d) => d.day === day && d.month === month
                  );
                  const showIndicatorAbsence = formattedAllDates.some(
                    (d: any) => d.day === day && d.month === month + 1
                  );
                  const showIndicatorLeave = leaveDates.some(
                    (d: any) => d.day === day && d.month === month + 1
                  );
                  const showIndicatorPaidLeave = paidLeaveDates.some(
                    (d: any) => d.day === day && d.month === month + 1
                  );

                  // console.log(showIndicatorAbsence);

                  return (
                    <div>
                      <div style={{ position: 'relative' }}>
                        {showIndicatorAbsence && (
                          <Indicator
                            size={6}
                            color="teal"
                            offset={-9}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          ></Indicator>
                        )}
                        <div>{day}</div>
                        {showIndicatorOff && (
                          <Indicator
                            size={6}
                            color="red"
                            offset={-9}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          />
                        )}
                        {showIndicatorLeave && (
                          <Indicator
                            size={6}
                            color="yellow"
                            offset={-9}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          />
                        )}
                        {showIndicatorPaidLeave && (
                          <Indicator
                            size={6}
                            color="grape"
                            offset={-9}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                }}
                {...form.getInputProps('date_end')}
              />
            </div>
            <div className="mt-2">
              <Textarea
                autosize
                minRows={4}
                label="Keterangan"
                description=""
                placeholder="masukkan keterangan cuti"
                {...form.getInputProps('description')}
              />
            </div>
            <div className="w-full mt-5 grid grid-cols-12 text-center">
              <div className="col-span-6 pe-1">
                <Button fullWidth type="submit" color="blue">
                  Ajukan
                </Button>
              </div>
              <div className="col-span-6 ps-1">
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                  fullWidth
                  color="grey"
                >
                  Batal
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
