import { TableSkeleton } from './TableSkeleton';

interface Props<T> {
  header: string[];
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  loading?: boolean;
  pagination?: JSX.Element;
}

export const Table = <T,>({ items, renderItem, header, loading, pagination }: Props<T>) => {
  return (
    <>
      <div className="text-gray-700 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-gray-50">
        <table className="table-auto w-full">
          <thead className="border-t border-b-[1.5px] border-gray-300 mx-4">
            <tr>
              {header.map((item) => (
                <th
                  key={item}
                  scope="col"
                  className="py-3 px-5 text-left w-max text-xs uppercase whitespace-nowrap"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm font-medium divide-y divide-gray-300 [&_td]:whitespace-nowrap [&_td]:px-5 [&_td]:py-3">
            {loading ? (
              <TableSkeleton col={header.length} row={5} />
            ) : items.length > 0 ? (
              items.map((item) => renderItem(item))
            ) : (
              <tr>
                <td colSpan={header.length} className="text-center !py-12">
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!loading && items.length > 0 && pagination}
    </>
  );
};
