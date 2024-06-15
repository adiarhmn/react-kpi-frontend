/* eslint-disable import/order */
import { useAuth } from '@/features/auth';
import { Tabs } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeRequestList } from '../components';

export const EmployeeRequest: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const [selectType, setSelectType] = useState('sakit');

  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Permintaan anggota</h2>
          </div>
          <span className="font-semibold"></span>
        </div>
      </section>

      <Tabs color="#51CF66" variant="pills" defaultValue="sakit">
        <Tabs.List className="sm:w-screen w-full mx-5 text-center py-3 overflow-x-auto overflow-y-hidden mb-1">
          <div className="flex w-max justify-start gap-x-2 px-6">
            <div className="bg-white min-w-[8rem] shadow-md rounded-2xl">
              <Tabs.Tab
                style={{ width: '100%', borderRadius: '20px' }}
                color="blue"
                value="sakit"
                onClick={() => setSelectType('sakit')}
              >
                Sakit
              </Tabs.Tab>
            </div>
            <div className="bg-white min-w-[8rem] shadow-md rounded-2xl">
              <Tabs.Tab
                style={{ width: '100%', borderRadius: '20px' }}
                color="blue"
                value="izin"
                onClick={() => setSelectType('izin')}
              >
                Izin
              </Tabs.Tab>
            </div>
            <div className="bg-white min-w-[8rem] shadow-md rounded-2xl">
              <Tabs.Tab
                style={{ width: '100%', borderRadius: '20px' }}
                color="blue"
                value="lembur"
                onClick={() => setSelectType('lembur')}
              >
                Lembur
              </Tabs.Tab>
            </div>
          </div>
        </Tabs.List>
      </Tabs>

      <EmployeeRequestList type={selectType} />
    </main>
  );
};
