import { useCallback, useRef } from 'react';
import { ToastRef, ToastConfig } from '../types';

export const useToast = () => {
  const toastRef = useRef<ToastRef>(null);

  const show = useCallback((config: ToastConfig) => {
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
