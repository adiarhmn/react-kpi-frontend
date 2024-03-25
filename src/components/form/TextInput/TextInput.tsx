import { useId } from 'react';

import { clsx } from '@/utils/format';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: any;
}

const TextInput: React.FC<Props> = ({ label, error, icon, ...props }) => {
  const { type = 'text', className } = props;
  const Icon = icon;
  const id = useId();

  return (
    <>
      <label htmlFor={id} className="font-medium text-gray-700 text-sm mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute pl-3 text-gray-500 bottom-0 top-0 left-0 pointer-events-none flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          id={id}
          {...props}
          className={clsx(
            'text-sm border border-gray-400 text-gray-700 font-normal hover:border-gray-500 focus:border-gray-600 placeholder:text-gray-400 outline-none focus:ring-0 transition rounded w-full placeholder-gray-600',
            error && 'border-red-500 hover:border-red-500 focus:border-red-500',
            Icon && 'pl-10',
            className
          )}
        />
      </div>
      <p className={clsx('text-red-500 text-sm leading-none', !!error && 'mt-1')}>{error}</p>
    </>
  );
};

export default TextInput;
