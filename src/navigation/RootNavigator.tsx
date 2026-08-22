import React from "react";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { MainTabNavigator } from "./MainTabNavigator";
import { ArtworkDetailScreen } from "../screens/ArtworkDetail/ArtworkDetailScreen";
import { LoginScreen } from "../screens/Login/LoginScreen";
import { WelcomeScreen } from "../screens/Onboarding/WelcomeScreen";
import { RoleSelectionScreen } from "../screens/Onboarding/RoleSelectionScreen";
import { RoleConfirmationScreen } from "../screens/Onboarding/RoleConfirmationScreen";
import { SignUpScreen } from "../screens/Onboarding/SignUpScreen";
import { OTPScreen } from "../screens/Onboarding/OTPScreen";
import { BasicBioScreen } from "../screens/Onboarding/BasicBioScreen";
import { LocationScreen } from "../screens/Onboarding/LocationScreen";
import { SkillBioScreen } from "../screens/Onboarding/SkillBioScreen";
import { CategorySelectScreen } from "../screens/Onboarding/CategorySelectScreen";
import { PortfolioUploadScreen } from "../screens/Onboarding/PortfolioUploadScreen";
import { SocialLinksScreen } from "../screens/Onboarding/SocialLinksScreen";
import { BudgetScreen } from "../screens/Onboarding/BudgetScreen";
import { ExperienceScreen } from "../screens/Onboarding/ExperienceScreen";
import { InterestsScreen } from "../screens/Onboarding/InterestsScreen";
import { PersonalBioScreen } from "../screens/Onboarding/PersonalBioScreen";
import { BusinessBasicBioScreen } from "../screens/Onboarding/BusinessBasicBioScreen";
import { ClientLocationScreen } from "../screens/Onboarding/ClientLocationScreen";
import { BusinessBioScreen } from "../screens/Onboarding/BusinessBioScreen";
import { BusinessCategoryScreen } from "../screens/Onboarding/BusinessCategoryScreen";
import { ClientSocialLinksScreen } from "../screens/Onboarding/ClientSocialLinksScreen";
import { BusinessPhotosScreen } from "../screens/Onboarding/BusinessPhotosScreen";
import { useOnboardingStore } from "../store/onboardingStore";
import { theme } from "../theme";
import { RootStackParamList } from "./types";
import { EventDetailScreen } from "../screens/EventDetail/EventDetailScreen";
import { UserDetailScreen } from "../screens/UserDetail/UserDetailScreen";
import { ApplyOnEvent } from "../screens/OnboardingOfApplyEvent/ApplyonEvent";
import { NegotiatePriceScreen } from "../screens/OnboardingOfApplyEvent/NegotiatePriceScreen";
import { ProposalScreen } from "../screens/OnboardingOfApplyEvent/ProposalScreen";
import { SubmitProposalScreen } from "../screens/OnboardingOfApplyEvent/SubmitProposalScreen";
import { CreateEventScreen } from "../screens/CreateEvent/CreateEventScreen";
import { TimeDateScreen } from "../screens/CreateEvent/TimeDateScreen";
import { EventLocationScreen } from "../screens/CreateEvent/EventLocationScreen";
import { EventBudgetScreen } from "../screens/CreateEvent/EventBudgetScreen";
import { PostEventScreen } from "../screens/CreateEvent/PostEventScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

type NavProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Artist branch question order (Figma nodes 109 -> 117). Used only
 * to compute each step's progress-bar fill. The Client branch will
 * get its own array once those screens are built — see the TODO in
 * OTPRoute below.
 */
const ARTIST_STEPS: (keyof RootStackParamList)[] = [
  "BasicBio",
  "Location",
  "SkillBio",
  "CategorySelect",
  "PortfolioUpload",
  "SocialLinks",
  "Budget",
  "Experience",
  "Interests",
];
const progressFor = (screen: keyof RootStackParamList) =>
  (ARTIST_STEPS.indexOf(screen) + 1) / ARTIST_STEPS.length;

/**
 * Client branch step order. Only PersonalBio exists so far — extend
 * this array (and add the matching route below) as each new client
 * screen gets built, same as ARTIST_STEPS above.
 */
