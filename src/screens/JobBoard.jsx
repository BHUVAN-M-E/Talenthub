import React, { useState, useMemo } from 'react';
import JobCard from '../components/JobCard';
import { JOBS, JOB_TYPES } from '../data/jobs';
import styles from './JobBoard.module.css';

export default function JobBoard() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');

  const filtered = useMemo(() => {
    return JOBS.filter(job => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.tags.some(t => t.toLowerCase().includes(q));
      const matchType = activeType === 'All' || job.type === activeType;
      return matchSearch && matchType;
    });
  }, [search, activeType]);

  const counts = useMemo(() => {
    const map = { All: JOBS.length };
    JOB_TYPES.slice(1).forEach(t => {
      map[t] = JOBS.filter(j => j.type === t).length;
    });
    return map;
  }, []);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEye}>🔥 {JOBS.length} open positions</p>
          <h1 className={styles.heroTitle}>
            Find your next<br />
            <em>great opportunity</em>
          </h1>
          <p className={styles.heroSub}>
            Curated roles from the world's most exciting companies.
          </p>
          {/* Search */}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search jobs, companies, skills…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search jobs"
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch('')} aria-label="Clear search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className={styles.body}>
        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterLabel}>Filter by type</div>
          <div className={styles.filterButtons}>
            {JOB_TYPES.map(type => (
              <button
                key={type}
                className={`${styles.filterBtn} ${activeType === type ? styles.filterActive : ''}`}
                onClick={() => setActiveType(type)}
              >
                {type}
                <span className={styles.filterCount}>{counts[type] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results info */}
        <div className={styles.resultsInfo}>
          <span>
            {filtered.length === 0
              ? 'No jobs found'
              : `${filtered.length} job${filtered.length !== 1 ? 's' : ''} found`}
          </span>
          {(search || activeType !== 'All') && (
            <button className={styles.resetBtn} onClick={() => { setSearch(''); setActiveType('All'); }}>
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3>No jobs match your search</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
