/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import {
  AbsenceType,
  formatterDate,
  getDaysBetweenDates,
  useGetAbsenceByDivision,
} from '@/features/history';
import { Badge, Divider, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type EmployeeRequestListProps = {
  typeRequest: string;
  status: string;
  division_id: number | undefined;
  filterState: boolean;
};

export const EmployeeRequestList: React.FC<EmployeeRequestListProps> = ({
  typeRequest,
  status,
  division_id,
  filterState,
}: EmployeeRequestListProps) => {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    companyID: division_id,
    typeRequest: typeRequest,
    status: status,
  });
  useEffect(() => {
    const newParams = {
      companyID: division_id,
      typeRequest,
      status,
    };
    setParams(newParams);
  }, [typeRequest, filterState]);
  const [request, setRequest] = useState<AbsenceType[]>();
  const { data: DataAbsence, isLoading: LoadingRequest } = useGetAbsenceByDivision(
    params.companyID,
    params.typeRequest,
    params.status
  );
  useEffect(() => {
    if (DataAbsence) {
      setRequest(DataAbsence);
    }
  }, [DataAbsence, params, filterState]);

  if (LoadingRequest) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  console.log(status, filterState);
  return (
    <div className="text-center">
      {request?.length != 0 ? (
        request?.map((req, index) => (
          <button
            key={index}
            onClick={() => navigate(`/employee-request/detail`, { state: { request: req } })}
            className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700"
          >
            <div className="w-full grid grid-cols-12 divide-x divide-gray-300 pb-2 pt-2 p-4">
              {/* <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4"> */}
              <div className="col-span-2 -ms-3 mt-2">
                <Text size="26px" fw={700}>
                  {req?.date_start != undefined || req?.date_end != null
                    ? getDaysBetweenDates(req?.date_start, req?.date_end) + 1
                    : '-- --'}
                </Text>
                <Text style={{ marginTop: '-5px' }} size="xs">
                  Hari
                </Text>
              </div>
              <div className="col-span-10">
                <div className="my-auto text-right -mt-3 -me-3">
                  <Badge
                    size="xs"
                    style={{
                      marginTop: '7px',
                      marginLeft: '4px',
                      borderRadius: '2px',
                    }}
                    color="blue"
                  >
                    {req?.type}
                  </Badge>
                  <Badge
                    size="xs"
                    style={{
                      marginTop: '7px',
                      marginLeft: '4px',
                      borderRadius: '2px',
                    }}
                    color={
                      req?.status == 'Disetujui'
                        ? 'green'
                        : req?.status == 'Belum Disetujui'
                          ? 'yellow'
                          : 'red'
                    }
                  >
                    {req?.status}
                  </Badge>
                </div>
                <div className="my-auto text-left ms-2">
                  <Divider orientation="vertical" />
                  <Text size={'md'} fw={700}>
                    {req.employee.name}
                  </Text>
                </div>
              </div>
            </div>
            <div className="text-left">
              <Text style={{ marginLeft: '0px', padding: '8px' }} size="11px" fw={500}>
                Tanggal pengajuan : {formatterDate(new Date(req?.created_at), 'EEEE, dd MMM yyyy')}
              </Text>
            </div>
          </button>
        ))
      ) : (
        <section className="min-h-96 flex flex-col items-center justify-center mt-10">
          <img
            className="w-40 mb-2 bg-slate-200 rounded-full p-2"
            src="/images/blank-canvas.svg"
            alt=""
          />
          <span className="font-bold text-slate-400 text-xl">Belum ada data {typeRequest}</span>
        </section>
      )}
    </div>
  );
};
