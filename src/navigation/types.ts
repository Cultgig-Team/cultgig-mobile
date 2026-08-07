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
