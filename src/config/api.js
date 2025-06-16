// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// API Endpoints
export const API_URLS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}${import.meta.env.VITE_AUTH_LOGIN_ENDPOINT}`,
    REGISTER: `${API_BASE_URL}${import.meta.env.VITE_AUTH_REGISTER_ENDPOINT}`,
    SEND_OTP: `${API_BASE_URL}${import.meta.env.VITE_AUTH_SEND_OTP_ENDPOINT}`,
    VERIFY_OTP: `${API_BASE_URL}${import.meta.env.VITE_AUTH_VERIFY_OTP_ENDPOINT}`,
    RESEND_OTP: `${API_BASE_URL}${import.meta.env.VITE_AUTH_RESEND_OTP_ENDPOINT}`,
  }
};

export default API_URLS;
