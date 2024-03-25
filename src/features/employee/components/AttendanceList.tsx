import { Badge, Button } from '@mantine/core';

import { dayjs } from '@/lib/dayjs';

import { Attendance } from '../types';

const attendances: any = [
  {
    id: 3,
    checkIn: new Date(),
    checkOut: null,
    status: 'absent',
    employee: {
      id: 3,
      name: 'Ujang Pratama',
      phonenumber: '+6284523476732',
      address: 'lorem ipsum dolor sit amet',
    },
    createdAt: new Date(),
  },
  {
    id: 2,
    checkIn: new Date(),
    checkOut: null,
    status: 'working',
    employee: {
      id: 2,
      name: 'Asep Permana',
      phonenumber: '+62896912454352',
      address: 'lorem ipsum dolor sit amet',
    },
    createdAt: new Date(),
  },
  {
    id: 1,
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'present',
    employee: {
      id: 1,
      name: 'Koswara',
      phonenumber: '+6289691786852',
      address: 'lorem ipsum dolor sit amet',
    },
    createdAt: new Date(),
  },
];

type Props = {
  date: Date;
};

export const AttendanceList: React.FC<Props> = ({ date }) => {
  return (
    <section className="px-5 my-4 space-y-4">
      {attendances.map((attendance: any) => (
        <div
          key={attendance.id}
          className="bg-white rounded-lg shadow-md shadow-gray-200 border border-gray-100 px-5 py-4"
        >
          <div className="flex items-start justify-between w-full pb-3 border-b border-gray-300">
            <div>
              <div className="font-bold text-sm">{attendance.employee.name}</div>
              <div className="text-xs text-gray-600">{attendance.employee.phonenumber}</div>
            </div>
            {attendance.status == 'present' ? (
              <Badge color="blue">Present</Badge>
            ) : attendance.status == 'working' ? (
              <Badge color="green">Working</Badge>
            ) : dayjs(attendance.createdAt).isSame(date, 'date') ? (
              <Badge color="gray">Pending</Badge>
            ) : (
              <Badge color="red">Absent</Badge>
            )}
          </div>
          <div className="pt-3 grid grid-cols-2 gap-x-2">
            {attendance.status == 'absent' && (
              <div className="col-span-2">
                <Button variant="outline" color="green" fullWidth>
                  Check In
                </Button>
              </div>
            )}

            {(attendance.status == 'present' || attendance.status == 'working') && (
              <>
                <div>
                  <div className="font-semibold text-sm text-gray-600 mb-1">Check In</div>
                  <div className="flex items-center text-sm">
                    <span className="text-green-600 bg-green-50 font-medium w-auto rounded-md px-3 py-0.5">
                      {dayjs(attendance.checkIn).format('HH:mm:ss')}
                    </span>
                  </div>
                </div>
                {attendance.checkOut != null ? (
                  <div>
                    <div className="font-semibold text-sm text-gray-600 mb-1">Check Out</div>
                    <div className="flex items-center text-sm">
                      <span className="text-orange-600 bg-orange-50 font-medium w-auto rounded-md px-3 py-0.5">
                        {dayjs(attendance.checkOut).format('HH:mm:ss')}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Button color="orange" variant="outline">
                      Check Out
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};
