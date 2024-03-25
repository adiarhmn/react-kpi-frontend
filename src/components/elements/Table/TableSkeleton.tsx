interface Props {
  col: number;
  row: number;
}

const renderSkeleton = ({ row, col }: Props) => {
  const element = [];

  for (let i = 0; i < row; i++) {
    const skeleton = [];
    for (let j = 0; j < col; j++) {
      skeleton.push(
        <td key={`${i}${j}`}>
          <div className="min-w-[5rem] h-5 bg-gray-200 rounded animate-pulse"></div>
        </td>
      );
    }
    element.push(<tr key={i}>{skeleton}</tr>);
  }

  return element;
};

export const TableSkeleton: React.FC<Props> = ({ col, row }) => {
  return <>{renderSkeleton({ col, row })}</>;
};
