import { ReactNode } from 'react';

export interface SocialAuthButtonProps {
  label: string;
  icon: ReactNode;
  onPress: () => void;
}
