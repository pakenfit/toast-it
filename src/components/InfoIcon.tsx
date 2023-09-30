import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const InfoIcon = ({
  size = 24,
  ...rest
}: SvgProps & { size?: number }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size} {...rest}>
    <Path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm-1-11v6h2v-6h-2Zm0-4v2h2V7h-2Z" />
  </Svg>
);
