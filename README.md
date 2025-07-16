# 🚌 Sona Travel and Tours

A modern, responsive web application for bus booking and travel services built with React.js and Tailwind CSS.

## 👥 Developers

**Developed by:**
- **Rohit Jha** - [LinkedIn](https://www.linkedin.com/in/jrohitofficial/)
- **Aayusha Regmi** - [LinkedIn](https://www.linkedin.com/in/aayusha-regmi/)

## 🌟 Features

### 🎯 Core Features
- **Bus Search & Booking** - Search for buses between Kathmandu and Birgunj
- **One-Way & Two-Way Trips** - Flexible booking options
- **Real-Time Seat Selection** - Interactive seat map for bus selection
- **Secure Payment Gateway** - Multiple payment options including eSewa
- **User Authentication** - Complete login/registration system
- **Responsive Design** - Mobile-first responsive interface
- **Live Bus Tracking** - Real-time location tracking
- **Travel Insurance** - Optional travel insurance coverage

### 📱 User Experience
- **Progressive Web App (PWA)** - App-like experience on mobile devices
- **Dark/Light Theme Support** - Adaptive UI themes
- **Offline Capabilities** - Basic functionality without internet
- **Touch-Optimized** - Enhanced mobile touch interactions
- **Accessibility** - WCAG compliant design

### 🎨 Advanced UI Features
- **Glass Morphism Design** - Modern backdrop blur effects
- **Smooth Animations** - CSS transitions and transforms
- **Interactive Maps** - Leaflet integration for route visualization
- **Toast Notifications** - Real-time user feedback
- **Loading States** - Skeleton loaders and spinners

## 🛠 Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite** - Fast build tool and development server
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing

### Libraries & Tools
- **Axios** - HTTP client for API requests
- **React Leaflet** - Interactive maps
- **React Toastify** - Toast notifications
- **Crypto-JS** - Encryption utilities
- **UUID** - Unique identifier generation
- **Heroicons** - Beautiful SVG icons

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vite PWA Plugin** - Progressive Web App features

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aayusha-Regmi/SonaTravelandTours.git
   cd SonaTravelandTours
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI elements (Button, Input, etc.)
│   ├── layout/          # Layout components (Header, Footer)
│   └── dev/             # Development tools
├── pages/               # Page components
│   ├── Home/            # Homepage with search form
│   ├── SearchResults/   # Bus search results
│   ├── Auth/            # Authentication pages
│   ├── Payment/         # Payment processing
│   └── UserProfile/     # User dashboard
├── services/            # API services
│   └── api.js           # Main API service
├── config/              # Configuration files
│   └── api.js           # API endpoints
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
│   ├── authGuard.js     # Authentication utilities
│   ├── sessionUtils.js  # Session management
│   └── scrollUtils.js   # Scroll behavior
└── styles/              # Global styles
```

## 🔧 Key Implementation Details

### Search Form Component
- **Responsive Dropdown Overlays** - Maximum z-index implementation for proper layering
- **Smart Date Validation** - Prevents invalid date selections
- **Location Filtering** - Dynamic FROM/TO location management
- **Mobile Optimization** - Touch-friendly interface with modal-style dropdowns

### Authentication System
- **JWT Token Management** - Secure token storage and refresh
- **Protected Routes** - Route guards for authenticated pages
- **Session Persistence** - Automatic session restoration
- **Login Flow Debug** - Development debugging tools

### Payment Integration
- **eSewa Gateway** - Nepal's leading payment platform
- **Secure Transactions** - Encrypted payment processing
- **Payment Verification** - Server-side payment confirmation
- **Error Handling** - Comprehensive error management

### State Management
- **React Context** - Global state management
- **Local Storage** - Persistent data storage
- **Session Management** - User session handling

## 🎨 UI/UX Features

### Design System
- **Consistent Color Palette** - Orange primary with neutral grays
- **Typography Scale** - Tailwind's responsive text sizing
- **Spacing System** - 8px grid system
- **Border Radius** - Consistent rounded corners

### Responsive Breakpoints
```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

### Animation Library
- **CSS Transitions** - Smooth hover effects
- **Transform Animations** - Scale and rotate effects
- **Loading Animations** - Spinner and skeleton loaders

## 🔒 Security Features

- **Input Validation** - Client and server-side validation
- **XSS Protection** - Sanitized user inputs
- **HTTPS Enforcement** - Secure data transmission
- **JWT Security** - Token-based authentication

## 🌐 API Integration

### Base URLs
- **Development**: `http://localhost:3000`
- **Production**: `https://api.sonatravels.com`

### Key Endpoints
- `GET /api/routes` - Available bus routes
- `POST /api/search` - Bus search
- `POST /api/booking` - Create booking
- `POST /api/payment` - Process payment

## 📱 PWA Features

- **App Manifest** - Native app-like installation
- **Service Worker** - Offline functionality
- **Push Notifications** - Booking updates
- **App Icons** - Custom app icons for different devices

## 🧪 Development Features

### Debug Tools
- **API Debugger** - Real-time API request monitoring
- **Session Monitor** - Authentication state tracking
- **Console Logging** - Detailed development logs

### Code Quality
- **ESLint Configuration** - Code quality enforcement
- **Prettier Formatting** - Consistent code style
- **Component Documentation** - JSDoc comments

## 📊 Performance Optimizations

- **Code Splitting** - Route-based code splitting
- **Image Optimization** - WebP format support
- **Bundle Analysis** - Build size optimization
- **Lazy Loading** - Component lazy loading

## 🚀 Deployment

### Build Configuration
```bash
# Environment variables
VITE_API_BASE_URL=your_api_url
VITE_ESEWA_MERCHANT_ID=your_merchant_id
```

### Deployment Platforms
- **Vercel** - Recommended for easy deployment
- **Netlify** - Alternative hosting platform
- **AWS S3** - Enterprise hosting solution

## 🐛 Troubleshooting

### Common Issues

1. **Z-index Problems**
   - Ensure maximum z-index values for dropdown overlays
   - Check CSS isolation and contain properties

2. **Authentication Issues**
   - Verify JWT token storage
   - Check API endpoint configuration

3. **Payment Gateway**
   - Confirm eSewa merchant configuration
   - Validate payment callback URLs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, please contact:
- **Rohit Jha** - [LinkedIn](https://www.linkedin.com/in/jrohitofficial/)
- **Aayusha Regmi** - [LinkedIn](https://www.linkedin.com/in/aayusha-regmi/)

---

**© 2025 Sona Travel and Tours. All rights reserved.**