import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const CheckIcon = ({ size, ...rest }: SvgProps & { size?: number }) => (
  <Svg viewBox="0 0 24 24" width={size || 24} height={size || 24} {...rest}>
    <Path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm-.997-6 7.07-7.071-1.413-1.414-5.657 5.657-2.829-2.829-1.414 1.414L11.003 16Z" />
  </Svg>
);
