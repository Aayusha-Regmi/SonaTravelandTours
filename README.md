# Sona Travel and Tours - Bus Seat Selection System

A modern, responsive React-based bus seat selection interface designed for seamless travel booking experiences with professional UX/UI and real-time seat management.

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
- [Styling & Design](#styling--design)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Sona Travel and Tours Bus Seat Selection System** is a comprehensive React application that provides an intuitive interface for customers to select bus seats, view pricing, and proceed with bookings. The system features dynamic seat layouts, real-time availability updates, and a professional user experience optimized for both desktop and mobile devices.

## Features

### Core Functionality
- **Interactive Seat Map**: Visual bus layout with clickable seat selection
- **Real-time Availability**: Dynamic seat status (Available, Booked, Selected)
- **Multi-seat Selection**: Users can select multiple seats simultaneously
- **Price Calculation**: Automatic total price calculation based on selected seats
- **Responsive Design**: Optimized for all device sizes and screen resolutions

### User Experience
- **Professional UI/UX**: Clean, modern interface with smooth animations
- **Visual Feedback**: Color-coded seat status and hover effects
- **Form Validation**: Real-time validation for login and signup forms
- **Progressive Stepper**: Multi-step booking process with clear navigation
- **Loading States**: Smooth transitions and loading indicators

### Business Logic
- **Dynamic Booking**: Seat availability based on bus ID patterns
- **Price Management**: Configurable seat pricing (₹2,000 per seat)
- **Booking Validation**: Prevents selection of already booked seats
- **Bus-specific Data**: Each bus has unique booked seat patterns
- **Mock API Integration**: Simulated booking confirmation system

## Technologies Used

### Frontend Framework
- **React 19** - Latest React with improved rendering and concurrent features
- **React Router DOM** - Client-side routing and navigation
- **JavaScript ES6+** - Modern JavaScript features and syntax

### Styling & UI
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **Custom Components** - Modular, reusable UI components
- **Responsive Design** - Mobile-first approach with breakpoint optimization
- **CSS Animations** - Smooth transitions and hover effects

### Build Tools & Development
- **Vite** - Lightning-fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router** - Declarative routing for React applications

## Prerequisites

- Node.js (v14.x or higher)
- npm or yarn


## Installation

### Prerequisites
- **Node.js** (v16.x or higher)
- **npm** or **yarn** package manager

### Setup Instructions

1. **Clone the repository:**
   ```powershell
   git clone https://github.com/your-username/sona-travel-tours.git
   cd sona-travel-tours
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```powershell
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```powershell
npm run build
# or
yarn build
```

## Usage

### Basic Navigation
1. **Home Page**: Browse available bus routes and schedules
2. **Search Results**: View bus listings with pricing and availability
3. **Seat Selection**: Interactive seat map for choosing preferred seats
4. **Booking Confirmation**: Complete the booking process

### Seat Selection Process
1. Select your departure and destination
2. Choose from available buses
3. Click on available seats in the interactive map
4. Review selected seats and total price
5. Proceed to passenger details and payment

### Key Interactions
- **Hover Effects**: Seats scale and show shadows on hover
- **Selection Feedback**: Selected seats show blue highlighting with checkmarks
- **Validation**: Booked seats are disabled and show visual indicators
- **Responsive Touch**: Touch-friendly for mobile and tablet users

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── BookingStepComponents/
│   │       └── Stepper.jsx
│   └── ui/
│       └── Button.jsx
├── pages/
│   ├── Auth/
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   ├── SearchResults/
│   │   └── ComponentSearch/
│   │       └── BusListings.jsx
│   └── BusSeatSelection/
│       ├── SeatSelection.jsx
│       └── ComponentSeatSelection/
│           └── CardSeatSelection.jsx
├── utils/
│   └── authUtils.js
├── Routes.jsx
├── App.jsx
└── main.jsx
```

## Component Architecture

### Core Components

#### `SeatSelection.jsx`
- **Purpose**: Main seat selection interface
- **Features**: Interactive seat map, price calculation, booking logic
- **State Management**: Manages selected seats, pricing, and availability

#### `BusListings.jsx`
- **Purpose**: Display available buses with details
- **Features**: Bus cards, filtering, navigation to seat selection
- **Integration**: Passes bus data to seat selection component

#### `Stepper.jsx`
- **Purpose**: Progress indicator for booking process
- **Features**: Visual step progression, current step highlighting

### Utility Functions

#### `authUtils.js`
- Form validation logic
- Input sanitization
- Error handling utilities

## API Integration

### Mock API Endpoints
```javascript
// Seat booking simulation
const bookSeats = async (selectedSeats) => {
  // Simulates real API call
  const response = {
    success: true,
    bookedSeats: selectedSeats,
    busId: busId,
    totalPrice: selectedSeats.length * seatPrice,
    bookingId: `BK${Date.now()}`
  };
  return response;
};
```

### Data Flow
1. **Bus Selection**: User selects bus from listings
2. **Seat Generation**: Dynamic seat configuration based on bus ID
3. **Availability Check**: Real-time seat status validation
4. **Booking Confirmation**: Mock API response with booking details

## Styling & Design

### Design System
- **Color Palette**: Professional blue, red, gray, and green scheme
- **Typography**: Consistent font weights and sizes throughout
- **Spacing**: Systematic margin and padding using Tailwind utilities
- **Shadows**: Layered shadow system for depth and hierarchy

### Responsive Breakpoints
```css
/* Mobile First Approach */
sm: 640px    /* Small devices */
md: 768px    /* Medium devices */
lg: 1024px   /* Large devices */
xl: 1280px   /* Extra large devices */
2xl: 1536px  /* 2x large devices */
```

### Animation Guidelines
- **Duration**: 200ms for micro-interactions
- **Easing**: ease-in-out for smooth transitions
- **Hover States**: Scale transforms and shadow increases
- **Loading States**: Skeleton screens and progress indicators

## Contributing

### Development Workflow
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Make your changes** with proper commit messages
4. **Run tests**: `npm test`
5. **Submit a pull request**

### Code Standards
- Follow ESLint configuration
- Use meaningful component and variable names
- Write clear commit messages
- Add comments for complex logic
- Ensure responsive design compatibility

### Commit Message Format
```
type(scope): description

Examples:
feat(seats): add seat selection animation
fix(auth): resolve login validation issue
docs(readme): update installation instructions
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **React Team** for the excellent framework
- **Tailwind CSS** for the utility-first CSS approach
- **Vite** for the blazing-fast development experience
- **Community Contributors** for ongoing improvements

---

**Built with love by the Sona Travel and Tours Development Team**

For questions or support, please contact: [support@sonatraveltours.com](mailto:support@sonatraveltours.com)
