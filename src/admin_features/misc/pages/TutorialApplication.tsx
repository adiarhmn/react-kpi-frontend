import {
  Accordion,
  Text,
  Timeline,
  Badge,
  UnstyledButton,
  Indicator,
  ActionIcon,
  Button,
} from '@mantine/core';
import {
  IconClipboardText,
  IconCopy,
  IconInfoCircle,
  IconMapPin,
  IconPlus,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const TutorialApplication: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      <div className="grid lg:grid-cols-1 gap-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="font-bold">Tutorial Aplikasi</h2>
            <div className="-mt-1 mb-5 text-xs text-slate-400">
              Berikut tutorial penggunaan aplikasi
            </div>
            <Timeline active={3} bulletSize={24} lineWidth={3}>
              {/* LANGKAH PERTAMA =============================================== */}
              <Timeline.Item bullet="1" title="Langkah Pertama">
                <section className="mb-4 mt-3">
                  <span className="text-blue-600 font-semibold">
                    Langkah Pertama Yaitu Mengisi Data Master
                  </span>
                  <div>
                    Apa itu Data Master? Data Master adalah data-data yang diperlukan untuk
                    mengelola aplikasi ini, seperti data divisi, data jabatan, data karyawan, dan
                    data lainnya.{' '}
                    <span className="text-dark-400 font-semibold">
                      Berikut Detail Data Master :
                    </span>
                  </div>
                  <div className="mt-2">
                    <Accordion variant="contained">
                      {/* Data Divisi ========> */}
                      <Accordion.Item value="shift">
                        <Accordion.Control>Data Divisi</Accordion.Control>
                        <Accordion.Panel>
                          Data Divisi adalah data yang berisi tentang kelompok, divisi, atau grup
                          yang ada pada perusahaan. Contoh divisi adalah divisi IT, divisi HRD,
                          divisi Marketing, Admin dan lain-lain.{' '}
                          <i className="font-semibold">
                            Data divisi ini digunakan untuk kebutuhan data karyawan saat dimenu Data
                            Karyawan
                          </i>
                        </Accordion.Panel>
                      </Accordion.Item>

                      {/* Data Shift =======> */}
                      <Accordion.Item value="Shift">
                        <Accordion.Control>Data Shift</Accordion.Control>
                        <Accordion.Panel>
                          Data Shift adalah data yang berisi tentang shift kerja atau Jam kerja
                          karyawan.{' '}
                          <i className="font-semibold">
                            Data shift ini digunakan untuk mengatur jadwal kerja karyawan di Menu
                            Jadwal.
                          </i>
                        </Accordion.Panel>
                      </Accordion.Item>

                      {/* Data Lokasi =========> */}
                      <Accordion.Item value="camera">
                        <Accordion.Control>Data Lokasi</Accordion.Control>
                        <Accordion.Panel>
                          {' '}
                          Data Lokasi adalah data yang berisi tentang lokasi atau tempat kerja
                          karyawan.{' '}
                          <i className="font-semibold">
                            Data lokasi ini digunakan untuk mengatur lokasi kerja karyawan sekaligus
                            lokasi absensi karyawan.
                          </i>{' '}
                          <br /> <br />
                          Sebagai Contoh Perusahaan anda memiliki Cabang di Jakarta Dan Bandung,
                          Maka Karyawan di Jakarta tidak Bisa Absensi di Cabang Bandung, dan
                          Sebaliknya.
                        </Accordion.Panel>
                      </Accordion.Item>

                      {/* Data Karyawan =========> */}
                      <Accordion.Item value="Karyawan">
                        <Accordion.Control>Data Karyawan</Accordion.Control>
                        <Accordion.Panel>
                          Data Karyawan adalah data orang yang bekerja di perusahaan anda.{` `}
                          <i className="font-semibold">
                            Data Karyawan digunakan untuk membuat Jadwal Kerja, serta untuk karyawan
                            bisa melakukan login ke dalam sistem.
                          </i>
                          <div className="text-sm mt-2 items-center">
                            <div className="flex gap-2 items-center italic text-red-600">
                              <IconInfoCircle size={18} />
                              Pastikan Juga Sudah Menentukan Lokasi di Data Karyawan:
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Indicator processing={true} label={0} color={'red'} size={14}>
                                <ActionIcon color="green">
                                  <IconMapPin size={14} />
                                </ActionIcon>
                              </Indicator>
                              <div> Sehingga Menjadi </div>
                              <Indicator label={1} color={'green'} size={14}>
                                <ActionIcon color="green">
                                  <IconMapPin size={14} />
                                </ActionIcon>
                              </Indicator>
                            </div>
                          </div>
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                  <div className="text-blue-600 italic text-sm mt-2 flex gap-2 items-center">
                    <IconInfoCircle size={18} />
                    Data Master tidak Harus Selalu Diisi.
                  </div>
                  <div className="text-yellow-600 italic text-sm mt-2 flex gap-2 items-center">
                    <IconInfoCircle size={18} />
                    Pastikan Data Master sudah terisi dengan benar, agar aplikasi dapat berjalan
                  </div>
                </section>
                <Text size="xs" mt={4}>
                  <UnstyledButton onClick={() => navigate('/division')}>
                    <Badge color="blue">
                      <span className="capitalize">{`Lihat Data Master >`}</span>
                    </Badge>
                  </UnstyledButton>
                </Text>
              </Timeline.Item>

              {/* LANGKAH KEDUA ==============================================================================================> */}
              <Timeline.Item bullet="2" title="Langkah Kedua">
                <div className="mb-4 mt-3">
                  <span className="text-blue-600 font-semibold">
                    Langkah Kedua Yaitu Membuat Jadwal Kerja
                  </span>
                  <div>
                    Apa itu Jadwal Kerja? Jadwal Kerja adalah jadwal atau waktu kerja karyawan yang
                    sudah diatur oleh perusahaan dalam 1 Bulan.{' '}
                    <span className="text-dark-400 font-semibold">
                      Berikut Detail Jadwal Kerja :
                    </span>
                  </div>
                  <div className="mt-2">
                    <Accordion variant="contained">
                      {/* Data Create Jadwal ========> */}
                      <Accordion.Item value="tambah">
                        <Accordion.Control>
                          <div className="flex gap-2 items-center">
                            Tombol
                            <Button size="xs" leftSection={<IconPlus size={15} />}>
                              Buat Jadwal
                            </Button>
                          </div>
                        </Accordion.Control>
                        <Accordion.Panel>
                          Tombol ini Muncul ketika Jadwal Pada Bulan Yang anda pilih Kosong,
                          digunakan untuk membuat jadwal baru, namun ada bisa menggunakan fitur Copy
                          Paste.
                        </Accordion.Panel>
                      </Accordion.Item>

                      {/* Data Create Jadwal ========> */}
                      <Accordion.Item value="copy-paste">
                        <Accordion.Control>
                          <div className="flex gap-2 items-center">
                            Tombol
                            <Button color="green" size="xs" leftSection={<IconCopy size={15} />}>
                              Copy Jadwal
                            </Button>
                          </div>
                        </Accordion.Control>
                        <Accordion.Panel>
                          Tombol digunakan untuk mencopy Jadwal dalam satu bulan. Contoh Pada bulan
                          Januari sudah ada jadwal karyawan, maka anda bisa copy jadwal tersebut ke
                          bulan Februari. Dengan tombol{' '}
                          <Button size="xs" leftSection={<IconClipboardText size={15} />}>
                            Paste
                          </Button>{' '}
                          pada bulan Februari
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
                <Text size="xs" mt={4}>
                  <UnstyledButton onClick={() => navigate('/schedule')}>
                    <Badge color="blue">
                      <span className="capitalize">{`Lihat Jadwal >`}</span>
                    </Badge>
                  </UnstyledButton>
                </Text>
              </Timeline.Item>

              {/* LANGKAH TIGA ==============================================================================================> */}
              <Timeline.Item bullet="3" title="Langkah Ketiga">
                <div className="mb-4 mt-3">
                  <span className="text-blue-600 font-semibold">
                    Langkah Tiga Yaitu Mengelola Pengajuan
                  </span>
                  <div className="text-blue-600 italic text-sm mt-2 flex gap-2 items-center">
                    <IconInfoCircle size={18} />
                    Menu Pengajuan ini harus di Pantau Setiap Hari
                  </div>
                  <div>
                    Dalam aplikasi ini terdapat beberapa jenis pengajuan diantaranya adalah
                    pengajuan cuti, pengajuan izin, dan pengajuan lembur.{' '}
                    <span className="text-dark-400 font-semibold">Berikut Detail Pengajuan :</span>
                  </div>
                </div>
                <Text size="xs" mt={4}>
                  <UnstyledButton onClick={() => navigate('/schedule')}>
                    <Badge color="blue">
                      <span className="capitalize">{`Lihat Jadwal >`}</span>
                    </Badge>
                  </UnstyledButton>
                </Text>
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
      </div>
    </main>
  );
};
