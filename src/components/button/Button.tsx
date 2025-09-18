import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', icon, className }) => {
  return (
    <button type={type} onClick={onClick} className={`${styles.signupBtn} ${className || ''}`}>
      {text}
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};

export default Button;
