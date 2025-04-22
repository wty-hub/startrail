import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Header from "../components/Header";
import { Icon } from "@ui-kitten/components";
import Diaries from "../screens/Diaries";
import DateSelector from "../screens/DateSelector";
import AccountBook from "../screens/AccountBook";

const Tab = createBottomTabNavigator();

const AppNavagation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#6A5ACD",
          tabBarInactiveTintColor: "#6c757d",
          tabBarStyle: {
            height: 50,
            bottom: 35,
            marginHorizontal: 50,
            borderRadius: 30,
            position: "absolute",
          },
          tabBarItemStyle: {
            paddingVertical: 5,
          },
          header: ({ navigation, route, options }) => {
            return (
              <Header
                title={options.tabBarLabel?.toString()}
                navigation={navigation}
                // @ts-ignore
                hideBack={options?.hideBack ?? true}
                accessoryRight={options.headerRight}
              />
            );
          },
        }}
        backBehavior="firstRoute"
      >
        <Tab.Screen
          name="Diaries"
          component={Diaries}
          options={{
            tabBarButtonTestID: "Tab.Diaries",
            tabBarLabel: "日记",
            tabBarIcon: ({ color }) => (
              <Icon style={styles.icon} fill={color} name="list-outline" />
            ),
            // @ts-ignore
            hideBack: true,
          }}
        />
        <Tab.Screen
          name="AccountBook"
          component={AccountBook}
          options={{
            tabBarButtonTestID: "Tab.AccountBook",
            tabBarLabel: "账本",
            tabBarIcon: ({ color }) => (
              <Icon
                style={styles.icon}
                fill={color}
                name="credit-card-outline"
              />
            ),
            // @ts-ignore
            hideBack: true,
          }}
        />
        <Tab.Screen
          name="DateSelector"
          component={DateSelector}
          options={{
            tabBarButtonTestID: "Tab.DateSelector",
            tabBarLabel: "选择日期",
            tabBarIcon: ({ color }) => (
              <Icon style={styles.icon} fill={color} name="calendar-outline" />
            ),
            // @ts-ignore
            hideBack: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

export default AppNavagation;