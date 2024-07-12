import { Center, Group, SegmentedControl } from '@mantine/core';

interface SegmentControlProps {
  title: string;
  setTitle: (value: string) => void;
}

export const SegmentControl: React.FC<SegmentControlProps> = ({ title, setTitle }) => {
  const MenuList = [
    {
      value: 'Beranda',
      label: (
        <>
          <Center style={{ gap: 10, width: 100 }}>
            <span className={` font-semibold`}>Beranda</span>
          </Center>
        </>
      ),
    },
    {
      value: 'Data Master',
      label: (
        <>
          <Center style={{ gap: 10, width: 100 }}>
            <span className={` font-semibold`}>Data Master</span>
          </Center>
        </>
      ),
    },
    {
      value: 'Absensi',
      label: (
        <>
          <Center style={{ gap: 10, width: 100 }}>
            <span className={`font-semibold`}>Absensi</span>
          </Center>
        </>
      ),
    },
    {
      value: 'Pengajuan',
      label: (
        <>
          <Center style={{ gap: 10, width: 100 }}>
            <span className={`font-semibold`}>Pengajuan</span>
          </Center>
        </>
      ),
    },
    {
      value: 'Laporan',
      label: (
        <>
          <Center style={{ gap: 10, width: 100 }}>
            <span className={` font-semibold`}>Laporan</span>
          </Center>
        </>
      ),
    },
  ];

  return (
    <Group gap={5} className="h-full">
      <SegmentedControl
        withItemsBorders={false}
        classNames={{ input: 'text-white' }}
        style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
        data={MenuList}
        value={title}
        onChange={(value) => {
          setTitle(value);
        }}
        color="blue"
        size="sm"
        fullWidth
      />
    </Group>
  );
};
