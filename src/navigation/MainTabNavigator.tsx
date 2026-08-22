import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import CalendarScreen from "@/screens/ScheduleEvent/CalendarSceen";
import SearchScreen from "@/screens/Search/SearchScreen";
import { theme } from "../theme";
import { MainTabParamList } from "./types";
import CultgigNavCalendarIcon from "../../assets/icons/cultgig-nav-calendar-icon.svg";
import CultgigNavChatIcon from "../../assets/icons/cultgig-nav-chat-icon.svg";
import CultgigNavHomeIcon from "../../assets/icons/cultgig-nav-home-icon.svg";
import CultgigNavSearchIcon from "../../assets/icons/cultgig-nav-search-icon.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SVG } from "@/components/common/SVG";

interface TabIconsInterface {
  focused: boolean;
  Icon: React.FC<any>;
  size: number;
  color: string;
}

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ROUTES: Record<
  keyof MainTabParamList,
  { component: React.ComponentType<any>; icon: React.FC<any>; label: string }
> = {
  Home: { component: HomeScreen, icon: CultgigNavHomeIcon, label: "Home" },
  Search: {
    component: SearchScreen,
    icon: CultgigNavSearchIcon,
    label: "Search",
  },
  Calendar: {
    component: CalendarScreen,
    icon: CultgigNavCalendarIcon,
    label: "Calendar",
  },
  Message: {
    component: ChatScreen,
    icon: CultgigNavChatIcon,
    label: "Message",
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
const INACTIVE_GRAY = "#94A3B8";
export const MainTabNavigator = () => {
  const inset = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TAB_ROUTES[route.name as keyof MainTabParamList];

        return {
          headerShown: false,
          tabBarActiveTintColor: ACTIVE_PURPLE,
          tabBarInactiveTintColor: INACTIVE_GRAY,
          tabBarShowLabel: false,
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
                Icon={tab.icon}
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
