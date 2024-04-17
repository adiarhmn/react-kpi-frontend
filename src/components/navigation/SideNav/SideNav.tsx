import { NavLink } from '@mantine/core';
import { Icon } from '@tabler/icons-react';
import { useState } from 'react';

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
    <section className="relative overflow-hidden min-h-screen">
      <div className="relative p-2">
        {SideNavProps.map((SideNavProps, index) => (
          <NavLink
            className="rounded-xl mb-1"
            key={index}
            href={SideNavProps.href}
            label={SideNavProps.title}
            onClick={() => console.log(index)}
            active
            leftSection={<SideNavProps.icon size={20} />}
          />
        ))}
      </div>
    </section>
  );
};
