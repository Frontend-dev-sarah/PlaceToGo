import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarLabelStyle: { fontFamily: 'mon-sb' }
            }}
        >
            <Tabs.Screen name="index"
                options={{
                    tabBarLabel: "Explore",
                    tabBarIcon: ({ color, size }) => <Ionicons name='search' color={color} size={size} />
                }}
            />
            <Tabs.Screen name="wishlists"
                options={{
                    tabBarLabel: "Wishlists",
                    tabBarIcon: ({ color, size }) => <AntDesign name='hearto' color={color} size={size} />
                }}
            />
            <Tabs.Screen name="trips"
                options={{
                    tabBarLabel: "Trips",
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name='airbnb' color={color} size={size} />
                }}
            />
            <Tabs.Screen name="inbox"
                options={{
                    tabBarLabel: "Inbox",
                    tabBarIcon: ({ color, size }) => <AntDesign name='message1' color={color} size={size} />
                }}
            />
            <Tabs.Screen name="profile"
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons
                        name='face-man-profile' color={color} size={size} />
                }}
            />
        </Tabs>
    )
}
export default Layout