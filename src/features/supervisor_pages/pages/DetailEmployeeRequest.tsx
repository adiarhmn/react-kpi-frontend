/* eslint-disable import/order */
import { usePutRequest } from '@/admin_features/permission/api';
import { RequestsType } from '@/admin_features/types';
import { formatterDate, getDaysBetweenDates } from '@/features/history';
import { Badge, Button, Divider, Image, Text } from '@mantine/core';
import { IconChevronLeft, IconClipboardText } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const DetailEmployeeRequest: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const request = location.state.request as RequestsType;

  const MutationUpdateRequest = usePutRequest();

  const HandleUpdateRequest = async (status: string) => {
    const DataPut = {
      ...request,
      status: status,
    };

    await MutationUpdateRequest.mutateAsync(DataPut, {
      onSuccess: () => {
        localStorage.setItem('hasNotifiedEmployeeRequest', 'no');
        // navigate('/late-request', { state: { success: 'Absensi berhasil diajukan!' } });
        navigate('/employee-request', {
          state: { success: `Status pengajuan ${request.type} berhasil diubah` },
        });
      },
      onError: (error) => {
        console.log('Error :', error);
      },
    });
  };
  // console.log(location.state.request);
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
            <h2 className="font-semibold ">Detail permintaan</h2>
          </div>
          <span className="font-semibold"></span>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center mt-1 -mb-1 px-2">
          <span className="font-bold text-base text-blue-700 capitalize">
            Pengajuan {request?.type}
          </span>
          <div className="">
            <Badge
              size="xs"
              style={{
                marginLeft: '4px',
                borderRadius: '2px',
              }}
              color={
                request.status == 'Disetujui'
                  ? 'green'
                  : request.status == 'Belum Disetujui'
                    ? 'yellow'
                    : 'red'
              }
            >
              {request.status}
            </Badge>
          </div>
        </div>
        <Divider my="sm" />
        <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4 -mt-2">
          <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
            <div className="col-span-2 text-center my-auto -ms-2">
              <Text size="50px" fw={700}>
                {request.date_start != null &&
                  getDaysBetweenDates(request?.date_start, request?.date_end) + 1}
              </Text>
              <Text style={{ marginTop: '-5px' }} size="sm">
                Hari
              </Text>
            </div>
            <div className="col-span-10 ms-2 text-left mb-2">
              <div className="ms-2 -mb-2">
                <Text size="xs" fw={700}>
                  Tanggal mulai :
                </Text>
                <Text size="xs">
                  {formatterDate(request?.date_start ?? 0, 'EEEE, dd MMMM yyyy')}
                </Text>
              </div>

              <Divider my="sm" />
              <div className="ms-2 -mt-2">
                <Text size="xs" fw={700}>
                  Tanggal selesai :
                </Text>
                <Text size="xs">
                  {' '}
                  {formatterDate(request?.date_end ?? 0, 'EEEE, dd MMMM yyyy')}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4">
        <div className="flex justify-between text-xs items-center mt-1 -mb-1 px-2">
          <span className="font-bold text-base text-blue-700">Lampiran dan keterangan</span>
          <IconClipboardText className="opacity-80" size={20} />
        </div>
        <Divider my="sm" />
        <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4 -mt-2">
          <div className="gap-2 mt-0">
            <Text size="xs" fw={700}>
              Lampiran :
            </Text>
            <Image
              radius="md"
              h={200}
              style={{
                justifyContent: 'center',
                padding: '10',
                marginTop: '-20px',
                width: '90% ',
              }}
              fit="contain"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
            />
          </div>
          <div className="gap-2 -mt-4">
            <Text size="xs" fw={700}>
              Nama : <span className="font-normal ms-1"> {request?.employee.name}</span>
            </Text>
          </div>
          <div className="gap-2 mt-1">
            <Text size="xs" fw={700}>
              Keterangan :{' '}
            </Text>
            <Text size="xs">{request?.description}</Text>
          </div>
        </div>
        <div className="w-full mt-7 grid grid-cols-12 text-center px-2 gap-x-2 pb-2">
          <div className="col-span-6">
            <Button
              fullWidth
              onClick={() => HandleUpdateRequest('Ditolak')}
              type="submit"
              color="grey"
            >
              Tolak
            </Button>
          </div>
          <div className="col-span-6">
            <Button fullWidth onClick={() => HandleUpdateRequest('Disetujui')} color="blue">
              Setujui
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};
