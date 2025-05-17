# Dublin Transit Live 🚍📍

A web app that provides **real-time public transportation information** in Dublin.  
Given a start and end location, the app displays all available public transport routes (Dublin Bus, Luas, DART) scheduled to depart **within the next hour**, including live updates.

---

## 🌟 Goal

To help users in Dublin quickly find real-time public transportation options between two locations using official data feeds.

---

## 🚀 Features (Planned)

- ✅ Input start and end location via map or text search
- ✅ Show real-time public transit routes (bus, Luas, DART) between the two points
- ✅ Display all live departure times within the next 60 minutes
- ✅ Interactive map view (optional)
- ✅ Minimal, responsive UI
- ✅ Deployable as a public web app

---

## 🧱 Tech Stack

| Layer        | Tool / Framework                   |
|--------------|------------------------------------|
| Frontend     | React + Google Maps JavaScript API |
| Backend      | Node.js + Express                  |
| Real-Time Data | GTFS + GTFS-RT (National Transport Authority) |
| Mapping      | Google Maps, Places API, Directions API |
| Hosting      | Vercel (frontend), Render (backend) |

---

## 📦 Milestones & Timeline

| Week | Milestone                                              |
|------|--------------------------------------------------------|
| 1    | ✅ Project setup, repo, README, planning                |
| 1-2  | Setup React frontend and Google Maps autocomplete input |
| 2-3  | Backend: fetch and parse GTFS static data              |
| 3-4  | Integrate GTFS-RT (real-time transit data)             |
| 4-5  | Build route-matching logic between start and end points|
| 5-6  | Connect frontend to backend, display routes and times  |
| 6-7  | Add map visualization, polish UI, error handling       |
| 8    | Deploy live site and write project documentation       |

---

## 🔌 APIs Used

- [Google Maps Platform](https://developers.google.com/maps)
  - Maps JavaScript API
  - Places Autocomplete API
  - Directions API
- [NTA GTFS & GTFS-RT Feed]([https://data.smartdublin.ie/dataset/national-public-transport-data](https://developers.google.com/transit/gtfs-realtime))

---

## ⚙️ Setup Instructions (To be filled later)

_This section will include step-by-step instructions for local development once initial setup is complete._

---

## 📄 License

MIT License (or update depending on preference)

---

## ✍️ Author

Created by [Your Name] as part of an internship project initiative.
