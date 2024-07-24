import { Button, Divider, Tabs, Text } from '@mantine/core';
import { IconUser, IconUsersGroup } from '@tabler/icons-react';

export const ListLaborer: React.FC = () => {
  return (
    <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-md rounded-lg flex flex-col mt-2 mb-8">
      <div className="flex justify-between items-center text-blue-700 mb-1 px-2 py-1">
        <div className="flex items-center">
          <Text fw={700} c="blue">
            Daftar pekerja
          </Text>
        </div>
        <span className="font-semibold">
          <IconUser />
        </span>
      </div>
      <Divider size={'sm'} />
      <div className="grid grid-cols-12 px-2 text-center gap-x-1 ">
        <div className="col-span-4 bg-green-600 rounded-md mt-1">
          <Text size={'xs'} c={'white'}>
            H = Hadir
          </Text>
        </div>
        <div className="col-span-4 bg-red-700 rounded-md mt-1">
          <Text size={'xs'} c={'white'}>
            A = Absen
          </Text>
        </div>
        <div className="col-span-4 bg-yellow-600 rounded-md mt-1">
          <Text size={'xs'} c={'white'}>
            I = Izin
          </Text>
        </div>
      </div>
      <div className="mt-2">
        <Divider size={'lg'} />
      </div>
      <div className="grid grid-cols-12 px-2 mb-1 mt-2">
        <div className="col-span-12 py-2">
          <div className="my-auto text-left">
            <Text lineClamp={1} size={'sm'} fw={700}>
              Budi Selang
            </Text>
          </div>
          <Divider className="w-full mt-1 mb-1" />
          <div className="grid grid-cols-12 text-left mb-4">
            <div className="col-span-6">
              <Text size={'xs'} fw={500}>
                Status kehadiran :
              </Text>
            </div>
            <div className="col-span-6">
              <Tabs color="#51CF66" variant="pills" defaultValue="Hadir">
                <section className="w-full py-3 -mt-1 -mb-5 -mt-3">
                  <Tabs.List className="w-full grid grid-cols-12 text-center">
                    <div className="grid grid-cols-12 text-center gap-x-2">
                      <div className="col-span-4 bg-white shadow-md rounded-sm">
                        <Tabs.Tab
                          style={{ width: '100%', height: '30px' }}
                          color="green"
                          value="Hadir"
                          //   onClick={() => setSelectStatus('Ditolak')}
                        >
                          H
                        </Tabs.Tab>
                      </div>
                      <div className="col-span-4 bg-white shadow-md rounded-sm">
                        <Tabs.Tab
                          style={{ width: '100%', height: '30px' }}
                          color="red"
                          value="Absen"
                          //   onClick={() => setSelectStatus('Disetujui')}
                        >
                          A
                        </Tabs.Tab>
                      </div>
                      <div className="col-span-4 bg-white shadow-md rounded-sm">
                        <Tabs.Tab
                          style={{ width: '100%', height: '30px' }}
                          color="yellow"
                          value="Izin"
                          //   onClick={() => setSelectStatus('Ditolak')}
                        >
                          I
                        </Tabs.Tab>
                      </div>
                    </div>
                  </Tabs.List>
                </section>
              </Tabs>
            </div>
          </div>
          <div className="mt-8">
            <Divider size={'lg'} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 px-2 mb-1">
        <div className="col-span-12 py-2">
          <div className="my-auto text-left">
            <Text lineClamp={1} size={'sm'} fw={700}>
              Hendrik Sanyo
            </Text>
          </div>
          <Divider className="w-full mt-1 mb-1" />
          <div className="grid grid-cols-12 text-left mb-4">
            <div className="col-span-6">
              <Text size={'xs'} fw={500}>
                Status kehadiran :
              </Text>
            </div>
            <div className="col-span-6">
              <Tabs color="#51CF66" variant="pills" defaultValue="Hadir">
                <section className="w-full py-3 -mt-1 -mb-5 -mt-3">
                  <Tabs.List className="w-full grid grid-cols-12 text-center">
                    <div className="grid grid-cols-12 text-center gap-x-2">
                      <div className="col-span-4 bg-white shadow-md rounded-sm">
                        <Tabs.Tab
                          style={{ width: '100%', height: '30px' }}
                          color="green"
                          value="Hadir"
                          //   onClick={() => setSelectStatus('Ditolak')}
                        >
                          H
                        </Tabs.Tab>
                      </div>
                      <div className="col-span-4 bg-white shadow-md rounded-sm">
                        <Tabs.Tab
                          style={{ width: '100%', height: '30px' }}
                          color="red"
                          value="Absen"
                          //   onClick={() => setSelectStatus('Disetujui')}
                        >
                          A
                        </Tabs.Tab>
                      </div>
                      <div className="col-span-4 bg-white shadow-md rounded-sm">
                        <Tabs.Tab
                          style={{ width: '100%', height: '30px' }}
                          color="yellow"
                          value="Izin"
                          //   onClick={() => setSelectStatus('Ditolak')}
                        >
                          I
                        </Tabs.Tab>
                      </div>
                    </div>
                  </Tabs.List>
                </section>
              </Tabs>
            </div>
          </div>
          <div className="mt-8">
            <Divider size={'lg'} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 px-2 mb-1">
        <div className="col-span-12 py-2">
          <div className="my-auto text-left">
            <Text lineClamp={1} size={'sm'} fw={700}>
              Asep charger
            </Text>
          </div>
          <Divider className="w-full mt-1 mb-1" />
          <div className="grid grid-cols-12 text-left mb-4">
            <div className="col-span-6">
              <Text size={'xs'} fw={500}>
                Status kehadiran :
              </Text>
            </div>
            <div className="col-span-6">
              <Tabs color="#51CF66" variant="pills" defaultValue="Hadir">
                <section className="w-full py-3 -mt-1 -mb-5 -mt-3">
                  <Tabs.List className="w-full grid grid-cols-12 text-center">
                    <div className="grid grid-cols-12 text-center gap-x-2">
                      <div className="col-span-4 bg-white shadow-md rounded-sm">
                        <Tabs.Tab
                          style={{ width: '100%', height: '30px' }}
                          color="green"
                          value="Hadir"
                          //   onClick={() => setSelectStatus('Ditolak')}
                        >
                          H
                        </Tabs.Tab>
                      </div>
                      <div className="col-span-4 bg-white shadow-md rounded-sm">
                        <Tabs.Tab
                          style={{ width: '100%', height: '30px' }}
                          color="red"
                          value="Absen"
                          //   onClick={() => setSelectStatus('Disetujui')}
                        >
                          A
                        </Tabs.Tab>
                      </div>
                      <div className="col-span-4 bg-white shadow-md rounded-sm">
                        <Tabs.Tab
                          style={{ width: '100%', height: '30px' }}
                          color="yellow"
                          value="Izin"
                          //   onClick={() => setSelectStatus('Ditolak')}
                        >
                          I
                        </Tabs.Tab>
                      </div>
                    </div>
                  </Tabs.List>
                </section>
              </Tabs>
            </div>
          </div>
          <div className="mt-8">
            <Divider size={'lg'} />
          </div>
        </div>
      </div>
      <div>
        <Button fullWidth>Simpan kehadiran</Button>
      </div>
    </section>
  );
};
