require('react-native-reanimated').setUpTests();

import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

// eslint-disable-next-line no-undef
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
