import ArrowLeft from '@/public/images/profile/skin/svg/arrow-left.svg';
import ArrowRight from '@/public/images/profile/skin/svg/arrow-right.svg';
import styles from './Heading.module.scss';

export const Heading = ({ title }: { title: string }) => {
  return (
    <div className={styles.headingContainer}>
      <div className="relative flex w-full items-center">
        <ArrowLeft className={`${styles.icon} z-10 ml-auto overflow-hidden`} />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className="w-full">
        <ArrowRight className={styles.icon} />
      </div>
    </div>
  );
};
