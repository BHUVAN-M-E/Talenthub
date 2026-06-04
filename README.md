# TalentHub — Job Board & Profile Completion UI

A responsive React.js application built as a frontend assessment, featuring a Job Board with search/filter and a Profile Completion screen with validation and a live progress indicator.

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/job-board.git
cd job-board

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview the build locally
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx            # Sticky responsive nav with screen toggle
│   ├── JobCard.jsx           # Individual job posting card
│   ├── ProgressRing.jsx      # SVG ring + bar for profile completion
│   └── FormField.jsx         # Reusable labeled field with error display
├── screens/
│   ├── JobBoard.jsx          # Job listing screen with search & filter
│   └── Profile.jsx           # Profile form with all sections
├── data/
│   └── jobs.js               # Static mock job data (12 postings)
├── hooks/
│   └── useProfile.js         # All form state, validation, completion logic
├── App.jsx                   # Root component, screen routing
├── main.jsx                  # React entry point
└── index.css                 # Global CSS design tokens & resets
```

---

## 🎨 Design Approach

**Aesthetic**: Dark editorial — deep charcoal background, warm amber accent (`#e8a020`), Playfair Display for display headings and DM Sans for body text. Intentional, cohesive, and professional without being generic.

**Palette**:
- Background: `#0e0e0e`
- Surface: `#171717`
- Accent: `#e8a020` (amber)
- Success: `#4caf7d`
- Error: `#e05555`

---

## ✅ Features

### Job Board Screen
- 12 mock job postings with company logo, type badge, salary, tags, and posted date
- Real-time **search** across title, company, location, and skills
- **Filter** by job type (Full-time, Part-time, Contract, Internship)
- **Apply** button with one-click confirmation state per card
- Featured jobs highlighted with a distinct border and badge
- Empty state when no results match
- Fully responsive grid (single column on mobile)

### Profile Completion Screen
- **Avatar upload** with live image preview
- **Full Name, Email, Phone** — all with real-time validation on blur
- **Skills** — tag-based input with Enter key and remove button support
- **Education** — degree dropdown, institution, and graduation year with validation
- **Resume upload** — styled dropzone with file name confirmation
- **Progress Indicator** — SVG ring + linear bar + checklist, all update live (0–100%)
- **Form validation** — per-field error messages shown on blur + full validation on submit
- Success state shown after valid submission, with option to edit

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| CSS Modules | Scoped component styles |
| Custom hooks | Form state & validation logic |

No external UI library was used — all components are hand-crafted for full control over design and behavior.

---

## 📱 Responsive Breakpoints

- **≥ 900px**: Two-column layout (sidebar + form), job grid auto-fill
- **600–900px**: Single column, sidebar stacks horizontally
- **< 600px**: Compact mobile layout, full-width cards and form fields

---

## 🔗 Deployment

This project can be deployed instantly on **Vercel** or **Netlify**:

```bash
# Vercel
npx vercel

# Netlify
npx netlify deploy --prod --dir=dist
```
