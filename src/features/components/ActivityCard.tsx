import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export const ActivityCard: React.FC = () => {
  return (
    // <section className="bg-white mx-auto max-w-xs w-full mt-2 mb-7 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
    //   <div className="flex justify-between text-xs items-center p-2">
    //     <span className="text-base font-bold text-blue-700">Kegiatan hari ini</span>
    //     <Button disabled={isCheckedIn == false} onClick={open} className="shadow-sm me-1" size="xs">
    //       <IconPlus className="-ms-1" size={18} />
    //     </Button>
    //   </div>
    //   <Divider size={'sm'} />
    //   <div className="w-full p-2">
    //     {activityDetail.length > 0 ? (
    //       activityDetail.map((activity, index) => (
    //         <section
    //           key={index}
    //           className="bg-white mx-auto max-w-xs w-full z-50 relative p-2 px-2 text-slate-700 "
    //         >
    //           <div className="flex justify-between text-xs items-center mb-2">
    //             <span className="text-sm font-bold text-blue-700">Kegiatan {index + 1}</span>
    //             <IconCalendarEvent className="opacity-80" size={20} />
    //           </div>
    //           <div className="grid grid-cols-12">
    //             {activityDetail != null && activityAlias[0] != null
    //               ? Array.from(
    //                   { length: 10 },
    //                   (_, i) =>
    //                     activityAlias[0][`cs${i + 1}_name`] != '' && (
    //                       <div key={i} className="mb-1 col-span-6 w-full">
    //                         <Text size="xs" fw={700}>
    //                           {activityAlias[0][`cs${i + 1}_name`]}
    //                         </Text>
    //                         <Text style={{ textAlign: 'justify' }} truncate="end" size="xs">
    //                           {activity[`custom${i + 1}`]}
    //                         </Text>
    //                       </div>
    //                     )
    //                 )
    //               : ''}
    //           </div>
    //           <Divider size={'xs'} className="mt-4" />
    //         </section>
    //       ))
    //     ) : (
    //       <div className="w-full col-span-12">
    //         <section className="min-h-96 flex flex-col items-center justify-center mt-10">
    //           <img
    //             className="w-40 mb-2 bg-slate-200 rounded-full p-2"
    //             src="/images/blank-canvas.svg"
    //             alt=""
    //           />
    //           <span className="font-bold text-slate-400 text-lg">Belum ada data kegiatan</span>
    //         </section>
    //       </div>
    //     )}
    //   </div>
    // </section>
    <p>Card Activity</p>
  );
};
