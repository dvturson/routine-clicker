# Routine Clicker

A habit tracking system that bridges physical hardware and a real time web dashboard. 

---

## How It Works

An ESP32 microcontroller listens for a button press and sends a request to Firebase Realtime Database. The web dashboard (GitHub style heatmap calendar) updates in real time without a page reload. Every check-in is logged by date and activity, visible across all devices simultaneously.

```
Button press → ESP32 firmware → Firebase Database → Web / OLED dashboard
```

---

## Features

- GitHub-style heatmap calendar showing the full year
<!-- - Multiple activity tracking — add and remove activities (gym, reading, biking, etc.) from the web UI -->
- Physical button check-in via ESP32 hardware device
- SSD1306 OLED display on the device showing current activity and a hold-to-commit progress bar
- Single click cycles through activities; hold commits the current one
- Physical button and web dashboard stay in sync via Firebase

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Database | Firebase Realtime Database |
| Firmware | C++ on ESP32 (ESP-WROOM-32) |
| Hardware | ESP32, SSD1306 128x64 OLED, tactile push button, breadboard |

---

## Project Structure

```
routine-clicker/
├── frontend/
│   ├── index.html       # dashboard UI
│   ├── style.css        # minimalist black/white styling
│   ├── app.js           # calendar logic, Firebase listeners
│   └── firebase.js      # Firebase config and exports
├── firmware/
│   └── routine_clicker/
│       ├── routine_clicker.ino   # ESP32 firmware
│       └── secrets.example.h    # WiFi + Firebase credentials template
└── docs/
    └── git-workflow.md  # branching and commit guide for contributors
```

---

## Built By

- [Devran Turson](https://github.com/dvturson) — full stack, OLED display, project lead
- [Jean-Luke Orellana](https://github.com/jeanlukeorlla) — hardware, ESP32 firmware
