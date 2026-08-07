import { ReactNode } from 'react';

export interface OnboardingTemplateProps {
  /** 0 to 1. Omit to hide the progress bar (e.g. on Welcome/Role Select screens). */
  progress?: number;
  /** Shows the back caret in the header. Defaults to true. */
  showBack?: boolean;
  onBackPress?: () => void;
  /** Main question/step content — headers, inputs, option lists, etc. */
  children: ReactNode;
  /** Primary CTA button label, e.g. "Continue" */
  primaryButtonLabel: string;
  onPrimaryPress: () => void;
  primaryButtonDisabled?: boolean;
  primaryButtonLoading?: boolean;
  /** Shows a "Skip for now" text link under the button (optional steps only) */
  onSkipPress?: () => void;
}
