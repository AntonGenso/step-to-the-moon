import ArrowLeft from '@/public/images/profile/skin/svg/arrow-left.svg';
import ArrowRight from '@/public/images/profile/skin/svg/arrow-right.svg';
import styles from './Heading.module.scss';

export const Heading = ({ title }: { title: string }) => {
  return (
    <div className={styles.headingContainer}>
      <ArrowLeft className={styles.icon} />
      <h1 className={styles.title}>{title}</h1>
      <ArrowRight className={styles.icon} />
    </div>
  );
};
