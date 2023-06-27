import { useCallback, useRef } from 'react';
import { ToastRef, toastConfig } from '../types';

export const useToast = () => {
  const toastRef = useRef<ToastRef>(null);

  const show = useCallback((config?: toastConfig) => {
    if (toastRef.current) {
      toastRef.current.show(config);
    }
  }, []);

  const hide = useCallback(() => {
    if (toastRef.current) {
      toastRef.current.hide();
    }
  }, []);

  const isVisible = useCallback(() => {
    if (toastRef.current) {
      return toastRef.current.isVisible();
    }
    return false;
  }, []);

  return { toastRef, show, hide, isVisible };
};
