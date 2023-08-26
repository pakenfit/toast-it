import React, { MutableRefObject, useRef } from 'react';
import { render, renderHook, act } from '@testing-library/react-native';
import { Toast, ToastRef } from '..';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { toastColor } from '../constants';

describe('Toast', () => {
  it('renders toast message correctly', async () => {
    const { result } = renderHook(() => useRef<ToastRef>());

    const { getByTestId } = render(
      <Toast ref={result.current as MutableRefObject<ToastRef>} />,
      {
        wrapper: SafeAreaProvider,
      }
    );

    act(() => {
      result.current.current?.show({
        message: 'Hello, world!',
      });
    });

    expect(result.current.current?.isVisible()).toBeTruthy();
    expect(getByTestId('toast-message')).toBeTruthy();
    expect(getByTestId('toast-message').props.children).toBe('Hello, world!');
  });

  it('should render a success toast', async () => {
    const { result } = renderHook(() => useRef<ToastRef>());

    const { getByTestId } = render(
      <Toast ref={result.current as MutableRefObject<ToastRef>} />,
      {
        wrapper: SafeAreaProvider,
      }
    );

    act(() => {
      result.current.current?.show({
        type: 'success',
        message: 'This is a success toast',
      });
    });

    expect(result.current.current?.isVisible()).toBeTruthy();
    expect(getByTestId('toast-message')).toBeTruthy();
    expect(getByTestId('toast-message').props.children).toBe(
      'This is a success toast'
    );
    expect(getByTestId('toast-success-icon')).toBeTruthy();
    expect(getByTestId('toast-success-icon').props.fill).toBe(
      toastColor.success
    );
    expect(getByTestId('toast-success-icon').props.width).toBe(24);
    expect(getByTestId('toast-success-icon').props.height).toBe(24);
  });

  it('should render an error toast', async () => {
    const { result } = renderHook(() => useRef<ToastRef>());

    const { getByTestId } = render(
      <Toast ref={result.current as MutableRefObject<ToastRef>} />,
      {
        wrapper: SafeAreaProvider,
      }
    );

    act(() => {
      result.current.current?.show({
        type: 'error',
        message: 'This is an error toast',
      });
    });

    expect(result.current.current?.isVisible()).toBeTruthy();
    expect(getByTestId('toast-message')).toBeTruthy();
    expect(getByTestId('toast-message').props.children).toBe(
      'This is an error toast'
    );
    expect(getByTestId('toast-error-icon')).toBeTruthy();
    expect(getByTestId('toast-error-icon').props.fill).toBe(toastColor.error);
    expect(getByTestId('toast-error-icon').props.width).toBe(24);
    expect(getByTestId('toast-error-icon').props.height).toBe(24);
  });

  it('should render a warning toast', async () => {
    const { result } = renderHook(() => useRef<ToastRef>());

    const { getByTestId } = render(
      <Toast ref={result.current as MutableRefObject<ToastRef>} />,
      {
        wrapper: SafeAreaProvider,
      }
    );

    act(() => {
      result.current.current?.show({
        type: 'warning',
        message: 'This is a warning toast',
      });
    });

    expect(result.current.current?.isVisible()).toBeTruthy();
    expect(getByTestId('toast-message')).toBeTruthy();
    expect(getByTestId('toast-message').props.children).toBe(
      'This is a warning toast'
    );
    expect(getByTestId('toast-warning-icon')).toBeTruthy();
    expect(getByTestId('toast-warning-icon').props.fill).toBe(
      toastColor.warning
    );
    expect(getByTestId('toast-warning-icon').props.width).toBe(24);
    expect(getByTestId('toast-warning-icon').props.height).toBe(24);
  });

  it('should render a loading toast', async () => {
    const { result } = renderHook(() => useRef<ToastRef>());

    const { getByTestId } = render(
      <Toast ref={result.current as MutableRefObject<ToastRef>} />,
      {
        wrapper: SafeAreaProvider,
      }
    );

    act(() => {
      result.current.current?.show({
        type: 'loading',
        message: 'This is a loading toast',
      });
    });

    expect(result.current.current?.isVisible()).toBeTruthy();
    expect(getByTestId('toast-message')).toBeTruthy();
    expect(getByTestId('toast-message').props.children).toBe(
      'This is a loading toast'
    );

    expect(getByTestId('toast-loading-icon')).toBeTruthy();
    expect(getByTestId('toast-loading-icon').props.color).toBe(
      toastColor.loading
    );
    expect(getByTestId('toast-loading-icon').props.size).toBe('small');
  });

  it('should render a toast with defaultConfig', async () => {
    const { result } = renderHook(() => useRef<ToastRef>());

    const { getByTestId } = render(
      <Toast
        ref={result.current as MutableRefObject<ToastRef>}
        defaultConfig={{
          bgColor: 'red',
          textColor: 'white',
          textNumberOfLines: 2,
          duration: 1000,
          iconColor: 'blue',
          iconSize: 30,
        }}
      />,
      {
        wrapper: SafeAreaProvider,
      }
    );

    act(() => {
      result.current.current?.show({
        message: 'This is a toast',
      });
    });

    expect(result.current.current?.isVisible()).toBeTruthy();
    expect(getByTestId('toast')).toBeTruthy();
    expect(getByTestId('toast').props.style.backgroundColor).toBe('red');

    expect(getByTestId('toast-message')).toBeTruthy();
    expect(getByTestId('toast-message').props.children).toBe('This is a toast');
    expect(getByTestId('toast-message').props.numberOfLines).toBe(2);
    expect(getByTestId('toast-message').props.style[1].color).toBe('white');

    expect(getByTestId('toast-info-icon')).toBeTruthy();
    expect(getByTestId('toast-info-icon').props.fill).toBe('blue');
    expect(getByTestId('toast-info-icon').props.width).toBe(30);
    expect(getByTestId('toast-info-icon').props.height).toBe(30);
    expect(getByTestId('toast-info-icon').props.testID).toBe('toast-info-icon');
  });
});
