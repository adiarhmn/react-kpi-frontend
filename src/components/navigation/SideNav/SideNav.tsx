import { NavLink } from '@mantine/core';
import { Icon } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type SideNavProps = {
  title: string;
  href: string;
  icon: Icon;
};

interface Props {
  SideNavProps: SideNavProps[];
}

export const SideNav: React.FC<Props> = ({ SideNavProps }) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden min-h-screen">
      <div className="relative p-2">
        {SideNavProps.map((SideNavProps, index) => (
          <NavLink
            className="rounded-xl mb-1"
            key={index}
            label={SideNavProps.title}
            onClick={() => {
              setActive(index);
              navigate(SideNavProps.href);
            }}
            leftSection={<SideNavProps.icon size={20} />}
            active={index === active}
          />
        ))}
      </div>
    </section>
  );
};
