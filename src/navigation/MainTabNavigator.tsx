import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home/HomeScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import CalendarScreen from "@/screens/ScheduleEvent/CalendarSceen";
import { SearchScreen } from "../screens/search/SearchScreen";
import { theme } from "../theme";
import { MainTabParamList } from "./types";
import CultgigNavCalendarIcon from "../../assets/icons/calendar.svg";
import CultgigInactiveCalendarIcon from "../../assets/icons/calender-inactive.svg";
import CultgigNavChatIcon from "../../assets/icons/message.svg";
import CultgigActiveChatIcon from "../../assets/icons/message-active.svg";
import CultgigNavHomeIcon from "../../assets/icons/home.svg";
import CultgigNavSearchIcon from "../../assets/icons/search.svg";
import CultgigNavUserIcon from "../../assets/icons/profile.svg";
import CultgigActiveSearchIcon from "../../assets/icons/search-active.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SVG } from "@/components/common/SVG";
import { ProfileScreen } from "@/screens/Profile/ProfileScreen";

interface TabIconsInterface {
  focused: boolean;
  Icon: React.FC<any>;
  size: number;
  color: string;
}

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ROUTES: Record<
  keyof MainTabParamList,
  {
    component: React.ComponentType<any>;
    icon: React.FC<any>;
    activeIcon: React.FC<any>;
    label: string;
  }
> = {
  Home: {
    component: HomeScreen,
    icon: CultgigNavHomeIcon,
    activeIcon: CultgigNavHomeIcon,
    label: "Home",
  },
  Search: {
    component: SearchScreen,
    icon: CultgigNavSearchIcon,
    activeIcon: CultgigActiveSearchIcon,
    label: "Search",
  },
  Calendar: {
    component: CalendarScreen,
    icon: CultgigInactiveCalendarIcon,
    activeIcon: CultgigNavCalendarIcon,
    label: "Calendar",
  },
  Message: {
    component: ChatScreen,
    icon: CultgigNavChatIcon,
    activeIcon: CultgigActiveChatIcon,
    label: "Message",
  },
  Profile: {
    component: ProfileScreen,
    icon: CultgigNavUserIcon,
    activeIcon: CultgigNavUserIcon,
    label: "profile",
  },
};

const TabIcons = ({ focused, Icon, size, color }: TabIconsInterface) => {
  return (
    <SVG
      svgSrc={Icon}
      size={focused ? size + 2 : size}
      color={color}
      strokeWidth={focused ? 2.4 : 1.8}
    />
  );
};

const ACTIVE_PURPLE = "#6B2D5C";
export const MainTabNavigator = () => {
  const inset = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TAB_ROUTES[route.name as keyof MainTabParamList];

        return {
          headerShown: false,
          tabBarActiveTintColor: ACTIVE_PURPLE,
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            height: inset.bottom + 56,
            elevation: 4,
            paddingBottom: inset.bottom > 0 ? inset.bottom : 6,
          },
          tabBarIcon: ({ focused, color, size }) =>
            tab?.icon ? (
              <TabIcons
                focused={focused}
                color={color}
                size={size}
                Icon={focused ? tab.activeIcon : tab.icon}
              />
            ) : (
              <></>
            ),
        };
      }}
    >
      {(Object.keys(TAB_ROUTES) as Array<keyof MainTabParamList>).map(
        (name) => {
          const currentTab = TAB_ROUTES[name];
          return (
            <Tab.Screen
              component={currentTab.component}
              name={name}
              key={name}
            />
          );
        },
      )}
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};
