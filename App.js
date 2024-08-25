import React, {Fragment} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, ActivityIndicator, SafeAreaView, StatusBar, ImageBackground} from 'react-native';
import { AnnouncementsProvider } from '@components/AnnouncementsContext';
import { sharedColors } from '@components/constants';

import AnnouncementsScreen from '@screens/AnnouncementsScreen';
import AdminScreen from '@screens/AdminScreen';
import LoginScreen from '@screens/LoginScreen';
import StatisticsScreen from '@screens/StatisticsScreen';
import AdminNavigationScreen from '@screens/AdminNavigationScreen';
import DeleteAnnouncementScreen from '@screens/DeleteAnnouncementScreen';
import BGImage from "@assets/images/BGImage.png";


const Stack = createStackNavigator();

const App = () => {
    return (
        <Fragment>
            <SafeAreaView style={{ flex:0, backgroundColor: '#F2F2F2' }} />
            <ImageBackground source={BGImage} style={{position:'absolute', width: 400, height:400, top: -40, left: 0}}/>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
                <ImageBackground source={BGImage} style={{position:'absolute', width: 400, height:400, top: 700, left: 10}}/>
            <StatusBar barStyle="default" />
        <AnnouncementsProvider>
            <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{
                            headerShown: false,
                            headerStyle: {
                                backgroundColor: sharedColors.primaryColor,
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
        </SafeAreaView>

        </Fragment>
    );
};

export default App;

