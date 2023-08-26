import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { ToastConfig, ToastRef } from '../types';
import { Toast } from '../components/Toast';

const ToastContext = createContext<
  Pick<ToastRef, 'show' | 'hide' | 'isVisible'>
>({
  show: () => {},
  hide: () => {},
  isVisible: () => false,
});

export const ToastProvider = ({
  children,
  defaultConfig,
}: {
  children: ReactNode;
  defaultConfig?: Partial<ToastConfig>;
}) => {
  const toastRef = useRef<ToastRef>(null);

  const hide = useCallback(() => {
    if (!toastRef.current) return;
    toastRef.current?.hide();
  }, []);

  const show = useCallback((config: ToastConfig) => {
    if (!toastRef.current) return;
    toastRef.current.show(config);
  }, []);

  const isVisible = useCallback(() => {
    if (!toastRef.current) return false;
    return toastRef.current?.isVisible();
  }, []);

  return (
    <ToastContext.Provider value={{ hide, show, isVisible }}>
      {children}
      <Toast ref={toastRef} defaultConfig={defaultConfig} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
