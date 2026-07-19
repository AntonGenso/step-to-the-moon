'use client';

import cn from 'classnames';
import { useTranslations } from 'next-intl';
import styles from './AdminNav.module.scss';

import HomeIcon from '@/public/images/svg/sidebar/home-icon.svg';
import JoystickIcon from '@/public/images/svg/sidebar/joystick-icon.svg';

export type AdminTab = 'main' | 'missions';

const tabs = [
  { id: 'main' as const, icon: HomeIcon, labelKey: 'profile' },
  { id: 'missions' as const, icon: JoystickIcon, labelKey: 'missions' },
];

interface IAdminNavProps {
  activeTab: AdminTab;
  onChange: (tab: AdminTab) => void;
}

export const AdminNav = ({ activeTab, onChange }: IAdminNavProps) => {
  const tn = useTranslations('nav');

  return (
    <ul className={styles.nav}>
      {tabs.map(({ id, icon: Icon, labelKey }) => (
        <li key={id} className={styles.item}>
          <button
            type="button"
            onClick={() => onChange(id)}
            className={cn(styles.button, { [styles.buttonActive]: activeTab === id })}
          >
            <Icon />
            {tn(labelKey)}
          </button>
        </li>
      ))}
    </ul>
  );
};
