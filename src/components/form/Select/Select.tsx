import { useId } from 'react';

import { clsx } from '@/utils/format';

interface Option {
  label: string;
  value: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  data: Option[];
}

const Select: React.FC<Props> = ({ label, error, data, ...props }) => {
  const { name, className } = props;
  const id = useId();

  return (
    <>
      <label htmlFor={id} className="font-medium text-gray-700 text-sm mb-1">
        {label}
      </label>
      <select
        id={name}
        {...props}
        className={clsx(
          'text-sm border border-gray-400 text-gray-700 font-normal hover:border-gray-500 focus:border-gray-600 placeholder:text-gray-400 outline-none focus:ring-0 transition rounded w-full placeholder-gray-600',
          error && 'border-red-500 hover:border-red-500 focus:border-red-500',
          className
        )}
      >
        {data.map((option, i) => (
          <option key={`${option.value}_${i}`} {...option}>
            {option.label}
          </option>
        ))}
      </select>
      <p className="text-red-500 text-sm mt-1 leading-none">{error}</p>
    </>
  );
};

export default Select;
