const API_BASE_URL = (window.ENV?.API_BASE_URL && !window.ENV.API_BASE_URL.startsWith('%%'))
  ? window.ENV.API_BASE_URL
  : 'http://localhost:3000';
