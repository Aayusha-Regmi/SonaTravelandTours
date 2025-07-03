import axios from 'axios';

class LoconavService {
  constructor() {
    this.baseURL = 'https://loconav-nepal.com/fms';
    this.credentials = {
      email: 'Prajapatiraju2078@gmail.com',
      password: 'Sona@1234'
    };
    this.vehicleInfo = {
      vehicleNumber: 'SONA TRAVEL AND TOURS PVT. LTD.(BP01006KHA5524/ MAT476135P5R06268)',
      deviceSerial: '0350424062318504',
      plateNumber: 'BP01006KHA5524',
      matNumber: 'MAT476135P5R06268'
    };

    // Mock ticket data for testing
    this.mockTicketData = {
      'TKT001': { busNumber: 'BP01006KHA5524', route: 'Kathmandu-Pokhara', seatNumber: 'A1' },
      'TKT002': { busNumber: 'BP01006KHA5524', route: 'Kathmandu-Pokhara', seatNumber: 'A2' },
      'TKT003': { busNumber: 'BP01006KHA5524', route: 'Kathmandu-Pokhara', seatNumber: 'B1' },
      'TKT004': { busNumber: 'BP02007KHA5525', route: 'Kathmandu-Chitwan', seatNumber: 'A1' },
      'TKT005': { busNumber: 'BP02007KHA5525', route: 'Kathmandu-Chitwan', seatNumber: 'A2' },
      'TKT006': { busNumber: 'BP03008KHA5526', route: 'Kathmandu-Pokhara', seatNumber: 'VIP1' },
      'SONA001': { busNumber: 'BP01006KHA5524', route: 'Kathmandu-Pokhara', seatNumber: 'A3' },
      'SONA002': { busNumber: 'BP02007KHA5525', route: 'Kathmandu-Chitwan', seatNumber: 'B2' },
      'SONA003': { busNumber: 'BP03008KHA5526', route: 'Kathmandu-Pokhara', seatNumber: 'VIP2' },
      'MAT476135P5R06268': { busNumber: 'BP01006KHA5524', route: 'Kathmandu-Pokhara', seatNumber: 'VIP1' },
      'MAT476135P5R06269': { busNumber: 'BP02007KHA5525', route: 'Kathmandu-Chitwan', seatNumber: 'VIP1' },
      'MAT476135P5R06270': { busNumber: 'BP03008KHA5526', route: 'Kathmandu-Pokhara', seatNumber: 'VIP1' }
    };
  }

