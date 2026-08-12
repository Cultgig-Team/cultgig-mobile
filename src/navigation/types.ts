/**
 * Type-safe navigation param lists. Add a new screen here
 * whenever you add one to a navigator — gives autocomplete +
 * type checking on navigation.navigate('ScreenName', params).
 */

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
  MainTabs: undefined;
  ArtworkDetail: { artworkId: string };
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
