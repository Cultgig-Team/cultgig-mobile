import { TextProps as RNTextProps } from 'react-native';
import { TypographyVariant } from '../../../theme/typography';
import { ColorToken } from '../../../theme/colors';

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: ColorToken;
  children: React.ReactNode;
}
