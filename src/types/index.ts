import Animated from 'react-native-reanimated';

export type toastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export type ToastConfig = {
  type?: toastType;
  message: string;
  duration?: number | 'infinite';
  bgColor?: string;
  textColor?: string;
  iconColor?: string;
  iconSize?: number;
  textNumberOfLines?: number;
};

export interface ToastRef extends Animated.View {
  show: (config: ToastConfig) => void;
  hide: () => void;
  isVisible: () => boolean;
}
