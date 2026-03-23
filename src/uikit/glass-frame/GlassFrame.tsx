import { ReactNode } from 'react';
import styles from './GlassFrame.module.scss';
import cn from 'classnames';

interface GlassFrameProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

export const GlassFrame = ({ children, className, innerClassName }: GlassFrameProps) => {
  return (
    <div className={cn(styles.frame, className)}>
      <div className={cn(styles.inner, innerClassName)}>
        {children}
      </div>
    </div>
  );
};
