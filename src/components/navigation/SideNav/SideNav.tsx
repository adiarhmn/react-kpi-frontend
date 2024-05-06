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
  HeaderList: string | null;
  ToggleButton: () => void;
  TitleSetting: (title: string) => void;
}

export const SideNav: React.FC<Props> = ({ SideNavProps, HeaderList, ToggleButton, TitleSetting }) => {
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
    <>
      {HeaderList && (
        <div className="text-xs text-slate-400 font-semibold uppercase mb-2 pt-3 px-3">{HeaderList}</div>
      )}
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
    </>
  );
};
