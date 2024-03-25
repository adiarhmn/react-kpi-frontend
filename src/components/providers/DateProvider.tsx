import 'dayjs/locale/id';
import { DatesProvider } from '@mantine/dates';

type Props = {
  children: React.ReactNode;
};

export const DateProvider: React.FC<Props> = ({ children }) => {
  return <DatesProvider settings={{ locale: 'id' }}>{children}</DatesProvider>;
};
