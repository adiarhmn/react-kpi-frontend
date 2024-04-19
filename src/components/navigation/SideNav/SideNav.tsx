import { NavLink } from '@mantine/core';
import { Icon } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export type SideNavProps = {
  title: string;
  href: string;
  icon: Icon;
};

interface Props {
  SideNavProps: SideNavProps[];
}

export const SideNav: React.FC<Props> = ({ SideNavProps }) => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    console.log(pathname);
    return pathname.startsWith(path);
  };
  const navigate = useNavigate();
  return (
    <section className="overflow-x-auto min-h-screen pt-1 bar-scroll-blue">
      <div className="p-2 flex flex-col">
        {SideNavProps.map((SideNavProps, index) => (
          <NavLink
            className="rounded-xl mb-1"
            key={index}
            label={SideNavProps.title}
            onClick={() => {
              navigate(SideNavProps.href);
            }}
            leftSection={<SideNavProps.icon size={20} />}
            active={isActive(SideNavProps.href)}
          />
        ))}
      </div>
    </section>
  );
};
