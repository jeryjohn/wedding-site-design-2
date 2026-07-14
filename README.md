# Anish & Anju — Betrothal Invitation Web App

A premium, elegant, and highly interactive digital wedding invitation web application built for the Betrothal ceremony of Anish & Anju.

---

## 🌟 Key Features & Design Details

### 1. Smoky Blue Watercolor Aesthetic
* **Theme & Colors:** Features a curated palette of ice-blue, smoky watercolor washes (`#cde0ed`), rich gold accents (`#b59453`), and deep slate-navy text (`#1e3545`) for maximum contrast and high legibility.
* **Paper-Textured Elements:** Subtle organic textures run across both the outer background wash and the invitation card itself.

### 2. Silhouetted Blessing Illustration (Ephesians Section)
* **Watercolor Look:** The couple blessing illustration (`couple_blessing.png`) is blended directly into the card using CSS `mix-blend-mode: multiply` and a soft opacity of `16%`.
* **Zero Visible Borders:** Utilizes a custom radial-ellipse mask centered at the bottom to fade boundaries out on all sides:
  `radial-gradient(ellipse at 50% 70%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)`
* **Depth & Position:** Placed at the absolute bottom of the card with a gentle `0.3px` blur to keep the illustration in the background, ensuring the centered Ephesians 4:1–3 scripture text remains the primary focal point.

### 3. High Accessibility for All Ages
* **Tap Anywhere to Open:** Optimized for elder guests who might find it difficult to target small buttons. Tapping anywhere on the screen-wide landing page instantly opens the invitation.
* **Responsive Layout:** Designed to scale beautifully across mobile viewports, tablets, and high-resolution monitors.

### 4. Interactive Maps & Location Sharing
* **Custom Leaflet Map:** Displays the venue coordinates with a matching golden marker pin.
* **One-Click Actions:** Includes native "Open in Maps" navigation, "Get Directions" utility, and a web-share button to easily copy and forward the invitation details.

---

## 🛠️ Technology Stack

* **Framework:** Next.js (App Router)
* **Runtime / Engine:** React 19 & Turbopack
* **Styling:** Tailwind CSS & Vanilla CSS
* **Animations:** Framer Motion (blur-reveal page entrance, fade-ins, and scroll-triggered cues)
* **Interactive Map:** Leaflet & React-Leaflet

---

## 🚀 Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## ⚙️ Configuration & Customization

All structural data (names, dates, parents, location queries, and map coordinates) is separated into a single configuration file. To edit or customize the invitation details, update [src/constants/data.ts](file:///Users/jerinjohn/BuildLab/wedding-invite-v2/src/constants/data.ts):

```typescript
export const CONFIG = {
  brideName: "Anju",
  brideParents: "Mathew & Thressiamma",
  groomName: "Anish",
  groomParents: "Joseph & Eliyamma",
  date: "Thursday, July 23, 2026",
  time: "11:30 AM",
  venueName: "St. Michael's Church",
  venueAddress: "24, Church Street, Royapuram, Chennai - 600013",
  mapQuery: "St. Michaels Church, Royapuram, Chennai",
  lat: 13.1114,
  lng: 80.2942
};
```
