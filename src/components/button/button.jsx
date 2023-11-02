import clsx from 'clsx';
import styles from './button.module.css';

export function Button({ className, onClick, children }) {
  return <button className={clsx(className, styles.root)} onClick={onClick} type="button">{children}</button>;
}
