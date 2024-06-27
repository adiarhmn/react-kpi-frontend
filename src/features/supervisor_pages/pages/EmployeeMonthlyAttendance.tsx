/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { EmployeeType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';
import { useGetEmployee } from '@/features/employee/api/Profile';
import { Divider, Loader, Tabs, Text } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconCalendar, IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeActivitiesSection, EmployeeAttendancesSection } from '../components';

export const EmployeeMonthlyAttendance: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [selectStatus, setSelectStatus] = useState('Kehadiran');
  const [dateValue, setDateValue] = useState<any>(new Date());
  const [employee, setEmployee] = useState<EmployeeType>();
  const { data: DataEmployee, isLoading: LoadingEmployee } = useGetEmployee(creds?.employee_id);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    }
  }, [DataEmployee]);

  const [scrollPosition, setScrollPosition] = useState({ scrollTop: 0, scrollLeft: 0 });
  const scrollDemoRef = useRef(null);

  const handleScroll = () => {
    if (scrollDemoRef.current) {
      const { scrollTop, scrollLeft } = scrollDemoRef.current;
      setScrollPosition({ scrollTop, scrollLeft });
    }
  };

  if (LoadingEmployee) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>
      <section
        ref={scrollDemoRef}
        onScroll={handleScroll}
        className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10"
      >
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold">
              Rekap <span className="font-semibold lowercase">{selectStatus}</span>
            </h2>
          </div>
          <span className="font-semibold"></span>
        </div>
      </section>

      <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative pb-5 pt-3 px-4 text-slate-700 mb-2 mt-2">
        <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
          <div>
            <Text fw={700} c="blue">
              Kalender
            </Text>
          </div>
          <div className="my-auto text-right -mt-2 me-2">
            <IconCalendar />
          </div>
        </div>
        <Divider size={'sm'} />
        <div className="flex justify-center">
          <DatePicker value={dateValue} onChange={setDateValue} />
        </div>
      </section>

      <section className=" -mt-1 mx-1 flex flex-col">
        <Tabs color="#51CF66" variant="pills" defaultValue="Kehadiran">
          <section className="w-full mx-auto p-1 py-3 -mt-1 -mb-2">
            <Tabs.List className="w-full grid grid-cols-12 text-center">
              <div className="w-full grid grid-cols-12 text-center px-5 gap-x-2">
                <div className="col-span-6 bg-white shadow-md rounded-lg">
                  <Tabs.Tab
                    style={{ width: '100%', borderRadius: '10px' }}
                    color="blue"
                    value="Kehadiran"
                    onClick={() => setSelectStatus('Kehadiran')}
                  >
                    Kehadiran
                  </Tabs.Tab>
                </div>
                <div className="col-span-6 bg-white shadow-md rounded-lg">
                  <Tabs.Tab
                    style={{ width: '100%', borderRadius: '10px' }}
                    color="blue"
                    value="Kegiatan"
                    onClick={() => setSelectStatus('Kegiatan')}
                  >
                    Kegiatan
                  </Tabs.Tab>
                </div>
              </div>
            </Tabs.List>
          </section>
        </Tabs>
      </section>

      {selectStatus == 'Kehadiran' ? (
        <EmployeeAttendancesSection division_id={employee?.division_id} date={dateValue} />
      ) : (
        <EmployeeActivitiesSection
          company_id={creds?.company_id}
          division_id={employee?.division_id}
          date={dateValue}
        />
      )}
    </main>
  );
};
