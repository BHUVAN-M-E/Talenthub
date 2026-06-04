import React from 'react';
import styles from './ProgressRing.module.css';

export default function ProgressRing({ value }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const color =
    value < 40 ? '#e05555' :
    value < 70 ? '#e8a020' :
    '#4caf7d';

  const label =
    value < 40 ? 'Getting started' :
    value < 70 ? 'Making progress' :
    value < 100 ? 'Almost there!' :
    'Complete!';

  return (
    <div className={styles.wrapper}>
      <div className={styles.ringWrap}>
        <svg width="128" height="128" viewBox="0 0 128 128">
          <circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth="8"
          />
          <circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 64 64)"
            style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.4s ease' }}
          />
        </svg>
        <div className={styles.label}>
          <span className={styles.pct} style={{ color }}>{value}%</span>
        </div>
      </div>
      <p className={styles.status}>{label}</p>
      <div className={styles.barWrap}>
        <div
          className={styles.bar}
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}
