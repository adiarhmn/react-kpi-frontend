import { EmployeeType } from '@/admin_features/types';
import { useGetWorker } from '../api';
import { Button, Divider, Tabs, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUser } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { GroupType, SessionType } from '../types';

type ListLaborerProps = {
  group: GroupType;
  session: SessionType;
};

export const ListLaborer: React.FC<ListLaborerProps> = ({ group, session }: ListLaborerProps) => {
  const [workers, setWorkers] = useState<EmployeeType[]>([]);
  const { data: DataWorker } = useGetWorker(group.id);

  useEffect(() => {
    if (DataWorker) {
      setWorkers(DataWorker);
    }
  }, [DataWorker]);

  const form = useForm({
    initialValues: {
      workers: workers.map((worker) => ({
        employee_id: worker.id,
        attendance_status: 'H',
        detail: '',
        employee_group_id: group.id,
        group_session_id: session.id,
        group_name: group.name,
        session_name: session.name,
      })),
    },
  });

  useEffect(() => {
    if (workers.length > 0) {
      form.setValues({
        workers: workers.map((worker) => ({
          employee_id: worker.id,
          attendance_status: 'H',
          detail: '',
          employee_group_id: group.id,
          group_session_id: session.id,
          group_name: group.name,
          session_name: session.name,
        })),
      });
    }
  }, [workers]);

  const handleSubmit = (values: any) => {
    const payload = {
      employee_input_id: '', // Assuming this value is static or comes from somewhere else
      worker: values.workers,
    };
    console.log('Submitted Data:', payload);
  };

  return (
    <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-md rounded-lg flex flex-col mt-2 mb-8">
      <div className="flex justify-between items-center text-blue-700 mb-1 px-2 py-1">
        <div className="flex items-center">
          <Text fw={700} c="blue">
            Daftar pekerja
          </Text>
        </div>
        <span className="font-semibold">
          <IconUser />
        </span>
      </div>
      <Divider size={'sm'} />
      <div className="grid grid-cols-12 px-2 text-center gap-x-1 ">
        <div className="col-span-4 bg-green-600 rounded-md mt-1">
          <Text size={'xs'} c={'white'}>
            H = Hadir
          </Text>
        </div>
        <div className="col-span-4 bg-red-700 rounded-md mt-1">
          <Text size={'xs'} c={'white'}>
            A = Absen
          </Text>
        </div>
        <div className="col-span-4 bg-yellow-600 rounded-md mt-1">
          <Text size={'xs'} c={'white'}>
            I = Izin
          </Text>
        </div>
      </div>
      <div className="mt-2">
        <Divider size={'lg'} />
      </div>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        {form.values.workers.length > 0 ? (
          form.values.workers.map((worker, index) => (
            <div key={index} className="grid grid-cols-12 px-2 mb-1 mt-2">
              <div className="col-span-12 py-2">
                <div className="my-auto text-left">
                  <Text lineClamp={1} size={'sm'} fw={800}>
                    {worker.employee_id}
                  </Text>
                </div>
                <Divider className="w-full mt-1 mb-1" />
                <div className="grid grid-cols-12 text-left mb-4">
                  <div className="col-span-6">
                    <Text size={'xs'} fw={500}>
                      Status kehadiran :
                    </Text>
                  </div>
                  <div className="col-span-6">
                    <Tabs
                      color="#51CF66"
                      variant="pills"
                      value={worker.attendance_status}
                      onChange={(value: any) =>
                        form.setFieldValue(`workers.${index}.attendance_status`, value)
                      }
                    >
                      <section className="w-full py-3 -mt-1 -mb-5 -mt-3">
                        <Tabs.List className="w-full grid grid-cols-12 text-center">
                          <div className="grid grid-cols-12 text-center gap-x-2">
                            <div className="col-span-4 bg-white shadow-md rounded-sm">
                              <Tabs.Tab style={{ width: '100%', height: '30px' }} value="H">
                                H
                              </Tabs.Tab>
                            </div>
                            <div className="col-span-4 bg-white shadow-md rounded-sm">
                              <Tabs.Tab style={{ width: '100%', height: '30px' }} value="A">
                                A
                              </Tabs.Tab>
                            </div>
                            <div className="col-span-4 bg-white shadow-md rounded-sm">
                              <Tabs.Tab style={{ width: '100%', height: '30px' }} value="I">
                                I
                              </Tabs.Tab>
                            </div>
                          </div>
                        </Tabs.List>
                      </section>
                    </Tabs>
                  </div>
                  <div className="col-span-12">
                    <TextInput
                      label="Keterangan"
                      size="xs"
                      placeholder="keterangan"
                      {...form.getInputProps(`workers.${index}.detail`)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Divider size={'lg'} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full col-span-12">
            <section className="min-h-96 flex flex-col items-center justify-center -mt-10 -mb-15">
              <img
                className="w-28 mb-2 bg-slate-200 rounded-full p-2"
                src="/images/blank-canvas.svg"
                alt=""
              />
              <span className="font-bold text-slate-400 text-base">Belum ada data pekerja lepas</span>
            </section>
          </div>
        )}
        <div>
          <Button fullWidth type="submit">
            Simpan kehadiran
          </Button>
        </div>
      </form>
    </section>
  );
};
