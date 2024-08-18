// src/screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native';
import { AnnouncementsContext } from '@components/AnnouncementsContext';
import Icons from "@components/icons";
import {sharedColors} from "@components/constants";


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

            <Icons name='anb' width={50} height={50} fill={sharedColors.primaryColor} />
                <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter username"
                value={username}
                onChangeText={setUsername}
            />
            <Button title="Login" onPress={handleLogin} />

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
