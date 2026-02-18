import axios from 'axios';
import { BASE_URL } from '../utils/alias';

const baseUrl = 'https://api-sttm.21id.uz/api';

export const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
