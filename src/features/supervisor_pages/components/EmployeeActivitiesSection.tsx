/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { ActivityDetailType } from '@/features/attendance';
import {
  useGetActivityAlias,
  useGetActivityDetailByDivision,
} from '@/features/attendance/api/getActivity';
import { formatterDate } from '@/features/history';
import { Button, Divider, Text } from '@mantine/core';
import { IconClipboardText } from '@tabler/icons-react';
import { IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ActivitiesSectionProps = {
  division_id?: number;
  company_id?: number;
  date: Date;
};
export const EmployeeActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  division_id,
  company_id,
  date,
}: ActivitiesSectionProps) => {
  const navigate = useNavigate();
  // [All about  Activity Alias]
  const [activityAlias, setActivityAlias] = useState([]);
  const { data: dataActivityAlias } = useGetActivityAlias(company_id);
  useEffect(() => {
    if (dataActivityAlias) {
      setActivityAlias(dataActivityAlias);
    }
  }, [dataActivityAlias, division_id]);
  // [End Activity Alias]\

  // [ALL ABOUT ACTIVITY DETAIL]
  const [activityDetail, setActivityDetail] = useState<ActivityDetailType[]>([]);
  const { data: dataActivity, refetch: RefetchActivityDetail } = useGetActivityDetailByDivision(
    division_id,
    formatterDate(new Date(date), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (dataActivity) {
      setActivityDetail(dataActivity);
    }
  }, [dataActivity, date]);
  // [END ACTIVITY DETAIL]

  return (
    <>
      <section className="bg-white mx-auto max-w-xs w-full mt-2 mb-7 shadow-lg rounded-xl z-50 relative p-2 py-2 px-2 text-slate-700 mb-6 mt-2">
        <div className="flex justify-between text-xs items-center p-2">
          <div>
            <Text fw={700} c="blue">
              Kegiatan
            </Text>
          </div>
          <div className="my-auto text-right -mt-1  me-2">
            <IconClipboardText />
          </div>
        </div>
        <Divider size={'sm'} />
        <div className="w-full p-2">
          {activityDetail.length > 0 ? (
            activityDetail.map((activity, index) => (
              <section
                key={index}
                className="bg-white mx-auto max-w-xs w-full z-50 relative p-2 px-2 text-slate-700 "
              >
                <div className="flex justify-between text-xs items-center mb-2">
                  <span className="text-sm font-bold text-blue-700">Kegiatan {index + 1}</span>
                  <Button
                    onClick={() =>
                      navigate(`/activity/detail/`, {
                        state: {
                          activity: activity,
                          alias: activityAlias[0],
                          index: index,
                        },
                      })
                    }
                    variant="transparent"
                    className="shadow-xs "
                    size="xs"
                  >
                    <IconInfoCircle size={18} />
                  </Button>
                </div>
                <div className="grid grid-cols-12 gap-x-2">
                  {activityDetail != null && activityAlias[0] != null
                    ? Array.from(
                        { length: 10 },
                        (_, i) =>
                          activityAlias[0][`cs${i + 1}_name`] != '' && (
                            <div key={i} className="mb-1 col-span-6 w-full">
                              <Text size="xs" fw={700}>
                                {activityAlias[0][`cs${i + 1}_name`]}
                              </Text>
                              <Text truncate="end" style={{ textAlign: 'left' }} size="xs">
                                {activity[`custom${i + 1}`]}
                              </Text>
                            </div>
                          )
                      )
                    : ''}
                </div>
                <div className="text-right mt-2 me-2">
                  <Text truncate="end" size="xs">
                    {formatterDate(new Date(activity['created_at'] ?? 0), 'HH:mm')}
                  </Text>
                  <Text truncate="end" size="xs">
                    {activity.attendance.employee.name}
                  </Text>
                </div>
                <Divider size={'xs'} className="mt-4" />
              </section>
            ))
          ) : (
            <div className="w-full col-span-12">
              <section className="min-h-96 flex flex-col items-center justify-center -mt-10 -mb-10">
                <img
                  className="w-28 mb-2 bg-slate-200 rounded-full p-2"
                  src="/images/blank-canvas.svg"
                  alt=""
                />
                <span className="font-bold text-slate-400 text-sm">Belum ada data kegiatan</span>
              </section>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
