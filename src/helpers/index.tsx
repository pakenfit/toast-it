import React, { ReactNode } from 'react';
import { toastColor } from '../constants';
import { ActivityIndicator } from 'react-native';
import { toastType } from '../types';
import { CheckIcon } from '../components/CheckIcon';
import { ErrorWarning } from '../components/ErrorWarning';
import { InfoIcon } from '../components/InfoIcon';

export const getIcon = (
  type: toastType = 'info',
  color?: string,
  size: number = 24
): ReactNode => {
  switch (type) {
    case 'success':
      return (
        <CheckIcon
          fill={color || toastColor.success}
          size={size}
          testID="toast-success-icon"
        />
      );
    case 'error':
      return (
        <ErrorWarning
          fill={color || toastColor.error}
          size={size}
          testID="toast-error-icon"
        />
      );
    case 'warning':
      return (
        <ErrorWarning
          fill={color || toastColor.warning}
          size={size}
          testID="toast-warning-icon"
        />
      );
    case 'info':
      return (
        <InfoIcon
          fill={color || toastColor.info}
          size={size}
          testID="toast-info-icon"
        />
      );
    case 'loading':
      return (
        <ActivityIndicator
          size="small"
          color={color || toastColor.loading}
          testID="toast-loading-icon"
        />
      );
  }
};
