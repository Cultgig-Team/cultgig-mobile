import React from 'react';
import { NavigationContainer, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabNavigator } from './MainTabNavigator';
import { ArtworkDetailScreen } from '../screens/ArtworkDetail/ArtworkDetailScreen';
import { LoginScreen } from '../screens/Login/LoginScreen';
import { WelcomeScreen } from '../screens/Onboarding/WelcomeScreen';
import { RoleSelectionScreen } from '../screens/Onboarding/RoleSelectionScreen';
import { RoleConfirmationScreen } from '../screens/Onboarding/RoleConfirmationScreen';
import { SignUpScreen } from '../screens/Onboarding/SignUpScreen';
import { OTPScreen } from '../screens/Onboarding/OTPScreen';
import { useOnboardingStore } from '../store/onboardingStore';
import { theme } from '../theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

type NavProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Thin navigation-connected wrappers. Keeps the actual screen
 * components (WelcomeScreen, RoleSelectionScreen) free of any
 * direct dependency on React Navigation — they just take plain
 * callback props, which makes them easier to test/reuse/preview
 * in isolation later (e.g. in a Storybook-style setup).
 */
const WelcomeRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <WelcomeScreen
      onGetStarted={() => navigation.navigate('RoleSelection')}
      onLogIn={() => navigation.navigate('Login')}
    />
  );
};

const RoleSelectionRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <RoleSelectionScreen
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate('RoleConfirmation')}
    />
  );
};

const RoleConfirmationRoute = () => {
  const navigation = useNavigation<NavProp>();
  const primaryIntent = useOnboardingStore((state) => state.primaryIntent);
  // Guard: shouldn't happen since RoleSelection always sets this first,
  // but fall back to 'artist' rather than crash if ever reached directly.
  const role = primaryIntent ?? 'artist';
  return (
    <RoleConfirmationScreen
      role={role}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate('SignUp')}
    />
  );
};

const SignUpRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <SignUpScreen
      onContinueWithMobile={() => {
        // TODO: wire real mobile OTP flow once Appwrite phone auth is set up
        navigation.navigate('OTPVerification', { email: 'your mobile number' });
      }}
      onContinueWithGoogle={() => {
        // TODO: wire real Google OAuth via Appwrite once configured
      }}
      onSignUpWithEmail={(email) => navigation.navigate('OTPVerification', { email })}
    />
  );
};

const OTPRoute = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'OTPVerification'>>();
  return (
    <OTPScreen
      email={route.params.email}
      onBack={() => navigation.goBack()}
      onResendCode={() => {
        // TODO: wire real resend-code API call
      }}
      onVerify={() => {
        // TODO: navigate into the Artist or Client question flow once
        // those screens are built — reads primaryIntent from
        // useOnboardingStore to decide which stack to push.
        navigation.navigate('MainTabs');
      }}
    />
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.textPrimary,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeRoute} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionRoute} />
        <Stack.Screen name="RoleConfirmation" component={RoleConfirmationRoute} />
        <Stack.Screen name="SignUp" component={SignUpRoute} />
        <Stack.Screen name="OTPVerification" component={OTPRoute} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="ArtworkDetail" component={ArtworkDetailScreen} options={{ headerShown: true, title: 'Artwork' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true, title: 'Log In' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
