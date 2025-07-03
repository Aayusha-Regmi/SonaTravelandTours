# Live Track Bus Search Feature - Test Guide

## Overview
The Live Track page now includes comprehensive search functionality that allows users to search for buses by:
1. **Bus Number** - Search by plate number, MAT number, or device ID
2. **Ticket Number** - Search by ticket number to find the associated bus

## Search Functionality

### Bus Number Search
Users can search for buses using:
- **Plate Number**: BP01006KHA5524, BP02007KHA5525, BP03008KHA5526
- **MAT Number**: MAT476135P5R06268, MAT476135P5R06269, MAT476135P5R06270
- **Device ID**: 0350424062318504, 0350424062318505, 0350424062318506
- **Partial matches**: Users can type partial numbers (e.g., "BP01" or "5524")

### Ticket Number Search
Users can search for buses using ticket numbers:
- **Standard Tickets**: TKT001, TKT002, TKT003, TKT004, TKT005, TKT006
- **SONA Tickets**: SONA001, SONA002, SONA003
- **MAT Tickets**: MAT476135P5R06268, MAT476135P5R06269, MAT476135P5R06270

## Test Data

### Bus Fleet
1. **SONA TRAVEL AND TOURS PVT. LTD.**
   - Plate: BP01006KHA5524
   - MAT: MAT476135P5R06268
   - Status: Stopped
   - Route: Kathmandu - Pokhara

2. **SONA TRAVEL BUS 02**
   - Plate: BP02007KHA5525
   - MAT: MAT476135P5R06269
   - Status: Moving
   - Route: Kathmandu - Chitwan

3. **SONA TRAVEL BUS 03**
   - Plate: BP03008KHA5526
   - MAT: MAT476135P5R06270
   - Status: Idling
   - Route: Kathmandu - Pokhara

### Ticket Mapping
| Ticket Number | Bus Number | Route | Seat |
|---------------|------------|-------|------|
| TKT001 | BP01006KHA5524 | Kathmandu-Pokhara | A1 |
| TKT002 | BP01006KHA5524 | Kathmandu-Pokhara | A2 |
| TKT003 | BP01006KHA5524 | Kathmandu-Pokhara | B1 |
| TKT004 | BP02007KHA5525 | Kathmandu-Chitwan | A1 |
| TKT005 | BP02007KHA5525 | Kathmandu-Chitwan | A2 |
| TKT006 | BP03008KHA5526 | Kathmandu-Pokhara | VIP1 |
| SONA001 | BP01006KHA5524 | Kathmandu-Pokhara | A3 |
| SONA002 | BP02007KHA5525 | Kathmandu-Chitwan | B2 |
| SONA003 | BP03008KHA5526 | Kathmandu-Pokhara | VIP2 |

## How to Test

### 1. Bus Number Search
1. Go to `/live-track` page
2. Click on "Bus Number" tab (should be selected by default)
3. Type any of the following in the search box:
   - `BP01` (should find first bus)
   - `5525` (should find second bus)
   - `MAT476135P5R06270` (should find third bus)
4. Click "Search" or press Enter
5. Verify the results show the matching bus(es)

### 2. Ticket Number Search
1. Go to `/live-track` page
2. Click on "Ticket Number" tab
3. Type any of the following ticket numbers:
   - `TKT001` (should find first bus)
   - `TKT004` (should find second bus)
   - `SONA003` (should find third bus)
4. Click "Search" or press Enter
5. Verify the search results show the associated bus
6. Check that the search info shows "Ticket linked to bus"

### 3. Search Error Cases
1. Search for non-existent bus number: `INVALID123`
2. Search for non-existent ticket: `INVALID001`
3. Verify error messages are displayed appropriately

### 4. Clear Search
1. After any search, click the "X" button in the search input
2. Or click "Clear search" link when no results are found
3. Verify all vehicles are shown again

## UI Features

### Search Interface
- **Toggle buttons**: Easy switching between Bus Number and Ticket Number search
- **Dynamic placeholder**: Changes based on search type
- **Clear button**: X button appears when there's text in the search box
- **Search button**: Disabled when empty, shows loading state
- **Real-time feedback**: Shows search progress and results

### Search Results Display
- **Results counter**: Shows number of matching vehicles
- **Search info box**: Displays search query, type, and additional info
- **Auto-selection**: Automatically selects the first matching vehicle
- **Error handling**: Shows appropriate error messages for failed searches

### Visual Indicators
- **Active search type**: Highlighted toggle button
- **Loading state**: Button shows "Searching..." during search
- **Success feedback**: Green checkmark and result count
- **Error feedback**: Red X and error message
- **Ticket link indicator**: Special message for ticket searches

## Notes for Developers

### API Integration
- The search functionality is currently using mock data
- The `searchByTicketNumber` method simulates a 500ms API delay
- Error handling is implemented for both search types
- The service can be easily extended to use real API endpoints

### Performance Considerations
- Search is performed on the client side for mock data
- Real API integration would require server-side search
- Debouncing can be added for real-time search (currently manual)

### Extensibility
- Easy to add new search types (e.g., route, driver name)
- Additional filters can be added to the search UI
- Search history could be implemented
- Advanced search with multiple criteria is possible

## Browser Testing
The Live Track page with search functionality is accessible at:
- **Local**: http://localhost:4029/#/live-track
- **Network**: http://192.168.1.11:4029/#/live-track

The page should load with:
- 3 buses displayed in the vehicle list
- Search interface with Bus Number selected by default
- Vehicle statistics showing: 3 total, 1 moving, 1 stopped, 1 idling
- Interactive map with bus markers
- Responsive design for mobile and desktop
