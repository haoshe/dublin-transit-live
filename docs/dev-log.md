# Developer Log – Dublin Transit Live

### 📅 May 17, 2025
- Created the GitHub repo
- Wrote initial README and project plan

## 📅 2025-06-30 – Day 1: Initial Setup & React Project Bootstrapping

### 🛠 Tasks Completed:
- ✅ Created and cloned the `dublin-transit-live` GitHub repository
- ✅ Set up initial folder structure: `frontend/`, `backend/`, `docs/`, `README.md`
- ✅ Initialized React frontend with TypeScript using `create-react-app`
- ✅ Fixed multiple `npm` permission issues using `chown` and cache cleanup
- ✅ Successfully installed and configured `@react-google-maps/api` in the frontend
- ✅ Registered and configured a Google Maps API key with HTTP referrer restriction (`http://localhost:3000/*`)
- ✅ Created `.env` in the frontend to securely store the API key
- ✅ Confirmed `.env` is included in `.gitignore` to keep API key private
- ✅ Integrated Google Maps and Places Autocomplete into the app
- ✅ Created two input boxes for start and end locations
- ✅ Verified autocomplete suggestions show up and return valid addresses
- ✅ Captured selected addresses and printed them to the browser console

### 🔜 Ready to Move On To:

- 🧭 **Drawing routes** with the [Google Directions API](https://developers.google.com/maps/documentation/directions/start)  
  Display transit routes between the selected start and end locations on the map.

- 🛰️ **Sending location data to the backend**  
  Forward user-selected start/end points to an Express backend to process GTFS/GTFS-RT data and return real-time transit info.


---

### 🐞 Issues Encountered & Fixes:

#### 1. ❌ `mkdir frontend/src/...` failed
- **Cause:** Tried creating subdirectories (`src/components`, `src/pages`) before running `create-react-app`. But `src/` didn’t exist yet.
- **Fix:** Ran `npx create-react-app frontend --template typescript` first to generate `src/`, then created subdirectories.

#### 2. ❌ `EACCES` errors during `npx create-react-app`
- **Cause:** npm cache directory `~/.npm` had permission issues.
- **Fix:** Cleared cache and reset ownership:
  ```bash
  npm cache clean --force
  sudo chown -R $(whoami) ~/.npm
  ````
#### 3. ❌ `EACCES` errors when updating npm globally
- **Cause:** No write access to `/usr/local/lib/node_modules/`
- **Fix:** Used elevated permissions:
  ```bash
  sudo npm install -g npm@latest
  ```
#### 4. ❌ Cache folder still had root-owned files
- **Fix:** Followed npm's recommendation:
  ```bash
  sudo chown -R 501:20 ~/.npm
  ```

### 🧠 Lessons Learned

In future development sessions, I should start by **creating a new Git branch** (e.g. `feature/frontend-setup`) before making any changes.

This allows:

- ✅ Safer experimentation  
- ✅ Isolated commits  
- ✅ Easier code review or rollback  

Once the feature or setup is complete and tested, I can then **merge it back into `main`**.

This will help maintain a clean commit history and avoid accidentally pushing untested or incomplete code to the main branch.

## 🗓️ 2025-07-01 Day 2

### ✅ Summary
I implemented transit route rendering using the Google Directions API and followed a clean Git workflow to structure my development process.

---

### 🔧 Tasks Completed
- ✅ Set up Google Maps Autocomplete fields for **start** and **end** locations.
- ✅ Integrated `google.maps.DirectionsService` to request **transit routes**.
- ✅ Rendered routes visually using `<DirectionsRenderer />` on the map.
- ✅ Verified successful rendering of selected routes in the frontend.

---

### 🌱 Git Workflow Followed
- Created a new branch: `feature/google-directions`
- Implemented and tested feature in isolation.
- Committed changes and pushed branch to GitHub.
- Opened a **Pull Request** and merged into `main` via GitHub UI.
- Pulled latest `main` branch locally.
- Deleted the local feature branch to keep the repo clean.

---

### 🧠 Lessons Learned
- 🔀 Using feature branches helps keep the Git history organized.
- ✅ Always test features locally before merging.
- 🗃️ GitHub PRs give a clear and reviewable trail of progress.
- 🚫 Avoid merging locally before doing it on GitHub — keep one source of truth.

---

### 📍 Next Steps
- Begin working on sending selected location coordinates to the backend (instead of just addresses).
- Display transit stops and handle real-time data(GTFS-RT).



## 📅 2025-07-10 – Day 3: Coordinates + GTFS-RT Integration

### ✅ Summary
Completed backend and frontend integration to send selected location **coordinates** instead of just addresses, and successfully **fetched real-time transit data** using the GTFS-RT feed from the National Transport Authority (NTA).

---

### 🔧 Tasks Completed

- ✅ Updated frontend to extract **latitude/longitude coordinates** from Google Maps Autocomplete for both start and end locations.
- ✅ Sent coordinates to the backend via a `POST /api/coordinates` route.
- ✅ Created backend Express route to:
  - Receive and log incoming coordinate data.
  - Fetch **real-time GTFS-RT feed** from NTA.
  - Decode the feed using `gtfs-realtime-bindings`.
  - Filter relevant entities (`tripUpdate`, `vehicle`) and return them in the API response.
- ✅ Verified that GTFS-RT feed is being correctly parsed and delivered to the frontend.

---

### 🧪 Tested By
- Selecting start and end locations via Google Autocomplete.
- Confirming the coordinates appear in browser console.
- Verifying the backend logs incoming coordinates.
- Inspecting network response to see valid GTFS-RT entities returned.

---

### 🧠 Lessons Learned
- It's better to start with a minimal working model before adding complexity. When I had trouble getting the backend to receive coordinate data, I simplified everything to a bare-bones client-server connection. Once I confirmed communication was working, I rebuilt the app on top of that foundation.
- I spent a few days stuck because my backend server was using port 5000, which silently failed to work - possibly because it was in use by another process. Changing it to port 8080 immediately resolved the issue. This reinforced how even small environment-level details(like port conflicts) can block progress if overlooked.
- I followed the official [GTFS-RT Node.js example](https://gtfs.org/documentation/realtime/language-bindings/nodejs/) to correctly decode binary protocol buffer data using gtfs-realtime-bindings.
- I used the NTA’s [GTFS-RT API documentation](https://developer.nationaltransport.ie/api-details#api=gtfsr&operation=gtfsr-v2) to find the correct endpoint.
---

### 📍 Next Steps

- Begin mapping `stopId` values to actual **latitude/longitude** using static GTFS `stops.txt`.
- Display transit stops as **markers** on the map using real-time or static coordinates.
- Add info windows to markers to show stop names and arrival/departure times.

https://www.transportforireland.ie/transitData/PT_Data.html