  // Create axios instance with default configuration
  createAxiosInstance() {
    const instance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Add request interceptor for authentication
    instance.interceptors.request.use(
      (config) => {
        // Add authentication headers if needed
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          this.authToken = null;
          // Redirect to login or refresh token
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  // Authenticate with Loconav API
  async authenticate() {
    try {
      const axiosInstance = this.createAxiosInstance();
      const response = await axiosInstance.post('/auth/login', {
        email: this.credentials.email,
        password: this.credentials.password
      });

      if (response.data.token) {
        this.authToken = response.data.token;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  }

  // Get vehicle data from Loconav API
  async getVehicleData() {
    try {
      // For now, return mock data directly to avoid CORS and authentication issues
      // In production, you would uncomment the API call below
      
      /*
      // First authenticate if we don't have a token
      if (!this.authToken) {
        const authenticated = await this.authenticate();
        if (!authenticated) {
          throw new Error('Authentication failed');
        }
      }

      const axiosInstance = this.createAxiosInstance();
      const response = await axiosInstance.get('/vehicles', {
        params: {
          deviceSerial: this.vehicleInfo.deviceSerial,
          plateNumber: this.vehicleInfo.plateNumber
        }
      });

      return this.processVehicleData(response.data);
      */
      
      return this.getMockVehicles();
    } catch (error) {
      console.error('Failed to fetch vehicle data:', error);
      
      // Return mock data as fallback
      return this.getMockVehicles();
    }
  }

  // Process and format vehicle data
  processVehicleData(apiData) {
    if (!apiData || !apiData.vehicles) {
      return this.getMockVehicleData();
    }

    const vehicle = apiData.vehicles[0]; // Get first vehicle
    
    return {
      id: vehicle.id || "06268",
      name: vehicle.name || "SONA TRAVEL AN...06268",
      status: vehicle.status || "Stopped",
      duration: vehicle.duration || "34 minutes",
      distance: vehicle.distance || "2975 km",
      lastUpdate: vehicle.lastUpdate || "3 min ago",
      location: vehicle.location || "Birgunj 44400, Nepal",
      coordinates: vehicle.coordinates || [27.0060, 84.8800],
      ignition: vehicle.ignition || "ON",
      speed: vehicle.speed || "0 km/h",
      voltage: vehicle.voltage || "2705 V",
      battery: vehicle.battery || "Vehicle Battery",
      company: this.vehicleInfo.vehicleNumber.split('(')[0].trim(),
      plateNumber: this.vehicleInfo.plateNumber,
      matNumber: this.vehicleInfo.matNumber,
      deviceId: this.vehicleInfo.deviceSerial,
      trip: vehicle.trip || "Not Assigned",
      consignor: vehicle.consignor || "Not Assigned",
      driver: vehicle.driver || "Not Assigned"
    };
  }

  // Get mock vehicle data for testing/fallback
  getMockVehicleData() {
    return {
      id: "06268",
      name: "SONA TRAVEL AN...06268",
      status: "Stopped",
      duration: "34 minutes",
      distance: "207.5 km",
      lastUpdate: "3 min ago",
      location: "Birgunj 44400, Nepal",
      coordinates: [27.0067, 84.8597], // Birgunj coordinates
      ignition: "ON",
      speed: "0 km/h",
      voltage: "27.05 V",
      battery: "Vehicle Battery",
      company: "SONA TRAVEL AND TOURS PVT. LTD.",
      plateNumber: "BP01006KHA5524",
      matNumber: "MAT476135P5R06268",
      deviceId: "0350424062318504",
      trip: "Not Assigned",
      consignor: "Not Assigned",
      driver: "Not Assigned"
    };
  }

  // Get vehicle location history
  async getVehicleHistory(startDate, endDate) {
    try {
      if (!this.authToken) {
        const authenticated = await this.authenticate();
        if (!authenticated) {
          throw new Error('Authentication failed');
        }
      }

      const axiosInstance = this.createAxiosInstance();
      const response = await axiosInstance.get('/vehicles/history', {
        params: {
          deviceSerial: this.vehicleInfo.deviceSerial,
          startDate: startDate,
          endDate: endDate
        }
      });

      return response.data;
    } catch (error) {
      console.error('Failed to fetch vehicle history:', error);
      return [];
    }
  }

  // Get real-time vehicle alerts
  async getVehicleAlerts() {
    try {
      if (!this.authToken) {
        const authenticated = await this.authenticate();
        if (!authenticated) {
          throw new Error('Authentication failed');
        }
      }

      const axiosInstance = this.createAxiosInstance();
      const response = await axiosInstance.get('/vehicles/alerts', {
        params: {
          deviceSerial: this.vehicleInfo.deviceSerial
        }
      });

      return response.data;
    } catch (error) {
      console.error('Failed to fetch vehicle alerts:', error);
      return [];
    }
  }

  // Get vehicle stats
  async getVehicleStats() {
    try {
      const vehicleData = await this.getVehicleData();
      
      // Count vehicles by status
      const stats = {
        totalVehicles: vehicleData.length,
        moving: 0,
        stopped: 0,
        idling: 0,
        offline: 0
      };

      vehicleData.forEach(vehicle => {
        switch (vehicle.status.toLowerCase()) {
          case 'moving':
            stats.moving++;
            break;
          case 'stopped':
            stats.stopped++;
            break;
          case 'idling':
            stats.idling++;
            break;
          case 'offline':
            stats.offline++;
            break;
        }
      });
      
      return stats;
    } catch (error) {
      console.error('Failed to fetch vehicle stats:', error);
      return {
        totalVehicles: 3,
        moving: 1,
        stopped: 1,
        idling: 1,
        offline: 0
      };
    }
  }

  // Search by ticket number
  async searchByTicketNumber(ticketNumber) {
    try {
      // In a real implementation, this would make an API call
      // For now, we'll use mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Search in mock data
      const ticketData = this.mockTicketData[ticketNumber.toUpperCase()];
      
      if (!ticketData) {
        throw new Error(`Ticket number ${ticketNumber} not found`);
      }
      
      return {
        ticketNumber: ticketNumber.toUpperCase(),
        busNumber: ticketData.busNumber,
        route: ticketData.route,
        seatNumber: ticketData.seatNumber,
        status: 'Active'
      };
    } catch (error) {
      console.error('Failed to search by ticket number:', error);
      throw error;
    }
  }

  // Mock multiple vehicles for testing search functionality
  getMockVehicles() {
    return [
      {
        id: 1,
        name: "SONA TRAVEL AND TOURS PVT. LTD.",
        plateNumber: "BP01006KHA5524",
        matNumber: "MAT476135P5R06268",
        deviceId: "0350424062318504",
        coordinates: [27.0067, 84.8597],
        status: "Stopped",
        speed: 0,
        lastUpdate: "2024-01-01T10:30:00Z",
        driver: "Ram Bahadur",
        route: "Kathmandu - Pokhara",
        fuel: "75%",
        voltage: "12.4V",
        temperature: "45°C",
        isOnline: true,
        diagnostics: {
          engineHours: "1234h",
          mileage: "45,678 km",
          batteryLevel: "Good",
          fuelLevel: "75%"
        }
      },
      {
        id: 2,
        name: "SONA TRAVEL BUS 02",
        plateNumber: "BP02007KHA5525",
        matNumber: "MAT476135P5R06269",
        deviceId: "0350424062318505",
        coordinates: [27.7172, 85.3240],
        status: "Moving",
        speed: 45,
        lastUpdate: "2024-01-01T10:30:00Z",
        driver: "Shyam Thapa",
        route: "Kathmandu - Chitwan",
        fuel: "60%",
        voltage: "12.6V",
        temperature: "42°C",
        isOnline: true,
        diagnostics: {
          engineHours: "987h",
          mileage: "32,456 km",
          batteryLevel: "Good",
          fuelLevel: "60%"
        }
      },
      {
        id: 3,
        name: "SONA TRAVEL BUS 03",
        plateNumber: "BP03008KHA5526",
        matNumber: "MAT476135P5R06270",
        deviceId: "0350424062318506",
        coordinates: [28.2096, 83.9856],
        status: "Idling",
        speed: 0,
        lastUpdate: "2024-01-01T10:30:00Z",
        driver: "Hari Gurung",
        route: "Kathmandu - Pokhara",
        fuel: "40%",
        voltage: "12.2V",
        temperature: "50°C",
        isOnline: true,
        diagnostics: {
          engineHours: "2156h",
          mileage: "67,890 km",
          batteryLevel: "Fair",
          fuelLevel: "40%"
        }
      }
    ];
  }
}

export default new LoconavService();
