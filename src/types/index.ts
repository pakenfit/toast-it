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
  withBackdrop?: boolean;
  backdropColor?: string;
  backdropOpacity?: number;
  animationType?: 'timing' | 'spring';
  containerStyle?: {
    marginLeft?: number;
    marginRight?: number;
  };
};

type ToastMethods = {
  show: (config: ToastConfig) => void;
  hide: () => void;
  isVisible: () => boolean;
};

export type ToastRef = Animated.View & ToastMethods;
