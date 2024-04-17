import { NavLink } from '@mantine/core';
import { Icon } from '@tabler/icons-react';

export type SideNavProps = {
  title: string;
  href: string;
  icon: Icon;
};

interface Props {
  SideNavProps: SideNavProps[];
}

export const SideNav: React.FC<Props> = ({ SideNavProps }) => {
  return (
    <>
      {SideNavProps.map((SideNavProps) => (
        <NavLink
          href={SideNavProps.href}
          label={SideNavProps.title}
          leftSection={<SideNavProps.icon size={20} />}
        />
      ))}
    </>
  );
};
