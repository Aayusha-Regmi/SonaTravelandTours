// API Configuration
const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL;
const BUS_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// API Endpoints
export const API_URLS = {
  AUTH: {
    LOGIN: `${AUTH_API_BASE_URL}${import.meta.env.VITE_AUTH_LOGIN_ENDPOINT}`,
    REGISTER: `${AUTH_API_BASE_URL}${import.meta.env.VITE_AUTH_REGISTER_ENDPOINT}`,
    SEND_OTP: `${AUTH_API_BASE_URL}${import.meta.env.VITE_AUTH_SEND_OTP_ENDPOINT}`,
    VERIFY_OTP: `${AUTH_API_BASE_URL}${import.meta.env.VITE_AUTH_VERIFY_OTP_ENDPOINT}`,
    RESEND_OTP: `${AUTH_API_BASE_URL}${import.meta.env.VITE_AUTH_RESEND_OTP_ENDPOINT}`,
  },
  BUS: {
    SEARCH: `${BUS_API_BASE_URL}${import.meta.env.VITE_BUS_SEARCH_ENDPOINT}`,
    DETAILS: `${BUS_API_BASE_URL}${import.meta.env.VITE_BUS_SEAT_DETAILS_ENDPOINT}${`?all=true`}`,
  },
  PROFILE: {
    GET: `${BUS_API_BASE_URL}/profile`,
    UPDATE: `${BUS_API_BASE_URL}/profile`,
    UPDATE_PASSWORD: `${BUS_API_BASE_URL}/update-password`,
    UPLOAD_AVATAR: `${BUS_API_BASE_URL}/profile/avatar`,
    CHECK_EMAIL: `${BUS_API_BASE_URL}/check-email`,
  },
  BOOKINGS: {
    USER_BOOKINGS: `${BUS_API_BASE_URL}/bookings`,
  },
  COUPONS:{
    GET_COUPONS: `${BUS_API_BASE_URL}${import.meta.env.VITE_GET_ALL_COUPONS}`,
  }
};

export default API_URLS;
