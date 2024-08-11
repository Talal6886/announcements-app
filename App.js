// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnnouncementsScreen from '@screens/AnnouncementsScreen';
import AdminScreen from '@screens/AdminScreen';
import LoginScreen from '@screens/LoginScreen';
import StatisticsScreen from '@screens/StatisticsScreen';
import AdminNavigationScreen from '@screens/AdminNavigationScreen';
import { AnnouncementsProvider } from '@components/AnnouncementsContext';
import DeleteAnnouncementScreen from '@screens/DeleteAnnouncementScreen';
import { sharedColors } from '@components/constants';

const Stack = createStackNavigator();

const App = () => {
    return (
        <AnnouncementsProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: sharedColors.primaryColor,
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
                    <Stack.Screen name="Admin" component={AdminScreen} />
                    <Stack.Screen name="DeleteAnnouncement" component={DeleteAnnouncementScreen} />
                    <Stack.Screen name="Statistics" component={StatisticsScreen} />
                    <Stack.Screen name="AdminNavigation" component={AdminNavigationScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </AnnouncementsProvider>
    );
};

export default App;
