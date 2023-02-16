import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
const Tab = createBottomTabNavigator();
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";

import CartIcon from "../Shared/CartIcon";
import Login from "../Screens/User/Login";

const Main = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: "#edb81a",
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}

                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="home"
                            style={{ position: 'relative' }}
                            color={color}
                            size={30}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon name="shopping-cart"
                                style={{ position: 'relative' }}
                                color={color}
                                size={30}
                            />
                            <CartIcon />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Admin"

                component={HomeNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="cog"
                            color={color}
                            size={30}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="user" color={color} size={30} />
                    ),
                }}
            />

        </Tab.Navigator>
    )
}
export default Main;