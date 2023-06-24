import * as React from 'react';

import { StyleSheet, View, Pressable, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { toastColor } from '../../src/constants';
import { Toast, useToast } from 'toast-it';

export default function App() {
  const { toastRef, show } = useToast();

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Toast
          ref={toastRef}
          defaultConfig={{
            textNumberOfLines: 2,
            bgColor: 'white',
            textColor: 'black',
          }}
        />
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
});
