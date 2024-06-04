import { useGetOvertime } from '../../api';

export const TableOvertime: React.FC = () => {
  const { data, isLoading, error } = useGetOvertime();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  console.log(data);
  return (
    <main>
      <h1>Table Overtime</h1>
    </main>
  );
};
