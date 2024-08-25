// src/screens/AdminNavigationScreen.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnnouncementsScreen from '@screens/AnnouncementsScreen';
import AdminScreen from '@screens/AdminScreen';
import StatisticsScreen from '@screens/StatisticsScreen';
import DeleteAnnouncementScreen from '@screens/DeleteAnnouncementScreen';
import { sharedColors } from '@components/constants';
import Icons from "@components/icons";


const Tab = createBottomTabNavigator();

const AdminNavigationScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route },) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Announcements') {
                        iconName = 'Home';
                    } else if (route.name === 'Add') {
                        iconName = 'Date';
                    } else if (route.name === 'Delete') {
                        iconName = 'Trash';
                    } else if (route.name === 'Statistics') {
                        iconName = 'Statistics';
                    }

                    return <Icons name={iconName} width={28} height={28} fill={color} />;
                },
                tabBarActiveTintColor: sharedColors.primaryColor,
                tabBarInactiveTintColor: "#81B9ED",
            })}
        >
            <Tab.Screen name="Announcements" component={AnnouncementsScreen} />
            <Tab.Screen name="Add" component={AdminScreen} />
            <Tab.Screen name="Delete" component={DeleteAnnouncementScreen} />
            <Tab.Screen name="Statistics" component={StatisticsScreen} />
        </Tab.Navigator>
    );
};

export default AdminNavigationScreen;

