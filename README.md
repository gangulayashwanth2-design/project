# HIT Front‑end Demo

## Overview

This is a **stand‑alone, premium‑styled web front‑end** for the **HIT** (Habits‑In‑Tracking) application.  It was built to showcase a beautiful, dark‑mode UI while keeping the JavaScript logic **framework‑free** (plain HTML, CSS, and vanilla JS).

### Why this approach?
- **Zero‑install for the UI** – the app runs directly from a static folder; no Node.js build step is required for the basic mode.
- **Offline‑first** – when the real server is unavailable the app seamlessly falls back to an **in‑browser IndexedDB mock** that implements the exact same API surface as the official Haskell/PostgreSQL backend.  This guarantees that the UI works everywhere, even on machines without Docker.
- **Premium design** – modern dark palette, glass‑morphism‑inspired cards, micro‑animations on buttons, and responsive layout make the app feel production‑ready.
- **Future‑proof** – the `api.js` adapter exposes a single constant `BACKEND_MODE` (`'local'` or `'remote'`).  Switching to the real backend is a one‑line change (or a query‑string flag) – no other code needs to be touched.

## Tech Stack & Rationale
| Layer | Technology | Why It Was Chosen |
|-------|------------|-------------------|
| **Structure** | HTML5 | Semantic markup, no build tools needed; works everywhere. |
| **Styling** | Vanilla CSS (custom dark theme, utility classes) | Full control over design, no runtime overhead of Tailwind or CSS frameworks; ensures premium look while keeping the repo lightweight. |
| **Logic** | Vanilla JavaScript (ES6 modules) | No framework dependency, easier to embed in a static site and to run directly from the file system. |
| **Local Persistence** | IndexedDB (wrapped in `api.js`) | Provides a true offline‑first experience; mimics the real backend’s CRUD API so the front‑end can be developed without Docker. |
| **Remote API** | REST over HTTP (fetch) | Matches the Haskell backend’s public API; easy to call from plain JS without extra libraries. |
| **Diagnostic Tool** | `test.html` with scripted checks | Gives developers a quick verification that both the mock and real backends work correctly. |
| **Packaging** | ZIP archive (PowerShell `Compress-Archive`) | Simple delivery format for clients; no installer required. |
| **Optional Build** | `npx serve` (optional) | Allows serving the static files locally with a tiny dev server if desired. |

## Folder Structure
```
 desertation/
 ├─ public/                     # static web assets
 │   ├─ index.html              # main UI entry point
 │   ├─ main.js                 # UI logic & event handlers
 │   ├─ api.js                  # backend adapter (local ↔ remote)
 │   ├─ test.html               # diagnostic page with 15 automated checks
 │   └─ assets/ …               # images, fonts, etc.
 ├─ README.md                   # this file (updated with tech stack details)
 └─ (optional) .gitignore, etc.
```

## How to Run the Demo (Local Mock Backend)
1. **Extract** the ZIP you received (or clone this repo).
2. Open `public/index.html` in a modern browser (Chrome, Edge, Firefox).
3. The app will automatically use the **local IndexedDB mock**.  You can sign up, log in, create habits/goals, and everything persists across reloads.
4. To verify the mock works, open `public/test.html`.  All 15 checks should turn green.

## Connecting to the Real Backend (HIT Service)
If you want the front‑end to talk to the **actual Haskell/PostgreSQL backend**, follow these steps:

### 1️⃣ Install Docker (once per machine)
- **Windows** – download Docker Desktop from https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe and run the installer.
- **macOS** – `brew install --cask docker` then launch Docker.app.
- **Linux** – see the official guide https://docs.docker.com/engine/install/ for your distro.

### 2️⃣ Clone & start the backend
```bash
git clone https://github.com/Hcatlab/HIT.git
cd HIT
docker compose up -d   # pulls images, builds the Haskell service, starts PostgreSQL
```
The backend will listen on **http://localhost:8080**.  Verify it with:
```
curl http://localhost:8080/health   # should return {"status":"ok"}
```

### 3️⃣ Switch the front‑end to *remote* mode
Open `public/api.js` (or use a query‑string flag) and change the constant:
```js
// default – local mock
// const BACKEND_MODE = 'local';

// 👉 change to this line
const BACKEND_MODE = 'remote';
```
If your backend runs on a different host or port, edit the next line as well:
```js
const REMOTE_URL = 'http://your-host:8080';
```
(Alternatively, open the UI with `public/index.html?mode=remote` or `?url=http://your-host:8080` – the file already reads the URL parameters.)

### 4️⃣ Run the UI again
- Open `public/index.html` (or serve the folder via a static server, e.g., `npx -y serve .`).
- All authentication, habit, and goal actions will now hit the real server.

### 5️⃣ Verify the connection
- Open `public/test.html`.  All checks should display **green ✓** indicating successful health check, real signup/login, and CRUD against PostgreSQL.
- In the browser’s DevTools → Network panel you’ll see requests to `http://localhost:8080/...`.

### 6️⃣ Production tip (optional)
For a production deployment you may want to:
- Run the backend on a public host and expose it via HTTPS.
- Place the static files behind a reverse‑proxy (NGINX) that also forwards `/api/*` to the Docker container.
- Set `REMOTE_URL` in `api.js` (or via an environment variable that you inject into the page during build) to the public URL.

---

**That’s it!** The ZIP you downloaded contains everything needed for the mock version, and the steps above detail exactly what to do to connect to the real HIT backend when you’re ready.

---
