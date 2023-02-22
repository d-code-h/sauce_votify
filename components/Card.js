import React from 'react';
import styles from '../styles/card.module.css';

export default function Card({ children }) {
  return <div className={styles.access}>{children}</div>;
}
