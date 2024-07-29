/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { Button, Drawer, Fieldset, Indicator, Loader, Select, Tabs } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  EmployeeAttendanceRequestList,
  EmployeeOvertimeList,
  EmployeeRequestList,
} from '../components';
import Swal from 'sweetalert2';
import { useAuth } from '@/features/auth';
import { useDisclosure } from '@mantine/hooks';
import { EmployeeType } from '@/admin_features/types';
import { useGetEmployee } from '@/features/employee/api/Profile';
import { AbsenceType, useGetAbsenceByDivision, useGetAbsenceByType } from '@/features/history';
import { useGetOvertimeByDivision } from '@/features/overtime/api/getOvertime';
import { useGetAttendanceReqByDivision } from '@/features/late-request/api/getAttendanceRequest';

export const EmployeeRequest: React.FC = () => {
  const { creds } = useAuth();
  const [selectStatus, setSelectStatus] = useState('Belum disetujui');
  const [employee, setEmployee] = useState<EmployeeType>();
  const { data: DataEmployee, isLoading: LoadingEmployee } = useGetEmployee(creds?.employee_id);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    }
  }, [DataEmployee]);
  const navigate = useNavigate();
  const [selectType, setSelectType] = useState('sakit');
  const [opened, { open, close }] = useDisclosure(false);

  // [NOTIFICATION 🔔]
  const { state } = useLocation();
  useEffect(() => {
    const hasNotified = localStorage.getItem('hasNotifiedEmployeeRequest');
    if (state?.success && hasNotified != 'yes') {
      Swal.fire({
        width: '80%',
        title: state.success,
        timer: 3000,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      localStorage.setItem('hasNotifiedEmployeeRequest', 'yes');
    }
  }, [state, navigate]);
  // [END NOTIFICATION 🔔]

  // [Data sakit]
  const [sickRequest, setSickRequest] = useState<AbsenceType[]>([]);
  const { data: DataSickRequest } = useGetAbsenceByDivision(
    employee?.division_id,
    'sakit',
    selectStatus
  );
  useEffect(() => {
    if (DataSickRequest) {
      setSickRequest(DataSickRequest);
    }
  }, [DataSickRequest]);
  // [End data sakit]

  // [Data izin]
  const [absenceRequest, setAbsenceRequest] = useState<AbsenceType[]>([]);
  const { data: DataAbsenceRequest } = useGetAbsenceByDivision(
    employee?.division_id,
    'izin',
    selectStatus
  );
  useEffect(() => {
    if (DataAbsenceRequest) {
      setAbsenceRequest(DataAbsenceRequest);
    }
  }, [DataAbsenceRequest]);
  // [End data izin]

  // [Data cuti]
  const [paidLeaveRequest, setPaidLeaveRequest] = useState<AbsenceType[]>([]);
  const { data: DataPaidLeaveRequest } = useGetAbsenceByDivision(
    employee?.division_id,
    'Cuti',
    selectStatus
  );
  useEffect(() => {
    if (DataPaidLeaveRequest) {
      setPaidLeaveRequest(DataPaidLeaveRequest);
    }
  }, [DataPaidLeaveRequest]);
  // [End data cuti]

  // [Data lembur]
  const [overtimeRequest, setOvertimeRequest] = useState<AbsenceType[]>([]);
  const { data: DataOvertimeRequest } = useGetOvertimeByDivision(
    employee?.division_id,
    selectStatus
  );
  useEffect(() => {
    if (DataOvertimeRequest) {
      setOvertimeRequest(DataOvertimeRequest);
    }
  }, [DataOvertimeRequest]);
  // [End data lembur]

  // [Data absensi]
  const [lateRequest, setLateRequest] = useState<AbsenceType[]>([]);
  const { data: DataLateRequest } = useGetAttendanceReqByDivision(
    employee?.division_id,
    selectStatus
  );
  useEffect(() => {
    if (DataLateRequest) {
      setLateRequest(DataLateRequest);
    }
  }, [DataLateRequest]);
  // [End data absensi]

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
          <span className="font-semibold">
            <Button className="shadow-sm" size="xs" onClick={open}>
              <IconAdjustmentsHorizontal className="me-2 -ms-1" />
              Filter
            </Button>
          </span>
        </div>
      </section>

      <Tabs color="#51CF66" variant="pills" defaultValue="sakit">
        <Tabs.List className="sm:w-screen w-full mx-5 text-center py-3 overflow-x-auto overflow-y-hidden mb-1">
          <div className="flex w-max justify-start gap-x-2 px-6">
            <div className="bg-white min-w-[8rem] shadow-md rounded-2xl">
              <Tabs.Tab
                style={{ width: '100%', borderRadius: '20px', position: 'relative' }}
                color="blue"
                value="sakit"
                onClick={() => setSelectType('sakit')}
              >
                Sakit
                {sickRequest.length > 0 && (
                  <Indicator
                    style={{ position: 'absolute', top: '2px', right: '5px' }}
                    label={<div style={{ paddingTop: 2 }}>{sickRequest.length}</div>}
                    color="red"
                    size={16}
                  ></Indicator>
                )}
              </Tabs.Tab>
            </div>
            <div className="bg-white min-w-[8rem] shadow-md rounded-2xl">
              <Tabs.Tab
                style={{ width: '100%', borderRadius: '20px', position: 'relative' }}
                color="blue"
                value="izin"
                onClick={() => setSelectType('izin')}
              >
                Izin
                {absenceRequest.length > 0 && (
                  <Indicator
                    style={{ position: 'absolute', top: '2px', right: '5px' }}
                    label={<div style={{ paddingTop: 2 }}>{absenceRequest.length}</div>}
                    color="red"
                    size={16}
                  ></Indicator>
                )}
              </Tabs.Tab>
            </div>
            <div className="bg-white min-w-[8rem] shadow-md rounded-2xl">
              <Tabs.Tab
                style={{ width: '100%', borderRadius: '20px', position: 'relative' }}
                color="blue"
                value="cuti"
                onClick={() => setSelectType('cuti')}
              >
                Cuti
                {paidLeaveRequest.length > 0 && (
                  <Indicator
                    style={{ position: 'absolute', top: '2px', right: '5px' }}
                    label={<div style={{ paddingTop: 2 }}>{paidLeaveRequest.length}</div>}
                    color="red"
                    size={16}
                  ></Indicator>
                )}
              </Tabs.Tab>
            </div>
            <div className="bg-white min-w-[8rem] shadow-md rounded-2xl">
              <Tabs.Tab
                style={{ width: '100%', borderRadius: '20px', position: 'relative' }}
                color="blue"
                value="lembur"
                onClick={() => setSelectType('lembur')}
              >
                Lembur
                {overtimeRequest.length > 0 && (
                  <Indicator
                    style={{ position: 'absolute', top: '2px', right: '5px' }}
                    label={<div style={{ paddingTop: 2 }}>{overtimeRequest.length}</div>}
                    color="red"
                    size={16}
                  ></Indicator>
                )}
              </Tabs.Tab>
            </div>
            <div className="bg-white min-w-[8rem] shadow-md rounded-2xl">
              <Tabs.Tab
                style={{ width: '100%', borderRadius: '20px' }}
                color="blue"
                value="absen"
                onClick={() => setSelectType('absen')}
              >
                Absen
                {lateRequest.length > 0 && (
                  <Indicator
                    style={{ position: 'absolute', top: '2px', right: '5px' }}
                    label={<div style={{ paddingTop: 2 }}>{lateRequest.length}</div>}
                    color="red"
                    size={16}
                  ></Indicator>
                )}
              </Tabs.Tab>
            </div>
          </div>
        </Tabs.List>
      </Tabs>
      {selectType == 'sakit' || selectType == 'izin' || selectType == 'cuti' ? (
        <EmployeeRequestList
          status={selectStatus}
          typeRequest={selectType}
          division_id={employee?.division_id}
          filterState={opened}
        />
      ) : selectType == 'lembur' ? (
        <EmployeeOvertimeList
          status={selectStatus}
          typeRequest={selectType}
          division_id={employee?.division_id}
          filterState={opened}
        />
      ) : (
        <EmployeeAttendanceRequestList
          status={selectStatus}
          typeRequest={selectType}
          division_id={employee?.division_id}
          filterState={opened}
        />
      )}

      <Drawer
        position="right"
        offset={3}
        size="80%"
        radius="sm"
        opened={opened}
        onClose={close}
        title="Filter"
      >
        <div>
          <Fieldset className="mb-2" legend="Status">
            <Select
              className="-m-3"
              placeholder="Pilih Shift"
              data={['Disetujui', 'Ditolak', 'Belum disetujui']}
              searchValue={selectStatus}
              onSearchChange={setSelectStatus}
              allowDeselect
            />
          </Fieldset>
        </div>
        <div className="text-right mt-3">
          <Button onClick={close} style={{ width: '160px' }}>
            Cari
          </Button>
        </div>
      </Drawer>
    </main>
  );
};
