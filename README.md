# Sona Travel and Tours - Bus Seat Selection & Booking Platform

A modern, professional React application for seamless bus seat selection, trending offers, and travel booking experiences. Features a beautiful UI/UX, real-time seat management, and dynamic promotional offers.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB.svg)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [API Integration](#api-integration)
- [API and Connections](#api-and-connections)
- [Styling & Design](#styling--design)
- [Contributing](#contributing)
- [License](#license)

## Overview

**Sona Travel and Tours** is a comprehensive React-based platform for bus seat selection and travel booking. It offers:
- Intuitive seat selection with real-time updates
- Trending Offers section with visually distinct, type-based cards (e.g., festival, exclusive, seasonal)
- Responsive design for desktop and mobile
- Modern, professional UI/UX with glassmorphism, gradients, and interactive elements

## Features
- **Dynamic Bus Seat Selection:** Real-time seat availability, selection, and pricing.
- **Trending Offers:** Unique, visually appealing cards for each offer type, including a prominent "1st Time Booking" exclusive offer.
- **Promo Codes & Discounts:** Easy-to-use promo code entry and display.
- **Responsive & Accessible:** Optimized for all devices and accessibility best practices.
- **Modern UI/UX:** Glassmorphism, gradients, animated badges, and clear navigation.

## Technologies Used
- [React 19+](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostCSS](https://postcss.org/)

## Installation

1. **Clone the repository:**
   ```powershell
   git clone <repo-url>
   cd SonaTravelandTours
   ```
2. **Install dependencies:**
   ```powershell
   npm install
   ```
3. **Start the development server:**
   ```powershell
   npm run dev
   ```

## Usage
- Visit `http://localhost:5173` (or as shown in your terminal) after running the dev server.
- Browse trending offers, select your bus, choose seats, and proceed to booking.

## Project Structure
```
SonaTravelandTours/
├── public/                # Static assets (images, icons, manifest)
├── src/
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   ├── Routes.jsx         # App routes
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components (Home, TrendingOffers, etc.)
│   ├── config/            # API and app config
│   ├── contexts/          # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API and business logic
│   ├── styles/            # Tailwind and custom styles
│   └── utils/             # Utility functions
├── package.json           # Project metadata and scripts
├── tailwind.config.js     # Tailwind CSS config
├── vite.config.js         # Vite config
└── README.md              # Project documentation
```

## Component Architecture
- **Header, Footer, Layout:** Common UI wrappers
- **TrendingOffers:** Modern, type-based offer cards with unique backgrounds and badges
- **SeatSelection:** Interactive seat map, selection logic, and pricing
- **Booking Flow:** Step-by-step booking and confirmation

## API Integration
- API endpoints and logic are managed in `src/config/api.js` and `src/services/`
- Easily extendable for real backend integration

## API and Connections

The Sona Travel and Tours platform is designed for easy integration with backend APIs and external services. While the current implementation uses mock data and local state for demonstration, the architecture is ready for real-world connections.

### API Structure
- **API Configuration:**
  - All API endpoints and base URLs are managed in `src/config/api.js` for centralized control.
- **Service Layer:**
  - Business logic and API calls are abstracted in `src/services/`, making it easy to swap mock data for real HTTP requests.
- **Data Fetching:**
  - Components use service functions to fetch, update, and manage data (e.g., seat availability, offers, bookings).

### Extending for Real Backend
- Replace mock service functions with actual HTTP requests using `fetch`, `axios`, or your preferred library.
- Update `api.js` with your backend endpoints and authentication logic if needed.
- Example integration points:
  - **Seat Availability:** Fetch real-time seat data from your backend.
  - **Booking Submission:** Post booking details to your server and handle responses.
  - **Offers & Promotions:** Retrieve current offers dynamically from an API.

### Example Service Function
```js
// src/services/seatService.js
import { API_BASE_URL } from '../config/api';

export async function fetchSeats(busId) {
  const response = await fetch(`${API_BASE_URL}/buses/${busId}/seats`);
  return response.json();
}
```

### Environment Variables
- Store sensitive data (API keys, endpoints) in environment variables using a `.env` file.
- Example: `VITE_API_BASE_URL=https://api.yourdomain.com`

### Third-Party Integrations
- The project can be extended to connect with payment gateways, SMS/email services, or analytics platforms as needed.

For more details, see the code in `src/config/api.js` and `src/services/`.

## Styling & Design
- **Tailwind CSS** for rapid, utility-first styling
- **Glassmorphism, gradients, and custom backgrounds** for offer cards
- **Responsive layouts** for all devices

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.

---

## Developed By

**Sona Consolidate**  
Developed by [Rohit Jha](https://github.com/jrohitofficial) and [Aayusha Regmi](https://github.com/aayusha-regmi)

For more information, visit:
- https://github.com/jrohitofficial
- https://github.com/aayusha-regmi

