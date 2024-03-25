import { IconArrowLeft } from '@tabler/icons-react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

type Props = {
  children: React.ReactNode;
};

const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <div className="flex flex-col h-screen justify-center items-center text-center" role="alert">
      <h2 className="text-lg font-semibold">Terjadi Kesalahan</h2>
      {error && <p className="text-red-500">{error?.message ?? error}</p>}

      <button
        className="px-5 bg-blue-600 rounded-md text-white py-2 mt-4 flex items-center"
        onClick={() => window.location.assign(window.location.origin)}
      >
        <IconArrowLeft size={18} />
        <span className="pl-1">Kembali</span>
      </button>
    </div>
  );
};

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
};
