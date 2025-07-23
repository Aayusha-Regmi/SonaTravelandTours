/**
 * Weather Service
 * Direct API calls bypassing HTTP interceptor for external APIs
 */

// Store original fetch before interceptor overwrites it
const originalFetch = window.fetch;

class WeatherService {
  constructor() {
    this.googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyASvLhW9AUNMx90pTe4bx-Ljzq73HMiFfs';
  }

  /**
   * Direct fetch that bypasses interceptor
   * @param {string} url 
   * @param {Object} options 
   * @returns {Promise<Response>}
   */
  async directFetch(url, options = {}) {
    // Use original fetch to bypass interceptor
    return originalFetch(url, options);
  }

  /**
   * Get current position using Geolocation API
   * @returns {Promise<GeolocationPosition>}
   */
  async getCurrentPosition() {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by this browser.');
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes cache
        }
      );
    });
  }

  /**
   * Reverse geocode coordinates to get city name
   * @param {number} latitude 
   * @param {number} longitude 
   * @returns {Promise<string>}
   */
  async reverseGeocode(latitude, longitude) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.googleMapsApiKey}`;
      const response = await this.directFetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        
        // Look for locality (city) first, then administrative_area_level_2 (district)
        const cityComponent = addressComponents.find(component => 
          component.types.includes('locality') || 
          component.types.includes('administrative_area_level_2')
        );
        
        if (cityComponent) {
          return cityComponent.long_name;
        }
      }
      
      return 'Unknown Location';
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return 'Unknown Location';
    }
  }

  /**
   * Geocode city name to get coordinates
   * @param {string} cityName 
   * @returns {Promise<{lat: number, lng: number}>}
   */
  async geocodeCity(cityName) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${this.googleMapsApiKey}`;
      const response = await this.directFetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return data.results[0].geometry.location;
      }
      
      throw new Error('City not found');
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  }

  /**
   * Get weather data from Open Meteo API
   * @param {number} latitude 
   * @param {number} longitude 
   * @returns {Promise<Object>}
   */
  async getWeatherData(latitude, longitude) {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
      const response = await this.directFetch(url);
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error('Weather API error:', error);
      throw error;
    }
  }

  /**
   * Map WMO weather codes to readable conditions
   * @param {number} code 
   * @returns {string}
   */
  getWeatherCondition(code) {
    if (code === 0) return 'clear sky';
    if (code <= 3) return 'partly cloudy';
    if (code <= 48) return 'foggy';
    if (code <= 67) return 'rainy';
    if (code <= 77) return 'snowy';
    if (code <= 82) return 'shower';
    if (code <= 99) return 'thunderstorm';
    return 'unknown';
  }

  /**
   * Get weather by current location
   * @returns {Promise<{temperature: string, location: string, description: string}>}
   */
  async getWeatherByLocation() {
    try {
      // Get current position
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;

      // Get city name and weather data in parallel
      const [cityName, weatherData] = await Promise.all([
        this.reverseGeocode(latitude, longitude),
        this.getWeatherData(latitude, longitude)
      ]);

      return {
        temperature: `${Math.round(weatherData.current_weather.temperature)}°C`,
        location: cityName,
        description: this.getWeatherCondition(weatherData.current_weather.weathercode)
      };
    } catch (error) {
      console.error("Error getting location or weather:", error);
      
      // Fallback to Kathmandu if location access fails
      try {
        const location = await this.geocodeCity('Kathmandu');
        const weatherData = await this.getWeatherData(location.lat, location.lng);
        
        return {
          temperature: `${Math.round(weatherData.current_weather.temperature)}°C`,
          location: 'Kathmandu',
          description: this.getWeatherCondition(weatherData.current_weather.weathercode)
        };
      } catch (fallbackError) {
        console.error("Fallback weather fetch failed:", fallbackError);
        
        // Final fallback with default values
        return {
          temperature: '25°C',
          location: 'Kathmandu',
          description: 'partly cloudy'
        };
      }
    }
  }
}

// Export singleton instance
export default new WeatherService();
