// API Configuration
const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL || 'https://4g1vzlphwk.execute-api.us-east-1.amazonaws.com';
const BUS_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://6le3z7icgf.execute-api.us-east-1.amazonaws.com/prod';

// API Endpoints
export const API_URLS = {
  AUTH: {
    LOGIN: `${AUTH_API_BASE_URL}${import.meta.env.VITE_AUTH_LOGIN_ENDPOINT || '/prod/login'}`,
    OTP_SIGNUP: `${AUTH_API_BASE_URL}${import.meta.env.VITE_AUTH_OTP_SIGNUP_ENDPOINT || '/prod/otp/signup'}`,
    SEND_OTP: `${AUTH_API_BASE_URL}${import.meta.env.VITE_AUTH_SEND_OTP_ENDPOINT || '/prod/otp'}`,
    VERIFY_OTP: `${AUTH_API_BASE_URL}${import.meta.env.VITE_AUTH_VERIFY_OTP_ENDPOINT || '/prod/otp/verify'}`,
  },
  BUS: {
    SEARCH: `${BUS_API_BASE_URL}${import.meta.env.VITE_BUS_SEARCH_ENDPOINT || '/bus/search'}`,
    DETAILS: `${BUS_API_BASE_URL}${import.meta.env.VITE_BUS_SEAT_DETAILS_ENDPOINT || '/seat/details'}${`?all=true`}`,
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
    GET_COUPONS: `${BUS_API_BASE_URL}${import.meta.env.VITE_GET_ALL_COUPONS || '/coupons'}`,
    APPLY_DISCOUNT: `${BUS_API_BASE_URL}/coupon/discount`,
    APPLIED_COUPONS: `${BUS_API_BASE_URL}/user/applied-coupons`,
  }
};

export default API_URLS;