const CLIENT_STEPS: (keyof RootStackParamList)[] = [
  "PersonalBio",
  "BusinessBasicBio",
  "ClientLocation",
  "BusinessBio",
  "BusinessCategory",
  "ClientSocialLinks",
  "BusinessPhotos",
];
const clientProgressFor = (screen: keyof RootStackParamList) =>
  (CLIENT_STEPS.indexOf(screen) + 1) / CLIENT_STEPS.length;

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
      onGetStarted={() => navigation.navigate("RoleSelection")}
      onLogIn={() => navigation.navigate("Login")}
    />
  );
};

const RoleSelectionRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <RoleSelectionScreen
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("RoleConfirmation")}
    />
  );
};

const RoleConfirmationRoute = () => {
  const navigation = useNavigation<NavProp>();
  const primaryIntent = useOnboardingStore((state) => state.primaryIntent);
  // Guard: shouldn't happen since RoleSelection always sets this first,
  // but fall back to 'artist' rather than crash if ever reached directly.
  const role = primaryIntent ?? "artist";
  return (
    <RoleConfirmationScreen
      role={role}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("SignUp")}
    />
  );
};

const SignUpRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <SignUpScreen
      onContinueWithMobile={() => {
        // TODO: wire real mobile OTP flow once Appwrite phone auth is set up
        navigation.navigate("OTPVerification", { email: "your mobile number" });
      }}
      onContinueWithGoogle={() => {
        // TODO: wire real Google OAuth via Appwrite once configured
      }}
      onSignUpWithEmail={(email) =>
        navigation.navigate("OTPVerification", { email })
      }
    />
  );
};

const OTPRoute = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProp<RootStackParamList, "OTPVerification">>();
  const primaryIntent = useOnboardingStore((state) => state.primaryIntent);
  return (
    <OTPScreen
      email={route.params.email}
      onBack={() => navigation.goBack()}
      onResendCode={() => {
        // TODO: wire real resend-code API call
      }}
      onVerify={(code) => {
        // TODO: actually verify `code` against the backend (Appwrite)
        // before navigating anywhere — right now any 5 digits pass.
        if (primaryIntent === "client") {
          navigation.navigate("PersonalBio");
          return;
        }
        if (primaryIntent === "artist") {
          navigation.navigate("BasicBio");
          return;
        }
        // primaryIntent is null — role selection was skipped somehow
        // (e.g. this screen reached directly during testing). Don't
        // silently drop into MainTabs; send them back to pick a role
        // instead of guessing.
        navigation.navigate("RoleSelection");
      }}
    />
  );
};

const PersonalBioRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <PersonalBioScreen
      progress={clientProgressFor("PersonalBio")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("BusinessBasicBio")}
    />
  );
};

const BusinessBasicBioRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <BusinessBasicBioScreen
      progress={clientProgressFor("BusinessBasicBio")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("ClientLocation")}
      onSkip={() => navigation.navigate("ClientLocation")}
    />
  );
};

const ClientLocationRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <ClientLocationScreen
      progress={clientProgressFor("ClientLocation")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("BusinessBio")}
    />
  );
};

const BusinessBioRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <BusinessBioScreen
      progress={clientProgressFor("BusinessBio")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("BusinessCategory")}
      onSkip={() => navigation.navigate("BusinessCategory")}
    />
  );
};

const BusinessCategoryRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <BusinessCategoryScreen
      progress={clientProgressFor("BusinessCategory")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("ClientSocialLinks")}
      onSkip={() => navigation.navigate("ClientSocialLinks")}
    />
  );
};

const ClientSocialLinksRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <ClientSocialLinksScreen
      progress={clientProgressFor("ClientSocialLinks")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("BusinessPhotos")}
      onSkip={() => navigation.navigate("BusinessPhotos")}
    />
  );
};

const BusinessPhotosRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <BusinessPhotosScreen
      progress={clientProgressFor("BusinessPhotos")}
      onBack={() => navigation.goBack()}
      // Last step of the Client branch — hands off into the main app.
      // TODO: submit `answers` from useOnboardingStore to the real
      // user profile (Appwrite) here before navigating, then reset().
      // Mirrors the same TODO on InterestsRoute for the Artist branch.
      onContinue={() => navigation.navigate("MainTabs")}
      onSkip={() => navigation.navigate("MainTabs")}
    />
  );
};

const BasicBioRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <BasicBioScreen
      progress={progressFor("BasicBio")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("Location")}
    />
  );
};

const LocationRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <LocationScreen
      progress={progressFor("Location")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("SkillBio")}
    />
  );
};

const SkillBioRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <SkillBioScreen
      progress={progressFor("SkillBio")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("CategorySelect")}
      onSkip={() => navigation.navigate("CategorySelect")}
    />
  );
};

const CategorySelectRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <CategorySelectScreen
      progress={progressFor("CategorySelect")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("PortfolioUpload")}
      onSkip={() => navigation.navigate("PortfolioUpload")}
    />
  );
};

const PortfolioUploadRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <PortfolioUploadScreen
      progress={progressFor("PortfolioUpload")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("SocialLinks")}
      onSkip={() => navigation.navigate("SocialLinks")}
    />
  );
};

const SocialLinksRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <SocialLinksScreen
      progress={progressFor("SocialLinks")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("Budget")}
      onSkip={() => navigation.navigate("Budget")}
    />
  );
};

const BudgetRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <BudgetScreen
      progress={progressFor("Budget")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("Experience")}
    />
  );
};

const ExperienceRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <ExperienceScreen
      progress={progressFor("Experience")}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("Interests")}
    />
  );
};

const InterestsRoute = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <InterestsScreen
      progress={progressFor("Interests")}
      onBack={() => navigation.goBack()}
      // Last step of the Artist branch — hands off into the main app.
      // TODO: submit `answers` from useOnboardingStore to the real
      // user profile (Appwrite) here before navigating, then reset().
      onContinue={() => navigation.navigate("MainTabs")}
      onSkip={() => navigation.navigate("MainTabs")}
    />
  );
};

const EventDetailRoute = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProp<RootStackParamList, "EventDetail">>();
  const eventId = route.params.eventId;

  return (
    <EventDetailScreen
      eventId={eventId}
      onBack={() => navigation.goBack()}
      onApply={() => navigation.navigate("ApplyonEvent", { eventId })}
    />
  );
};

const CreateEventRoute = () => {
  const navigation = useNavigation<NavProp>();

  return (
    <CreateEventScreen
      onBack={() => navigation.goBack()}
      onContinue={(title, description) =>
        navigation.navigate("TimeDate", { title, description })
      }
    />
  );
};

const TimeDateRoute = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProp<RootStackParamList, "TimeDate">>();

  return (
    <TimeDateScreen
      onBack={() => navigation.goBack()}
      onContinue={(date, time) =>
        navigation.navigate("EventLocation", {
          ...route.params,
          date,
          time,
        })
      }
    />
  );
};

const EventLocationRoute = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProp<RootStackParamList, "EventLocation">>();

  return (
    <EventLocationScreen
      onBack={() => navigation.goBack()}
      onContinue={(location, addressDetails) =>
        navigation.navigate("EventBudget", {
          ...route.params,
          location,
          addressDetails,
        })
      }
    />
  );
};

const EventBudgetRoute = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProp<RootStackParamList, "EventBudget">>();

  return (
    <EventBudgetScreen
      onBack={() => navigation.goBack()}
      onContinue={(budget) =>
        navigation.navigate("PostEvent", { ...route.params, budget })
      }
    />
  );
};

const PostEventRoute = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProp<RootStackParamList, "PostEvent">>();

  return (
    <PostEventScreen
      {...route.params}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("MainTabs")}
    />
  );
};

const UserDetailRoute = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProp<RootStackParamList, "UserDetail">>();

  return (
    <UserDetailScreen
      user={route.params.user}
      onBack={() => navigation.goBack()}
    />
  );
};

