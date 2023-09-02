# @pakenfit/toast-it

Let's toast to the health of your application

<p align='center' style="display: flex">
  <img src='./screenshots/demo_ios.gif' width="300">
  <img src='./screenshots/demo_android.gif' width="300">
</p>

<p>With animation type spring and backdrop for loading</p>
<p align='center' style="display: flex">
  <img src='./screenshots/demo_ios_spring_backdrop.gif' width="300">
  <img src='./screenshots/demo_android_spring_backdrop.gif' width="300">
</p>


## Installation

```sh
npm install @pakenfit/toast-it --save
```

<p align="center">Or</p>

```sh
yarn add @pakenfit/toast-it
```

#### Dependencies
This library needs these dependencies to be installed in your project before you can use it:

```sh
npm install react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-svg --save
```
<p align="center">Or</p>

```sh
yarn add react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-svg
```

## Features

- Fully customizable
- Works on `Android` and `iOS` (not tested on `web` should work as well)
- Compatible with Expo Go
- Written in Typescript


## Usage

```js
import { ToastProvider, useToast } from '@pakenfit/toast-it';

const ToastComponent = () => {
  const { show, hide } = useToast();

  return (
    <View>
      <Button
        label='Show Toast'
        onPress={() =>
          show({
            type: 'success',
            message: 'This is a success Toast🤙🏽',
          })
        }
      />
    </View>
  )
}

export default function App() {

  return (
    <SafeAreaProvider>
        <ToastProvider
          defaultConfig={{
            textNumberOfLines: 2,
            bgColor: 'white',
            textColor: 'black',
          }}
        />
        <ToastComponent/>
    </SafeAreaProvider>
  )
}


```

## Configuration
The toast component accepts the following configuration options:

- `type (optional)`: The type of the toast message. Possible values are `'success'`, `'error'`, `'warning'`, `'info'`, or `'loading'`. Default is `'info'`.
- `message`: The text message to be displayed in the toast.
- `duration (optional)`: The duration of the toast message in milliseconds. Use `'infinite'` for an indefinite duration. Default is `3000` milliseconds.
- `bgColor (optional)`: The background color of the toast. Default is white.
- `textColor (optional)`: The text color of the toast message. Default is `black`.
- `iconColor (optional)`: The color of the toast icon. Default is undefined (uses default color for each type).
- `iconSize (optional)`: The size of the toast icon. Default is undefined (uses default size for each type).
- `textNumberOfLines (optional)`: The number of lines to display for the toast message. Default is `1`.
- `withBackdrop (optional, only for type loading)`: If true a backdrop is set when loading. Default is `false`.
-  `backdropColor (optional, only for type loading)`: Set the backdrop color.
-  `backdropOpacity (optional, only for type loading)`: Set the backdrop opacity.
-  `animationType (optional)`: The toast enter animation type. Possible values are `'timing'` and `'spring'`. Default is `'spring'`.
-  `containerStyle (optional)`: The toast container style. Only properties available are `'marginLeft'` and `'marginRight'`.



## API
The Toast component provides the following methods through the toastRef:

- `show(config: ToastConfig)`: Displays a toast message with the specified configuration.
- `hide()`: Hides the currently displayed toast message.
- `isVisible()`: Returns a boolean indicating whether a toast message is currently visible.

## Types

### ToastRef
The `ToastRef` type represents the reference to the Toast component, allowing access to its methods. It has the following methods:

- `show`: Shows the toast with the specified configuration.
- `hide`: Hides the toast.
- `isVisible`: Returns a boolean indicating whether the toast is currently visible.

### ToastConfig
The `ToastConfig` type represents the configuration options for the toast component. It has the following properties:

```
type ToastConfig = {
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
  animationType?: 'timing' | 'spring',
  containerStyle?: {
    marginLeft?: number;
    marginRight?: number;
  };
}
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Development

You can launch the example app to test your feature or bug:

```sh
yarn example ios

or

yarn example android
```

Run tests

```
yarn test
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

Inspired by [react-hot-toast](https://github.com/timolins/react-hot-toast)
