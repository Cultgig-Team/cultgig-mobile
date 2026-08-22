import { PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  /** Layout-only overrides (margin, etc). Never use this to change colors/radius — add a variant instead. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
}
