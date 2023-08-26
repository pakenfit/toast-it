import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text, ViewProps } from 'react-native';
import Animated, {
  AnimateProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_CONFIG, INITIAL_TOP, TIMING } from '../constants';
import { getIcon } from '../helpers';
import { ToastRef, ToastConfig } from '../types';
import { View } from 'react-native';

interface Props extends AnimateProps<ViewProps> {
  defaultConfig?: Partial<ToastConfig>;
}

export const Toast = forwardRef<ToastRef, Props>(({ defaultConfig }, ref) => {
  const top = useSharedValue(INITIAL_TOP);
  const [visible, setVisible] = useState(false);
  const currentRef = useRef<Animated.View | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [config, setConfig] = useState<ToastConfig>({
    ...DEFAULT_CONFIG,
    ...defaultConfig,
  });
  const { top: topInset } = useSafeAreaInsets();

  const {
    type,
    message,
    duration,
    bgColor,
    textColor,
    iconColor,
    iconSize,
    textNumberOfLines = 1,
    withBackdrop = false,
    backdropColor = 'gray',
    backdropOpacity = 0.8,
    animationType = 'spring',
  } = config;

  useImperativeHandle(
    ref,
    () =>
      ({
        ...(currentRef.current as Animated.View),
        show,
        hide,
        isVisible: () => visible,
      } as ToastRef)
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top:
        animationType === 'spring'
          ? withSpring(top.value, { duration: TIMING })
          : withTiming(top.value, { duration: TIMING }),
    };
  }, [top]);

  const quickShow = useCallback(
    (tConfig?: ToastConfig) => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current as NodeJS.Timeout);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      showTimeoutRef.current = setTimeout(() => {
        setVisible(true);
        setConfig((currentConfig) => ({
          ...currentConfig,
          ...tConfig,
        }));
        top.value = topInset;
        clearTimeout(showTimeoutRef.current as NodeJS.Timeout);
      }, TIMING);
    },
    [top, topInset]
  );

  const hide = useCallback(() => {
    top.value = INITIAL_TOP;
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
      clearTimeout(hideTimeoutRef.current as NodeJS.Timeout);
    }, TIMING);
  }, [top]);

  const show = useCallback(
    (tConfig?: ToastConfig) => {
      if (visible) {
        hide();
        quickShow(tConfig);
      } else {
        setVisible(true);
        setConfig((currentConfig) => ({ ...currentConfig, ...tConfig }));
        top.value = topInset;
      }
    },
    [hide, quickShow, top, topInset, visible]
  );

  useEffect(() => {
    if (!visible) return;

    if (duration === 'infinite' || type === 'loading') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        hide();
      }, duration);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
    };
  }, [visible, duration, hide, type]);

  if (!visible) return null;

  return (
    <>
      <Animated.View
        style={[animatedStyle, styles.container, { backgroundColor: bgColor }]}
        ref={currentRef}
        onTouchStart={type === 'loading' ? undefined : hide}
        testID="toast"
      >
        {getIcon(type, iconColor, iconSize)}
        <Text
          style={[styles.text, { color: textColor }]}
          numberOfLines={textNumberOfLines}
          ellipsizeMode="tail"
          testID="toast-message"
        >
          {message}
        </Text>
      </Animated.View>
      {withBackdrop && type === 'loading' && (
        <View
          style={[
            styles.backdrop,
            { backgroundColor: backdropColor, opacity: backdropOpacity },
          ]}
        />
      )}
    </>
  );
});

Toast.displayName = 'Toast';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    zIndex: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 10,
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
  backdrop: {
    zIndex: 40,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
