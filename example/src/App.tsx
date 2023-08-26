import * as React from 'react';

import { StyleSheet, View, Pressable, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { toastColor } from '../../src/constants';
import { ToastProvider, useToast } from '@pakenfit/toast-it';

const ToastShowCase = () => {
  const { show, hide } = useToast();

  return (
    <>
      <View style={styles.container}>
        <Pressable
          onPress={() =>
            show({
              type: 'success',
              message: 'This is a success Toast🤙🏽',
            })
          }
          style={[styles.pressable, { backgroundColor: toastColor.success }]}
        >
          <Text>Show success Toast</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            show({
              type: 'error',
              message: 'This is an error Toast🤙🏽',
            })
          }
          style={[styles.pressable, { backgroundColor: toastColor.error }]}
        >
          <Text>Show error Toast</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            show({
              type: 'info',
              message: 'This is an info Toast🤙🏽',
            })
          }
          style={[styles.pressable, { backgroundColor: toastColor.info }]}
        >
          <Text>Show info Toast</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            show({
              type: 'loading',
              message: 'This is a loading Toast🤙🏽',
              withBackdrop: true,
            })
          }
          style={[styles.pressable, { backgroundColor: toastColor.loading }]}
        >
          <Text>Show loading Toast</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            show({
              type: 'warning',
              message: 'This is a warning Toast🤙🏽',
            })
          }
          style={[styles.pressable, { backgroundColor: toastColor.warning }]}
        >
          <Text>Show warning Toast</Text>
        </Pressable>
      </View>
      <View style={styles.hide}>
        <Pressable onPress={hide} style={[styles.pressable]}>
          <Text>Hide</Text>
        </Pressable>
      </View>
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider
        defaultConfig={{
          textNumberOfLines: 2,
          bgColor: 'white',
          textColor: 'black',
        }}
      >
        <ToastShowCase />
      </ToastProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },

  pressable: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  hide: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 50,
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: 200,
    bottom: 100,
    borderRadius: 10,
  },
});
