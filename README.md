# DROP.

DROP. is a premium hydration brand offering sustainable, mineral-rich water in 100% recyclable aluminium cans. 

## Tech Stack
This project is built using a modern Next.js stack with a strictly defined 4-tier backend architecture.
- **Frontend:** Next.js (App Router), React, TailwindCSS, GSAP (animations)
- **Backend:** Next.js Route Handlers
- **Validation:** Zod
- **Database:** MongoDB (mongoose/mongodb native client)
- **Rate Limiting & Caching:** Upstash Redis

---

## 4-Tier Backend Architecture
All API requests must pass through these explicit layers in order:
1. **API Routes (`/src/app/api/*`)**: Purely handles HTTP Request/Response. Responsible for invoking rate limiting and validation. No business logic belongs here.
2. **Validation (`/src/lib/validations`)**: Zod schemas that sanitize and strictly enforce types for all incoming payloads.
3. **Services (`/src/services/*`)**: Where the core business logic happens. Receives validated data, runs operations, and calls repositories.
4. **Repositories (`/src/repositories/*`)**: The only layer allowed to communicate directly with the database (MongoDB).

---

## Local Setup

### 1. Environment Variables
Create a `.env` (or `.env.local`) file in the root directory. You will need:
```env
# MongoDB Connection URI
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/drop?appName=Cluster0

# Upstash Redis Connection URL (Required for strict rate limiting)
REDIS_URL=rediss://default:xxx@upstash.io:6379
```
*Note: Do not commit `.env.local` or `.env` to git. All legacy authentication (OAuth/JWT) variables have been permanently removed.*

### 2. Installation
Install the necessary dependencies using npm:
```bash
npm install
```

### 3. Run the Development Server
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Key Features & Hygiene Rules
- **Consolidated Forms:** All forms (Waitlist, Contact) are strictly driven by a unified `<LeadForm />` component in `/src/components/ui/`. Parallel form logic is forbidden.
- **Fail-Loud Rate Limiting:** All public POST routes are heavily rate-limited (5 req / min / IP). If Redis goes offline, the API intentionally fails loudly (500 Error) rather than failing open to prevent unmetered abuse.
- **No Third-Party SDKs:** The application uses strictly zero third-party marketing or tracking SDKs, preserving absolute user privacy.
