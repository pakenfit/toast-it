import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import Animated, {
  AnimateProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_CONFIG, INITIAL_TOP, TIMING } from '../constants';
import { getIcon } from '../helpers';
import { ToastRef, ToastConfig } from '../types';

interface Props extends AnimateProps<ViewProps> {
  defaultConfig?: Partial<ToastConfig>;
}

export const Toast = forwardRef<ToastRef, Props>(({ defaultConfig }, ref) => {
  const top = useSharedValue(INITIAL_TOP);
  const [visible, setVisible] = useState(false);
  const currentRef = useRef<Animated.View>(null);
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
  } = config;

  useImperativeHandle(ref, () => ({
    ...(currentRef.current as Animated.View),
    show,
    hide,
    isVisible: () => visible,
    getNode: () => currentRef?.current as View,
    setState: (state: never) => {
      if (currentRef?.current) {
        currentRef.current.setState(state);
      }
    },
    forceUpdate: () => {
      if (currentRef?.current) {
        currentRef.current.forceUpdate();
      }
    },
    render: () => {
      if (currentRef?.current) {
        currentRef.current.render();
      }
    },
  }));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(top.value, { duration: TIMING }),
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
});
