import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ErrorWarning = ({
  size,
  ...rest
}: SvgProps & { size?: number }) => (
  <Svg viewBox="0 0 24 24" width={size || 24} height={size || 24} {...rest}>
    <Path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm-1-7v2h2v-2h-2Zm0-8v6h2V7h-2Z" />
  </Svg>
);
