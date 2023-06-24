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
      return <CheckIcon fill={color || toastColor.success} size={size} />;
    case 'error':
      return <ErrorWarning fill={color || toastColor.error} size={size} />;
    case 'warning':
      return <ErrorWarning fill={color || toastColor.warning} size={size} />;
    case 'info':
      return <InfoIcon fill={color || toastColor.info} size={size} />;
    case 'loading':
      return (
        <ActivityIndicator size="small" color={color || toastColor.loading} />
      );
  }
};
