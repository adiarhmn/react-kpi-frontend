import { useId } from 'react';

import { clsx } from '@/utils/format';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Radio: React.FC<Props> = (props) => {
  const { label, className } = props;
  const id = useId();

  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        {...props}
        className={clsx('w-4 h-4 text-primary bg-gray-100 border-gray-300', className)}
      />
      <label htmlFor={id} className="pl-2.5 w-full">
        {label}
      </label>
    </div>
  );
};

export default Radio;
