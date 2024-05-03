import { NavLink } from '@mantine/core';
import { Icon, IconGauge } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export type SideNavProps = {
  title: string;
  href: string;
  icon: Icon;
};

interface Props {
  SideNavProps: SideNavProps[];
  ToggleButton: () => void;
  TitleSetting: (title: string) => void;
}

export const SideNav: React.FC<Props> = ({ SideNavProps, ToggleButton, TitleSetting }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const currentNav = SideNavProps.find((nav) => location.pathname.startsWith(nav.href));
    if (currentNav) {
      TitleSetting(currentNav.title);
    }
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };
  const navigate = useNavigate();
  return (
    <section className="overflow-x-auto min-h-screen pt-1 bar-scroll-blue">
      <div className="p-2 flex flex-col">
        {SideNavProps.map((SideNavProps, index) => {
          return (
            <NavLink
              className="rounded-xl mb-1"
              key={index}
              label={SideNavProps.title}
              onClick={() => {
                navigate(SideNavProps.href);
                ToggleButton();
              }}
              leftSection={<SideNavProps.icon size={22} />}
              active={isActive(SideNavProps.href)}
            />
          );
        })}
        <NavLink
          href="#required-for-focus"
          label="Approval"
          leftSection={<IconGauge size="1rem" stroke={1.5} />}
          childrenOffset={28}
          className="rounded-xl mb-1"
        >
          <NavLink
            className="rounded-xl"
            href="#required-for-focus"
            label={<span className="border-l-2 border-blue-600 pl-4">Cuti</span>}
          />
          <NavLink
            className="rounded-xl"
            href="#required-for-focus"
            label={<span className="border-l-2 border-blue-600 pl-4">Lembur</span>}
          />
          <NavLink
            className="rounded-xl"
            href="#required-for-focus"
            label={<span className="border-l-2 border-blue-600 pl-4">Izin</span>}
          />
        </NavLink>
      </div>
    </section>
  );
};
