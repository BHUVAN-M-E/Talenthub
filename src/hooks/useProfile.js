import { useState, useCallback } from 'react';

const INITIAL_STATE = {
  avatar: null,
  fullName: '',
  email: '',
  phone: '',
  skills: [],
  skillInput: '',
  degree: '',
  institution: '',
  graduationYear: '',
  resume: null,
};

const VALIDATORS = {
  fullName: v => (!v.trim() ? 'Full name is required' : v.trim().length < 2 ? 'Too short' : ''),
  email: v => (!v.trim() ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Invalid email address' : ''),
  phone: v => (!v.trim() ? 'Phone number is required' : !/^[\d\s\+\-\(\)]{7,15}$/.test(v) ? 'Invalid phone number' : ''),
  degree: v => (!v.trim() ? 'Degree is required' : ''),
  institution: v => (!v.trim() ? 'Institution is required' : ''),
  graduationYear: v => {
    if (!v) return 'Year is required';
    const yr = parseInt(v);
    if (yr < 1950 || yr > 2030) return 'Enter a valid year';
    return '';
  },
};

const COMPLETION_WEIGHTS = {
  avatar: 10,
  fullName: 15,
  email: 15,
  phone: 10,
  skills: 15,
  education: 20,
  resume: 15,
};

export function useProfile() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const completion = (() => {
    let score = 0;
    if (form.avatar) score += COMPLETION_WEIGHTS.avatar;
    if (form.fullName.trim().length >= 2) score += COMPLETION_WEIGHTS.fullName;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) score += COMPLETION_WEIGHTS.email;
    if (/^[\d\s\+\-\(\)]{7,15}$/.test(form.phone)) score += COMPLETION_WEIGHTS.phone;
    if (form.skills.length > 0) score += COMPLETION_WEIGHTS.skills;
    if (form.degree && form.institution && form.graduationYear) score += COMPLETION_WEIGHTS.education;
    if (form.resume) score += COMPLETION_WEIGHTS.resume;
    return score;
  })();

  const validate = useCallback((fields = Object.keys(VALIDATORS)) => {
    const errs = {};
    fields.forEach(f => {
      if (VALIDATORS[f]) {
        const msg = VALIDATORS[f](form[f] ?? '');
        if (msg) errs[f] = msg;
      }
    });
    return errs;
  }, [form]);

  const handleChange = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (touched[field] && VALIDATORS[field]) {
      const msg = VALIDATORS[field](value);
      setErrors(prev => ({ ...prev, [field]: msg }));
    }
  }, [touched]);

  const handleBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (VALIDATORS[field]) {
      const msg = VALIDATORS[field](form[field] ?? '');
      setErrors(prev => ({ ...prev, [field]: msg }));
    }
  }, [form]);

  const addSkill = useCallback(() => {
    const skill = form.skillInput.trim();
    if (skill && !form.skills.includes(skill)) {
      setForm(prev => ({ ...prev, skills: [...prev.skills, skill], skillInput: '' }));
    }
  }, [form.skillInput, form.skills]);

  const removeSkill = useCallback((skill) => {
    setForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  }, []);

  const handleSubmit = useCallback(() => {
    const allFields = Object.keys(VALIDATORS);
    setTouched(Object.fromEntries(allFields.map(f => [f, true])));
    const errs = validate(allFields);
    if (form.skills.length === 0) errs.skills = 'Add at least one skill';
    if (!form.resume) errs.resume = 'Please upload your resume';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      return true;
    }
    return false;
  }, [validate, form.skills, form.resume]);

  const reset = () => {
    setForm(INITIAL_STATE);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return { form, errors, touched, completion, submitted, handleChange, handleBlur, addSkill, removeSkill, handleSubmit, reset };
}
