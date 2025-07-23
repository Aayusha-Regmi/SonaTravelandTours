import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/liveTrack.css';
import L from 'leaflet';
import loconavService from '../../services/loconavService';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import FloatingActionBar from '../../components/common/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgMTZIMjBWOEg0VjE2WiIgZmlsbD0iIzMzNzNEQyIgc3Ryb2tlPSIjMzM3M0RDIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iNyIgY3k9IjE5IiByPSIyIiBmaWxsPSIjMzM3M0RDIi8+CjxjaXJjbGUgY3g9IjE3IiBjeT0iMTkiIHI9IjIiIGZpbGw9IiMzMzczREMiLz4KPHBhdGggZD0iTTQgOFY2QzQgNS40NDc3MiA0LjQ0NzcyIDUgNSA1SDE5QzE5LjU1MjMgNSAyMCA1LjQ0NzcyIDIwIDZWOCIgZmlsbD0iIzMzNzNEQyIvPgo8L3N2Zz4K',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const LiveTrack = () => {
  const { isVisible, socialActions } = useSocialActions();
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleStats, setVehicleStats] = useState({
    totalVehicles: 1,
    moving: 0,
    stopped: 1,
    idling: 0,
    offline: 0
  });

  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('busNumber'); // 'busNumber' or 'ticketNumber'
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [showVehicleList, setShowVehicleList] = useState(false); // For mobile toggle

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        
        // Get vehicle data from Loconav service
        const data = await loconavService.getVehicleData();
        const stats = await loconavService.getVehicleStats();
        
        setVehicleData(data);
        setVehicles(data);
        setFilteredVehicles(data);
        setSelectedVehicle(data[0]); // Select first vehicle by default
        setVehicleStats(stats);
        setLoading(false);
        
      } catch (err) {
        setError('Failed to fetch vehicle data');
        setLoading(false);
      }
    };

    fetchVehicleData();
    
    // Set up interval to update data every 30 seconds
    const interval = setInterval(fetchVehicleData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setFilteredVehicles(vehicles);
      setSearchResults(null);
      return;
    }

    setLoading(true);
    try {
      let results = [];
      
      if (searchType === 'busNumber') {
        // Search by bus number/plate number
        results = vehicles.filter(vehicle => 
          vehicle.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.matNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.deviceId.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (searchType === 'ticketNumber') {
        // Search by ticket number (simulate API call)
        try {
          const ticketData = await loconavService.searchByTicketNumber(searchQuery);
          if (ticketData && ticketData.busNumber) {
            results = vehicles.filter(vehicle => 
              vehicle.plateNumber === ticketData.busNumber ||
              vehicle.matNumber === ticketData.busNumber
            );
          }
        } catch (error) {
          console.error('Ticket search failed:', error);
          // Fallback: show no results for invalid ticket
          results = [];
        }
      }

      setFilteredVehicles(results);
      setSearchResults({
        query: searchQuery,
        type: searchType,
        count: results.length
      });
      
      // Auto-select first result if available
      if (results.length > 0) {
        setSelectedVehicle(results[0]);
      }
      
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults({
        query: searchQuery,
        type: searchType,
        count: 0,
        error: 'Search failed. Please try again.'
      });
    }
    setLoading(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredVehicles(vehicles);
    setSearchResults(null);
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    // Close mobile vehicle list when vehicle is selected
    if (window.innerWidth < 1280) {
      setShowVehicleList(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'moving':
        return 'text-green-600 bg-green-100';
      case 'stopped':
        return 'text-red-600 bg-red-100';
      case 'idling':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading vehicle data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Existing Header Component */}
      <Header />
      
      {/* Live Track Content - Added top margin to prevent header overlay */}
      <div className="mt-16 sm:mt-20 pt-4 sm:pt-6 px-2 sm:px-4 lg:px-8">
        <div className="bg-white/70 backdrop-blur-md shadow-xl border border-white/20 rounded-xl sm:rounded-2xl">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Live Track</h1>
                    <div className="text-xs sm:text-sm text-gray-600">All Vehicles</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="hidden sm:block text-sm text-gray-600 bg-white/50 px-3 py-1 rounded-full whitespace-nowrap">
                  Geofences: <span className="font-medium">All</span>
                </div>
                {/* Mobile Vehicle List Toggle */}
                <button
                  onClick={() => setShowVehicleList(!showVehicleList)}
                  className="xl:hidden flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>{showVehicleList ? 'Hide' : 'Show'} Vehicles</span>
                </button>
                <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-lg sm:rounded-xl transition-all duration-200 flex-shrink-0" title="Search">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-lg sm:rounded-xl transition-all duration-200 flex-shrink-0" title="Filter">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-lg sm:rounded-xl transition-all duration-200 flex-shrink-0" title="Download">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button className="hidden sm:block p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-xl transition-all duration-200" title="Menu">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button className="hidden sm:block p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-xl transition-all duration-200" title="Settings">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Status Bar */}
      <div className="mt-4 sm:mt-6 mx-2 sm:mx-4 lg:mx-8">
        <div className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl sm:rounded-2xl shadow-lg">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 py-3 sm:py-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">All</span>
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">{vehicleStats.totalVehicles}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">Moving</span>
                  <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">{vehicleStats.moving}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">Stopped</span>
                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">{vehicleStats.stopped}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">Idling</span>
                  <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">{vehicleStats.idling}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate">Device Offline</span>
                  <span className="bg-gradient-to-r from-gray-500 to-gray-600 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">{vehicleStats.offline}</span>
                </div>
              </div>
              <div className="text-xs text-gray-600 flex items-center bg-white/50 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                <span className="mr-1 sm:mr-2">⚠️</span>
                <span className="truncate">Data updated few seconds ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 min-h-[50vh] sm:h-[calc(100vh-300px)]">
          {/* Vehicle List - Mobile Overlay / Desktop Sidebar */}
          <div className={`xl:col-span-1 bg-white/70 backdrop-blur-md border border-white/30 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden order-2 xl:order-1 ${
            showVehicleList 
              ? 'xl:relative fixed inset-x-2 top-24 bottom-20 z-50 xl:z-auto' 
              : 'hidden xl:block'
          }`}>
            {/* Mobile Close Button */}
            {showVehicleList && (
              <button
                onClick={() => setShowVehicleList(false)}
                className="xl:hidden absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-gray-700 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50/80 to-gray-100/80 border-b border-white/20">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">All Vehicles</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Results: {filteredVehicles.length} Vehicle{filteredVehicles.length !== 1 ? 's' : ''}</p>
            </div>
            
            {/* Search Section */}
            <div className="p-4 sm:p-6 border-b border-white/20 bg-white/50">
              <div className="space-y-3 sm:space-y-4">
                {/* Search Type Toggle */}
                <div className="flex space-x-1 sm:space-x-2">
                  <button
                    onClick={() => setSearchType('busNumber')}
                    className={`flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all duration-200 font-medium ${
                      searchType === 'busNumber'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'bg-white/70 text-gray-700 hover:bg-white/90 border border-white/30'
                    }`}
                  >
                    Bus Number
                  </button>
                  <button
                    onClick={() => setSearchType('ticketNumber')}
                    className={`flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all duration-200 font-medium ${
                      searchType === 'ticketNumber'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'bg-white/70 text-gray-700 hover:bg-white/90 border border-white/30'
                    }`}
                  >
                    Ticket Number
                  </button>
                </div>
                
                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={searchType === 'busNumber' ? 'Search by bus number...' : 'Search by ticket number...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/60 backdrop-blur-sm placeholder-gray-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-2 sm:right-3 top-2 sm:top-3 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  disabled={!searchQuery.trim() || loading}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg font-medium"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
                
                {/* Search Results Info */}
                {searchResults && (
                  <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/30">
                    <div className="text-xs sm:text-sm text-gray-700">
                      {searchResults.error ? (
                        <span className="text-red-600">❌ {searchResults.error}</span>
                      ) : (
                        <span>
                          🔍 Found {searchResults.count} result{searchResults.count !== 1 ? 's' : ''} for "{searchResults.query}"
                          {searchResults.type === 'ticketNumber' && searchResults.count > 0 && (
                            <span className="block mt-1 text-blue-600">
                              📍 Ticket linked to bus
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="overflow-y-auto h-64 sm:h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                <div 
                  key={vehicle.id}
                  className={`p-3 sm:p-4 border-b border-white/20 cursor-pointer transition-all duration-200 hover:bg-white/60 ${
                    selectedVehicle?.id === vehicle.id 
                      ? 'bg-gradient-to-r from-blue-50/80 to-blue-100/80 border-l-4 border-l-blue-500' 
                      : 'border-l-4 border-l-transparent'
                  }`}
                  onClick={() => handleVehicleSelect(vehicle)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{vehicle.name}</h4>
                      <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <span className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                            {vehicle.status}: {vehicle.duration}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 bg-white/50 px-2 py-1 rounded-md sm:rounded-lg">
                          Today: {vehicle.distance}
                        </div>
                        <div className="text-xs text-gray-500">
                          Last data: {vehicle.lastUpdate}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1 sm:space-y-2 ml-2 sm:ml-3">
                      <button className="p-1 sm:p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md sm:rounded-lg transition-all duration-200">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                      <button className="p-1 sm:p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md sm:rounded-lg transition-all duration-200">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-2 sm:mt-3 flex items-center text-xs sm:text-sm text-gray-600 bg-white/40 px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{vehicle.location}</span>
                  </div>

                  {/* Vehicle Details */}
                  <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                    <div className="flex justify-between bg-white/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg">
                      <span className="text-gray-600">ON</span>
                      <span className="font-medium text-gray-800">{vehicle.ignition}</span>
                    </div>
                    <div className="flex justify-between bg-white/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg">
                      <span className="text-gray-600">0 km/h</span>
                      <span className="font-medium text-gray-800">Speed</span>
                    </div>
                    <div className="flex justify-between bg-white/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg">
                      <span className="text-gray-600">27.05 V</span>
                      <span className="font-medium text-gray-800">Battery</span>
                    </div>
                    <div className="flex justify-between bg-white/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg">
                      <span className="text-gray-600">Voltage</span>
                      <span className="font-medium text-gray-800">{vehicle.voltage}</span>
                    </div>
                  </div>
                </div>
              ))
              ) : (
                <div className="p-4 sm:p-6 text-center text-gray-500">
                  <div className="text-xs sm:text-sm">
                    {searchResults ? 'No vehicles found for your search.' : 'No vehicles available.'}
                  </div>
                  {searchResults && (
                    <button
                      onClick={clearSearch}
                      className="mt-2 text-xs text-blue-600 hover:underline"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Map Container */}
          <div className="xl:col-span-3 bg-white/70 backdrop-blur-md border border-white/30 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden relative flex flex-col order-1 xl:order-2">
            {/* Map Header */}
            <div className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 border-b border-white/20 px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Live Map View</h3>
                    <div className="flex items-center space-x-1 sm:space-x-2 mt-0.5 sm:mt-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs sm:text-sm text-gray-600">Real-time tracking active</span>
                    </div>
                  </div>
                </div>
                {selectedVehicle && (
                  <div className="flex items-center space-x-1 sm:space-x-2 bg-white/50 px-2 sm:px-3 py-1 rounded-full">
                    <span className="text-xs sm:text-sm text-gray-600">Currently tracking:</span>
                    <span className="text-xs sm:text-sm font-semibold text-blue-600 truncate">{selectedVehicle.name}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto">
                <button 
                  onClick={() => window.open('https://sipradi.trackgpsfleet.com/v2/track-a-day/c78a54ab1e?locale=en', '_blank')}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg font-medium whitespace-nowrap"
                >
                  External Live Track
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-lg sm:rounded-xl transition-all duration-200" title="Fullscreen">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-lg sm:rounded-xl transition-all duration-200" title="Center Map">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Map */}
            <div className="flex-1 min-h-[300px] sm:min-h-[400px]">
              <MapContainer
                center={selectedVehicle?.coordinates || [27.0067, 84.8597]}
                zoom={13}
                className="h-full w-full"
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {selectedVehicle && (
                  <Marker 
                    position={selectedVehicle.coordinates}
                    icon={busIcon}
                  >
                    <Popup className="vehicle-popup">
                      <div className="p-0 min-w-[280px] sm:min-w-[320px] bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl">
                          <h4 className="font-bold text-base sm:text-lg">SONA TRAVEL AND TOURS PVT. LTD.</h4>
                          <p className="text-blue-100 text-xs sm:text-sm font-medium">BP01006KHA5524</p>
                        </div>
                        
                        {/* Content */}
                        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                          <div className="text-xs sm:text-sm text-gray-700 bg-gray-50/80 px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl">
                            <strong>MAT476135P5R06268</strong>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                            <div className="bg-blue-50/70 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                              <span className="text-blue-600 font-medium">Trip:</span>
                              <div className="font-semibold text-gray-800 text-xs sm:text-sm">Not Assigned</div>
                            </div>
                            <div className="bg-green-50/70 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                              <span className="text-green-600 font-medium">Consignor:</span>
                              <div className="font-semibold text-gray-800 text-xs sm:text-sm">Not Assigned</div>
                            </div>
                            <div className="bg-purple-50/70 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                              <span className="text-purple-600 font-medium">Driver:</span>
                              <div className="font-semibold text-gray-800 text-xs sm:text-sm">Not Assigned</div>
                            </div>
                            <div className="bg-red-50/70 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                              <span className="text-red-600 font-medium">Status:</span>
                              <div className="font-semibold text-red-600 text-xs sm:text-sm">Stopped</div>
                            </div>
                          </div>
                          
                          <div className="border-t pt-2 mt-2">
                            <div className="text-xs text-gray-600 space-y-1">
                              <div className="flex justify-between">
                                <span>Last Update:</span>
                                <span>3 min ago</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Speed:</span>
                                <span>0 km/h</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Voltage:</span>
                                <span>27.05 V</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="bg-gray-50 p-2 rounded-b-lg text-xs text-gray-600">
                          <div className="flex items-center justify-between">
                            <span className="truncate">📍 Birgunj 44400, Nepal</span>
                            <div className="flex space-x-2 ml-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                              </button>
                              <button className="text-blue-600 hover:text-blue-800">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>

            {/* Map Footer */}
            <div className="bg-white/60 backdrop-blur-sm border-t border-white/30 px-3 sm:px-6 py-2 sm:py-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center space-x-1 sm:space-x-2 bg-white/50 px-2 sm:px-3 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Real-time tracking active</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 bg-white/50 px-2 sm:px-3 py-1 rounded-full">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center space-x-1 sm:space-x-2 bg-white/50 px-2 sm:px-3 py-1 rounded-full">
                    <span className="text-gray-600">Zoom:</span>
                    <span className="font-medium text-gray-800">13</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 bg-white/50 px-2 sm:px-3 py-1 rounded-full">
                    <span className="text-gray-600">Coordinates:</span>
                    <span className="font-medium text-gray-800 text-xs">
                      {selectedVehicle ? 
                        `${selectedVehicle.coordinates[0].toFixed(4)}, ${selectedVehicle.coordinates[1].toFixed(4)}` : 
                        '27.0067, 84.8597'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Existing Footer Component */}
      <Footer />
      <FloatingActionBar
        isVisible={isVisible}
        socialActions={socialActions}
      />
    </div>
  );
};

export default LiveTrack;
