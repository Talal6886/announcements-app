// src/screens/AdminNavigationScreen.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnnouncementsScreen from '@screens/AnnouncementsScreen';
import AdminScreen from '@screens/AdminScreen';
import StatisticsScreen from '@screens/StatisticsScreen';
import DeleteAnnouncementScreen from '@screens/DeleteAnnouncementScreen';
import { sharedColors } from '@components/constants';
import {Icons} from "@components/icons";

const Tab = createBottomTabNavigator();

const AdminNavigationScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Announcements') {
                        iconName = 'home';
                    } else if (route.name === 'Add') {
                        iconName = 'clipboard-plus';
                    } else if (route.name === 'Delete') {
                        iconName = 'trash-can';
                    } else if (route.name === 'Statistics') {
                        iconName = 'chart-box-outline';
                    }

                    return <Icons nameIcon={iconName} sizeIcon={size} colorIcon={color} />;
                },
                tabBarActiveTintColor: sharedColors.primaryColor,
                tabBarInactiveTintColor: 'gray',
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
