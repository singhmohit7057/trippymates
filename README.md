# Trippy Mates

A modern travel booking platform that connects travellers with verified local Captains across India and beyond. Built with React 19, TypeScript, and Vite.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build Tool | Vite 8 |
| Routing | React Router v7 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Backend (planned) | Supabase |
| Hosting | Vercel |

> All styling uses inline TypeScript `CSSProperties` objects — no CSS files, Tailwind, or CSS Modules.

---

## Pages

### Public
| Route | Page |
|---|---|
| `/` | Home |
| `/trips` | All Trips (Domestic · International · Corporate) |
| `/trips/domestic` | Domestic Trips |
| `/trips/international` | International Trips |
| `/trips/corporate` | Corporate Trips |
| `/captains` | Browse Captains |
| `/custom-trip` | Custom Trip Enquiry |
| `/community` | Community |
| `/gallery` | Gallery |
| `/about` | About Us |
| `/faq` | FAQ |
| `/contact` | Contact |
| `/referrals` | Referral Programme |
| `/coupons` | Coupons & Offers |
| `/unsubscribe` | Email Unsubscribe |

### Auth
| Route | Page |
|---|---|
| `/login` | Login |
| `/register` | Register |
| `/forgot-password` | Forgot Password |
| `/reset-password` | Reset Password |

### Account
| Route | Page |
|---|---|
| `/account` | Dashboard |
| `/account/profile` | Profile |
| `/account/settings` | Settings |
| `/account/bookings` | My Bookings |
| `/account/captains` | Saved Captains |
| `/account/referrals` | My Referrals |

### Legal
| Route | Page |
|---|---|
| `/privacy-policy` | Privacy Policy |
| `/cookies-policy` | Cookies Policy |
| `/terms-and-conditions` | Terms & Conditions |

---

## Project Structure

```
src/
├── components/        # Shared components (Layout, Footer, Navbar)
├── data/              # Mock data (mock.ts)
├── lib/               # Utilities and helpers
├── pages/
│   ├── auth/          # Login, Register, Forgot/Reset Password
│   ├── account/       # User dashboard pages
│   ├── trips/         # Domestic, International, Corporate trip pages
│   ├── legal/         # Privacy, Cookies, Terms
│   └── system/        # Admin, 404, Coming Soon
├── types/             # TypeScript interfaces (Trip, Captain, User, etc.)
└── App.tsx            # Route definitions
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Deployment

The project is deployed on **Vercel**. A `vercel.json` at the root rewrites all routes to `index.html` to support client-side navigation:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Push to `main` triggers an automatic deployment.

---

## Brand & Theme

- **Primary colour:** `#007AFF` (Apple Blue)
- **Dark navy:** `#001F5B`
- **Font:** System UI (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`)

---

## License

Private — all rights reserved © 2025 Trippy Mates.


## Devloper
Made with LOVE by TMMT
