import { useState, useEffect, useCallback } from 'react';
import loconavService from '../services/loconavService';

export const useVehicleTracking = () => {
  const [vehicleData, setVehicleData] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vehicleStats, setVehicleStats] = useState({
    totalVehicles: 0,
    moving: 0,
    stopped: 0,
    idling: 0,
    offline: 0
  });
  const [lastUpdateTime, setLastUpdateTime] = useState(null);

  const fetchVehicleData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get vehicle data from Loconav service
      const data = await loconavService.getVehicleData();
      const stats = await loconavService.getVehicleStats();
      
      setVehicleData(data);
      setVehicles([data]);
      setVehicleStats(stats);
      setLastUpdateTime(new Date().toISOString());
      setLoading(false);
      
    } catch (err) {
      console.error('Error fetching vehicle data:', err);
      setError('Failed to fetch vehicle data');
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(() => {
    fetchVehicleData();
  }, [fetchVehicleData]);

  useEffect(() => {
    fetchVehicleData();
    
    // Set up interval to update data every 30 seconds
    const interval = setInterval(fetchVehicleData, 30000);
    
    return () => clearInterval(interval);
  }, [fetchVehicleData]);

  const getVehicleHistory = useCallback(async (startDate, endDate) => {
    try {
      const history = await loconavService.getVehicleHistory(startDate, endDate);
      return history;
    } catch (err) {
      console.error('Error fetching vehicle history:', err);
      return [];
    }
  }, []);

  const getVehicleAlerts = useCallback(async () => {
    try {
      const alerts = await loconavService.getVehicleAlerts();
      return alerts;
    } catch (err) {
      console.error('Error fetching vehicle alerts:', err);
      return [];
    }
  }, []);

  return {
    vehicleData,
    vehicles,
    loading,
    error,
    vehicleStats,
    lastUpdateTime,
    refreshData,
    getVehicleHistory,
    getVehicleAlerts
  };
};
