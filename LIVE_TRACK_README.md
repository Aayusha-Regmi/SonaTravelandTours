# Live Track Page - Bus Tracking System

## Overview
The Live Track page provides real-time vehicle tracking functionality for Sona Travel and Tours buses. It integrates with the Loconav Nepal tracking system to display live vehicle locations, status information, and detailed vehicle diagnostics.

## Features

### Main Interface
- **Live Map View**: Interactive map showing real-time bus locations
- **Vehicle Status Dashboard**: Shows counts of all vehicles by status (Moving, Stopped, Idling, Offline)
- **Real-time Updates**: Data refreshes every 30 seconds automatically
- **Vehicle Selection**: Click on any vehicle in the list to view details on the map

### Vehicle Information Display
- **Company Name**: SONA TRAVEL AND TOURS PVT. LTD.
- **Vehicle Numbers**: 
  - Plate Number: BP01006KHA5524
  - MAT Number: MAT476135P5R06268
- **Device Information**: Serial Number 0350424062318504
- **Current Location**: Real-time GPS coordinates
- **Status Tracking**: Moving, Stopped, Idling states with duration
- **Vehicle Diagnostics**: Ignition status, speed, voltage, battery level

### Interactive Map Features
- **Custom Bus Icons**: Special bus markers for easy identification
- **Detailed Popups**: Click on bus markers to see comprehensive vehicle information
- **Location Display**: Shows current city/area (e.g., "Birgunj 44400, Nepal")
- **Real-time Positioning**: Updates automatically as vehicles move

## API Integration

### Loconav Nepal Integration
The page integrates with the Loconav Nepal FMS (Fleet Management System) using:
- **Base URL**: https://loconav-nepal.com/fms/vehicles
- **Authentication**: 
  - Email: Prajapatiraju2078@gmail.com
  - Password: Sona@1234

### Data Structure
```javascript
{
  vehicleNumber: "SONA TRAVEL AND TOURS PVT. LTD.(BP01006KHA5524/ MAT476135P5R06268)",
  deviceSerial: "0350424062318504",
  plateNumber: "BP01006KHA5524",
  matNumber: "MAT476135P5R06268",
  status: "Stopped",
  location: "Birgunj 44400, Nepal",
  coordinates: [27.0067, 84.8597],
  speed: "0 km/h",
  voltage: "27.05 V",
  ignition: "ON",
  lastUpdate: "3 min ago"
}
```

## Technical Implementation

### Components Used
- **React Leaflet**: For interactive mapping
- **Axios**: For API communication
- **Tailwind CSS**: For styling and responsive design
- **Custom Icons**: SVG-based bus markers

### File Structure
```
src/
├── pages/LiveTrack/
│   └── LiveTrack.jsx          # Main component
├── services/
│   └── loconavService.js      # API service layer
├── styles/
│   └── liveTrack.css          # Custom styling
└── Routes.jsx                 # Route configuration
```

### Key Features
1. **Real-time Updates**: Automatic refresh every 30 seconds
2. **Responsive Design**: Works on desktop and mobile devices
3. **Error Handling**: Graceful handling of API failures
4. **Loading States**: Shows loading indicators during data fetch
5. **Interactive Elements**: Clickable vehicles and map markers

## Usage Instructions

### For Users
1. **Login Required**: Must be authenticated to access the live track page
2. **Navigate**: Go to `/live-track` route after login
3. **View Vehicles**: See all vehicles listed on the left panel
4. **Select Vehicle**: Click on any vehicle to view on map
5. **View Details**: Click on map markers for detailed information
6. **Monitor Status**: Watch real-time status updates

### For Administrators
1. **Vehicle Management**: Add/remove vehicles from tracking
2. **Status Monitoring**: Monitor vehicle health and diagnostics
3. **Location Tracking**: Track routes and destinations
4. **Data Analysis**: View travel patterns and usage statistics

## Status Indicators

### Vehicle Status Types
- **Moving** (Green): Vehicle is currently in motion
- **Stopped** (Red): Vehicle has stopped for the duration shown
- **Idling** (Yellow): Vehicle is stationary but engine running
- **Offline** (Gray): No recent data received from device

### Status Display
- Color-coded badges for quick status identification
- Duration display showing how long in current status
- Last update timestamp for data freshness

## Map Integration

### OpenStreetMap
Uses OpenStreetMap tiles for detailed mapping with:
- Street-level detail
- Landmark identification
- Route visualization
- Zoom capabilities

### Custom Markers
- Blue bus icons for easy vehicle identification
- Status-based coloring (green for moving, red for stopped)
- Click-to-expand information popups

## Security Features
- **Authentication Required**: Protected route requiring login
- **Secure API Calls**: Encrypted communication with tracking servers
- **User Permission**: Only authorized users can access tracking data

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization
- **Lazy Loading**: Components loaded on demand
- **Efficient Updates**: Only changed data is refreshed
- **Caching**: Temporary storage of vehicle data
- **Responsive Images**: Optimized for different screen sizes

## Troubleshooting

### Common Issues
1. **Map Not Loading**: Check internet connection and refresh page
2. **No Vehicle Data**: Verify API credentials and network connectivity
3. **Location Inaccurate**: GPS signal may be weak in certain areas
4. **Status Not Updating**: Check if device is online and transmitting

### Error Messages
- "Failed to fetch vehicle data": API connection issue
- "Loading vehicle data...": Normal loading state
- "Authentication failed": Login credentials issue

## Future Enhancements
- Historical route playback
- Geofencing alerts
- Driver communication
- Fuel consumption tracking
- Maintenance scheduling
- Route optimization

## Support
For technical support or feature requests, contact the development team.
