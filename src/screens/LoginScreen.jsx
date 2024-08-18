// src/screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image, ImageBackground, SafeAreaView} from 'react-native';
import { AnnouncementsContext } from '@components/AnnouncementsContext';
import Icons from "@components/icons";
import {screenHeight, screenWidth, sharedColors} from "@components/constants";
import BackGroundImage from "@assets/icons/BackGroundImage.svg";
import logo from "@assets/images/Logo.png";


const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const { validUsers, setUser } = useContext(AnnouncementsContext);

    const handleLogin = () => {
        const user = validUsers.find((u) => u.id === username);
        if (user) {
            setUser(user);
            if (user.role === 'admin') {
                navigation.navigate('AdminNavigation');
            } else {
                navigation.navigate('Announcements');
            }
        } else {
            alert('Invalid username');
        }
    };

    return (
        <View style={styles.container}>
            <Icons name='Image' width={screenWidth} height={screenHeight * 0.9} fill={sharedColors.primaryColor} style={{position: 'absolute',
                top: 0,
                left: 0,}}/>
            <View style={{justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,}}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter username"
                    value={username}
                    onChangeText={setUsername}
                />
                <Button title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        borderRadius: 4,
        paddingHorizontal: 8,
        width: '80%',
    },
});

export default LoginScreen;