const ApplyEventRoute = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProp<RootStackParamList, "ApplyonEvent">>();

  return (
    <ApplyOnEvent
      eventId={route.params?.eventId}
      onBack={() => navigation.goBack()}
      onContinue={(budget) => navigation.navigate("NegotiatePrice", { budget })}
    />
  );
};

const NegotiatePriceRoute = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProp<RootStackParamList, "NegotiatePrice">>();

  return (
    <NegotiatePriceScreen
      budget={route.params.budget}
      onBack={() => navigation.goBack()}
      onContinue={(proposedPrice: number) =>
        navigation.navigate("Proposal", {
          budget: route.params.budget,
          proposedPrice,
        })
      }
    />
  );
};

const ProposalRoute = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProp<RootStackParamList, "Proposal">>();

  return (
    <ProposalScreen
      budget={route.params.budget}
      proposedPrice={route.params.proposedPrice}
      onBack={() => navigation.goBack()}
      onContinue={(proposalDescription: string) =>
        navigation.navigate("SubmitProposal", {
          budget: route.params.budget,
          proposedPrice: route.params.proposedPrice,
          proposalDescription,
        })
      }
    />
  );
};

const SubmitProposalRoute = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProp<RootStackParamList, "SubmitProposal">>();

  return (
    <SubmitProposalScreen
      budget={route.params.budget}
      proposedPrice={route.params.proposedPrice}
      proposalDescription={route.params.proposalDescription}
      onBack={() => navigation.goBack()}
      onContinue={() => navigation.navigate("MainTabs")}
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
        <Stack.Screen
          name="RoleConfirmation"
          component={RoleConfirmationRoute}
        />
        <Stack.Screen name="SignUp" component={SignUpRoute} />
        <Stack.Screen name="OTPVerification" component={OTPRoute} />
        <Stack.Screen name="BasicBio" component={BasicBioRoute} />
        <Stack.Screen name="Location" component={LocationRoute} />
        <Stack.Screen name="SkillBio" component={SkillBioRoute} />
        <Stack.Screen name="CategorySelect" component={CategorySelectRoute} />
        <Stack.Screen name="PortfolioUpload" component={PortfolioUploadRoute} />
        <Stack.Screen name="SocialLinks" component={SocialLinksRoute} />
        <Stack.Screen name="Budget" component={BudgetRoute} />
        <Stack.Screen name="Experience" component={ExperienceRoute} />
        <Stack.Screen name="Interests" component={InterestsRoute} />
        <Stack.Screen name="PersonalBio" component={PersonalBioRoute} />
        <Stack.Screen
          name="BusinessBasicBio"
          component={BusinessBasicBioRoute}
        />
        <Stack.Screen name="ClientLocation" component={ClientLocationRoute} />
        <Stack.Screen name="BusinessBio" component={BusinessBioRoute} />
        <Stack.Screen
          name="BusinessCategory"
          component={BusinessCategoryRoute}
        />
        <Stack.Screen
          name="ClientSocialLinks"
          component={ClientSocialLinksRoute}
        />
        <Stack.Screen name="BusinessPhotos" component={BusinessPhotosRoute} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen
          name="ArtworkDetail"
          component={ArtworkDetailScreen}
          options={{ headerShown: true, title: "Artwork" }}
        />
        <Stack.Screen name="EventDetail" component={EventDetailRoute} />
        <Stack.Screen name="CreateEvent" component={CreateEventRoute} />
        <Stack.Screen name="TimeDate" component={TimeDateRoute} />
        <Stack.Screen name="EventLocation" component={EventLocationRoute} />
        <Stack.Screen name="EventBudget" component={EventBudgetRoute} />
        <Stack.Screen name="PostEvent" component={PostEventRoute} />
        <Stack.Screen name="UserDetail" component={UserDetailRoute} />
        <Stack.Screen name="ApplyonEvent" component={ApplyEventRoute} />
        <Stack.Screen name="NegotiatePrice" component={NegotiatePriceRoute} />
        <Stack.Screen name="Proposal" component={ProposalRoute} />
        <Stack.Screen name="SubmitProposal" component={SubmitProposalRoute} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: true, title: "Log In" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
