import React from 'react';
import styles from './FormField.module.css';

export default function FormField({ label, error, required, children, hint }) {
  return (
    <div className={`${styles.field} ${error ? styles.hasError : ''}`}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.req}>*</span>}
      </label>
      {children}
      {error && (
        <span className={styles.error}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/><path fill="white" d="M12 7v6m0 4h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {error}
        </span>
      )}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}
