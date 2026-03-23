import styles from './Heading.module.scss';

export const Heading = ({ title }: { title: string }) => {
  return (
    <div className={styles.headingContainer}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};
