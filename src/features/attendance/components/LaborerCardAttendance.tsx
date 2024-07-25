import { Button, Divider } from '@mantine/core';
import { IconCalendarUser } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetGroup } from '../api/getGroup';
import { GroupType } from '../types';
import { useAuth } from '@/features/auth';
import { EmployeeType } from '@/admin_features/types';
import { useGetWorker } from '../api/getWorker';

export const LaborerCardAttendance: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const [groups, setGroups] = useState<GroupType[]>([]);
  const { data: DataGroup } = useGetGroup();
  useEffect(() => {
    if (DataGroup) {
      setGroups(DataGroup);
    }
  }, [DataGroup]);

  const [workers, setWorkers] = useState<EmployeeType[]>([]);
  const { data: DataWorker } = useGetWorker(creds?.company_id);
  useEffect(() => {
    if (DataWorker) {
      setWorkers(DataWorker);
    }
  }, [DataWorker]);
  console.log(workers);
  return (
    <section className="bg-white mx-auto max-w-xs w-full mt-2 mb-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
      <div className="flex justify-between text-xs items-center p-2">
        <span className="text-base font-bold text-blue-700">Data pekerja lepas</span>
      </div>
      <Divider size={'sm'} />
      <div className="w-full p-2">
        <div className="grid grid-cols-12 divide-x divide-gray-300 ">
          <div className="col-span-6 p-4 text-center">
            <div className="p-2 bg-transparent text-green-600 text-2xl rounded-xl font-bold w-full h-full text-center ">
              {groups.length}
            </div>
            <div className="text-xs -mt-2">Kelompok / Tim</div>
          </div>
          <div className="col-span-6 p-4 text-center">
            <div className="p-2 bg-transparent text-blue-600 text-2xl rounded-xl font-bold w-full h-full text-center ">
              {workers.length}
            </div>
            <div className="text-xs -mt-2">Pekerja Lepas</div>
          </div>
          <div className="col-span-12 mt-4">
            <Button
              onClick={() => navigate(`/laborer-group`)}
              fullWidth
              type="submit"
              rightSection={<IconCalendarUser />}
            >
              Absensi pekerja lepas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
