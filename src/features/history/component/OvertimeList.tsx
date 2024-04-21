import { Badge, Divider, Text } from '@mantine/core';

export const OvertimeList: React.FC = () => {
  return (
    <section className="bg-white mx-auto max-w-xs w-full mt-4 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700">
      <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4">
        <div className="col-span-3 text-right">
          <Text size="lg" fw={700}>
            3
          </Text>
          <Divider size="sm" orientation="vertical" />
        </div>
        <div className="col-span-3 text-left">
          <Text size="lg" fw={700}>
            3
          </Text>
        </div>
        <div className="col-span-6  text-left"></div>
      </div>
    </section>
  );
};
