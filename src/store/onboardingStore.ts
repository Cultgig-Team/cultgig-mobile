import { create } from 'zustand';

export type PrimaryIntent = 'artist' | 'client';

/**
 * Answers collected across the onboarding flow. Both branches share
 * some fields (photo, fullName); the rest are branch-specific.
 * All optional because they're filled in progressively as the user
 * moves through the steps.
 */
export interface OnboardingAnswers {
  // Shared
  photoUri?: string;
  fullName?: string;

  // Artist branch
  city?: string;
  travelPreference?: 'withinCity' | 'openToTravel';
  skillBio?: string;
  primarySkill?: string; // "Artist 112" — Photographer, Dancer, Guitarist, etc.
  experienceLevel?: 'fresher' | 'intermediate' | 'experienced';
  gigTypes?: string[];
  portfolioUris?: string[];
  socialLinks?: { instagram?: string; youtube?: string; website?: string };
  hourlyBudgetMin?: number;
  hourlyBudgetMax?: number;

  // Client branch
  businessEmail?: string;
  businessMobile?: string;
  businessAddress?: string;
  businessBio?: string;
  businessCategory?: string;
  workSampleUris?: string[];
}

interface OnboardingState {
  primaryIntent: PrimaryIntent | null;
  currentStepIndex: number;
  answers: OnboardingAnswers;

  setPrimaryIntent: (intent: PrimaryIntent) => void;
  setAnswer: <K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  reset: () => void;
}

/**
 * STORE: Onboarding
 * -------------------------------------------------------
 * Client/UI state only — this holds in-progress answers as the user
 * moves through the Welcome -> Role Select -> [Artist|Client] Questions
 * flow. Once the flow completes, the final payload gets submitted to
 * the real user profile via a service call (Appwrite), and this store
 * resets. Not persisted across app restarts by design — onboarding is
 * meant to be completed in one sitting; add persistence later if you
 * want users to resume a half-finished onboarding after closing the app.
 */
export const useOnboardingStore = create<OnboardingState>((set) => ({
  primaryIntent: null,
  currentStepIndex: 0,
  answers: {},

  setPrimaryIntent: (intent) => set({ primaryIntent: intent }),

  setAnswer: (key, value) =>
    set((state) => ({
      answers: { ...state.answers, [key]: value },
    })),

  goToNextStep: () => set((state) => ({ currentStepIndex: state.currentStepIndex + 1 })),
  goToPreviousStep: () => set((state) => ({ currentStepIndex: Math.max(0, state.currentStepIndex - 1) })),

  reset: () => set({ primaryIntent: null, currentStepIndex: 0, answers: {} }),
}));
