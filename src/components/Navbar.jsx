import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ screen, onNavigate }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => onNavigate('jobs')}>
          <span className={styles.logoMark}>T</span>
          <span className={styles.logoText}>TalentHub</span>
        </button>
        <div className={styles.links}>
          <button
            className={`${styles.link} ${screen === 'jobs' ? styles.active : ''}`}
            onClick={() => onNavigate('jobs')}
          >
            Job Board
          </button>
          <button
            className={`${styles.link} ${screen === 'profile' ? styles.active : ''}`}
            onClick={() => onNavigate('profile')}
          >
            Profile
          </button>
          <button className={styles.cta} onClick={() => onNavigate('profile')}>
            Complete Profile
          </button>
        </div>
        {/* Mobile menu toggle (icon only) */}
        <button className={styles.mobileToggle} onClick={() => onNavigate(screen === 'jobs' ? 'profile' : 'jobs')} aria-label="Switch screen">
          {screen === 'jobs' ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
