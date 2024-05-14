import { Button, FileInput, JsonInput } from '@mantine/core';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { IconChevronLeft, IconClock24 } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddAbsence: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<Date | null>(null);
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
            <h2 className="font-semibold ">Pengajuan izin</h2>
          </div>
        </div>
        <div className="p-2 -mt-2">
          <div>
            <DatePickerInput
              valueFormat="dddd, DD MMM YYYY"
              label="Tanggal mulai"
              placeholder="Pilih tanggal"
              value={value}
              onChange={setValue}
            />
          </div>
          <div className="mt-2">
            <DatePickerInput
              valueFormat="dddd, DD MMM YYYY"
              label="Tanggal selesai"
              placeholder="Pilih tanggal"
              value={value}
              onChange={setValue}
            />
          </div>
          <div className="mt-2">
            <JsonInput label="Keterangan" description="" placeholder="masukkan keterangan izin" />
          </div>
          <div className="mt-2">
            <FileInput label="Lampiran" description="" placeholder="masukkan lampiran" />
          </div>
          <div className="w-full mt-7 grid grid-cols-12 text-center">
            <div className="col-span-6 pe-1">
              <Button fullWidth color="blue">
                Ajukan
              </Button>
            </div>
            <div className="col-span-6 ps-1">
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                fullWidth
                color="green"
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
