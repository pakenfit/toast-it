import { toastConfig } from 'src/types';

export const toastColor = {
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
  loading: 'gray',
};

export const INITIAL_TOP = -200;
export const DURATION = 5000;
export const TIMING = 1000;

export const DEFAULT_CONFIG: toastConfig = {
  type: 'info',
  message: 'Info message',
  duration: DURATION,
};
