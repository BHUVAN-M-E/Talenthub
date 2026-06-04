import React, { useState } from 'react';
import styles from './JobCard.module.css';

const TYPE_COLORS = {
  'Full-time':  { bg: 'rgba(76,175,125,0.12)', color: '#4caf7d' },
  'Part-time':  { bg: 'rgba(100,160,255,0.12)', color: '#64a0ff' },
  'Contract':   { bg: 'rgba(232,160,32,0.12)',  color: '#e8a020' },
  'Internship': { bg: 'rgba(200,100,255,0.12)', color: '#c864ff' },
};

export default function JobCard({ job, index }) {
  const [applied, setApplied] = useState(false);
  const badge = TYPE_COLORS[job.type] || TYPE_COLORS['Full-time'];

  return (
    <article
      className={`${styles.card} ${job.featured ? styles.featured : ''}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {job.featured && <div className={styles.featuredBadge}>Featured</div>}
      <div className={styles.top}>
        <div className={styles.logo} style={{ background: job.logoColor }}>
          {job.logo}
        </div>
        <div className={styles.meta}>
          <h3 className={styles.title}>{job.title}</h3>
          <p className={styles.company}>{job.company}</p>
        </div>
      </div>

      <div className={styles.details}>
        <span className={styles.detail}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {job.location}
        </span>
        <span className={styles.detail}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
          {job.posted}
        </span>
        <span className={styles.detail}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/>
          </svg>
          {job.salary}
        </span>
      </div>

      <div className={styles.tags}>
        <span
          className={styles.typeBadge}
          style={{ background: badge.bg, color: badge.color }}
        >
          {job.type}
        </span>
        {job.tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>

      <button
        className={`${styles.applyBtn} ${applied ? styles.applied : ''}`}
        onClick={() => setApplied(true)}
        disabled={applied}
      >
        {applied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Applied
          </>
        ) : 'Apply Now'}
      </button>
    </article>
  );
}
