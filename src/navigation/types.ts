/**
 * Type-safe navigation param lists. Add a new screen here
 * whenever you add one to a navigator — gives autocomplete +
 * type checking on navigation.navigate('ScreenName', params).
 */

import type { User } from "../services/artworkService";

export type RootStackParamList = {
  Welcome: undefined;
  RoleSelection: undefined;
  RoleConfirmation: undefined;
  SignUp: undefined;
  OTPVerification: { email: string };
  // Artist onboarding branch (Figma nodes 109 -> 117)
  BasicBio: undefined;
  Location: undefined;
  SkillBio: undefined;
  CategorySelect: undefined;
  PortfolioUpload: undefined;
  SocialLinks: undefined;
  Budget: undefined;
  Experience: undefined;
  Interests: undefined;
  // Client onboarding branch
  PersonalBio: undefined;
  BusinessBasicBio: undefined;
  ClientLocation: undefined;
  BusinessBio: undefined;
  BusinessCategory: undefined;
  ClientSocialLinks: undefined;
  BusinessPhotos: undefined;
  MainTabs: undefined;
  ArtworkDetail: { artworkId: string };
  EventDetail: { eventId: number };
  UserDetail: { user: User };
  ApplyonEvent: { eventId?: number } | undefined;
  NegotiatePrice: { budget: number };
  Proposal: { budget: number; proposedPrice: number };
  SubmitProposal: {
    budget: number;
    proposedPrice: number;
    proposalDescription: string;
  };
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  // Profile: undefined;
  Search: undefined;
  Calendar: undefined;
  Message: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
