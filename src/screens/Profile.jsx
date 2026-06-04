import React, { useCallback } from 'react';
import { useProfile } from '../hooks/useProfile';
import ProgressRing from '../components/ProgressRing';
import FormField from '../components/FormField';
import styles from './Profile.module.css';

export default function Profile() {
  const {
    form, errors, completion, submitted,
    handleChange, handleBlur, addSkill, removeSkill, handleSubmit, reset,
  } = useProfile();

  const handleAvatarChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => handleChange('avatar', ev.target.result);
    reader.readAsDataURL(file);
  }, [handleChange]);

  const handleResumeChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) handleChange('resume', file.name);
  }, [handleChange]);

  const onSkillKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addSkill(); }
  };

  if (submitted) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h2>Profile Saved!</h2>
          <p>Your profile is {completion}% complete. Great work!</p>
          <button className={styles.successBtn} onClick={reset}>Edit Profile</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSticky}>
            <h2 className={styles.sidebarTitle}>Profile Completion</h2>
            <ProgressRing value={completion} />

            <div className={styles.checklist}>
              {[
                { key: 'avatar',    label: 'Profile Picture', done: !!form.avatar },
                { key: 'fullName',  label: 'Full Name',       done: form.fullName.trim().length >= 2 },
                { key: 'email',     label: 'Email Address',   done: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) },
                { key: 'phone',     label: 'Phone Number',    done: /^[\d\s\+\-\(\)]{7,15}$/.test(form.phone) },
                { key: 'skills',    label: 'Skills',          done: form.skills.length > 0 },
                { key: 'education', label: 'Education',       done: !!(form.degree && form.institution && form.graduationYear) },
                { key: 'resume',    label: 'Resume',          done: !!form.resume },
              ].map(item => (
                <div key={item.key} className={`${styles.checkItem} ${item.done ? styles.checkDone : ''}`}>
                  <span className={styles.checkMark}>
                    {item.done ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : <span className={styles.checkDot} />}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Form */}
        <main className={styles.main}>
          <div className={styles.mainHeader}>
            <h1 className={styles.pageTitle}>Complete Your Profile</h1>
            <p className={styles.pageSub}>Help employers find you faster by completing your profile.</p>
          </div>

          {/* ── Section: Avatar ── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Profile Picture</h3>
            <div className={styles.avatarRow}>
              <div className={styles.avatarPreview}>
                {form.avatar ? (
                  <img src={form.avatar} alt="Avatar preview" className={styles.avatarImg} />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <label className={styles.uploadBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className={styles.fileHidden} />
                </label>
                <p className={styles.uploadHint}>JPG, PNG or GIF. Max 5 MB.</p>
              </div>
            </div>
          </section>

          {/* ── Section: Personal Info ── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div className={styles.grid2}>
              <FormField label="Full Name" error={errors.fullName} required>
                <input
                  className={`input ${errors.fullName ? 'input-error' : ''}`}
                  type="text"
                  placeholder="Jane Doe"
                  value={form.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                />
              </FormField>
              <FormField label="Email Address" error={errors.email} required>
                <input
                  className={`input ${errors.email ? 'input-error' : ''}`}
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                />
              </FormField>
              <FormField label="Phone Number" error={errors.phone} required>
                <input
                  className={`input ${errors.phone ? 'input-error' : ''}`}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                />
              </FormField>
            </div>
          </section>

          {/* ── Section: Skills ── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Skills</h3>
            <FormField label="Add Skills" error={errors.skills} hint="Press Enter or click Add to add a skill" required>
              <div className={styles.skillInputRow}>
                <input
                  className={`input ${errors.skills ? 'input-error' : ''}`}
                  type="text"
                  placeholder="e.g. React, Python, Figma"
                  value={form.skillInput}
                  onChange={e => handleChange('skillInput', e.target.value)}
                  onKeyDown={onSkillKeyDown}
                />
                <button type="button" className={styles.addBtn} onClick={addSkill}>Add</button>
              </div>
            </FormField>
            {form.skills.length > 0 && (
              <div className={styles.skillTags}>
                {form.skills.map(skill => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                    <button
                      type="button"
                      className={styles.removeSkill}
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove ${skill}`}
                    >×</button>
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* ── Section: Education ── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Education</h3>
            <div className={styles.grid2}>
              <FormField label="Degree / Qualification" error={errors.degree} required>
                <select
                  className={`input ${errors.degree ? 'input-error' : ''}`}
                  value={form.degree}
                  onChange={e => handleChange('degree', e.target.value)}
                  onBlur={() => handleBlur('degree')}
                >
                  <option value="">Select degree</option>
                  {["High School Diploma","Associate's","Bachelor's","Master's","MBA","PhD","Bootcamp","Self-taught / Other"].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Institution" error={errors.institution} required>
                <input
                  className={`input ${errors.institution ? 'input-error' : ''}`}
                  type="text"
                  placeholder="University of California"
                  value={form.institution}
                  onChange={e => handleChange('institution', e.target.value)}
                  onBlur={() => handleBlur('institution')}
                />
              </FormField>
              <FormField label="Graduation Year" error={errors.graduationYear} required>
                <input
                  className={`input ${errors.graduationYear ? 'input-error' : ''}`}
                  type="number"
                  placeholder="2023"
                  min="1950"
                  max="2030"
                  value={form.graduationYear}
                  onChange={e => handleChange('graduationYear', e.target.value)}
                  onBlur={() => handleBlur('graduationYear')}
                />
              </FormField>
            </div>
          </section>

          {/* ── Section: Resume ── */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Resume</h3>
            <FormField label="Upload Resume" error={errors.resume} required>
              <label className={`${styles.resumeDropzone} ${form.resume ? styles.resumeUploaded : ''} ${errors.resume ? styles.resumeError : ''}`}>
                {form.resume ? (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className={styles.resumeFileName}>{form.resume}</span>
                    <span className={styles.resumeChange}>Click to replace</span>
                  </>
                ) : (
                  <>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="12" y1="12" x2="12" y2="18"/>
                      <polyline points="9 15 12 12 15 15"/>
                    </svg>
                    <span>Drag & drop or <u>browse</u></span>
                    <span className={styles.resumeHint}>PDF, DOC, DOCX — max 10 MB</span>
                  </>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className={styles.fileHidden}
                />
              </label>
            </FormField>
          </section>

          {/* Submit */}
          <div className={styles.submitRow}>
            <div className={styles.submitProgress}>
              <div className={styles.submitBar} style={{ width: `${completion}%` }} />
            </div>
            <p className={styles.submitHint}>{completion}% complete</p>
            <button type="button" className={styles.submitBtn} onClick={handleSubmit}>
              Save Profile
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
