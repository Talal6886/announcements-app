// src/screens/DeleteAnnouncementScreen.js
import React, { useContext, useState } from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { AnnouncementsContext } from '@components/AnnouncementsContext';
import { Button } from '@components/buttons';
import { Tabs } from '@components/Tabs';
import { screenHeight, screenWidth, sharedColors } from '@components/constants';
import Icons from "@components/icons";

const DeleteAnnouncementScreen = () => {
    const { announcements, removeAnnouncement } = useContext(AnnouncementsContext);
    const tabOptions = ['HR', 'IT', 'Retails', 'Security'];
    const [activeTab, setActiveTab] = useState(0);

    const filteredAnnouncements = announcements.filter(
        (announcement) =>
            announcement.category === tabOptions[activeTab] &&
            new Date(announcement.expiryDate) > new Date()
    );

    return (
        <SafeAreaView style={{flex: 1}}>

            <View style={styles.container}>
            <View style={styles.tabsContainer}>
                    <Tabs options={tabOptions} activeTab={activeTab} setActiveTab={setActiveTab} />
            </View>

            <ScrollView>
                {filteredAnnouncements.map((announcement) => (
                    <View key={announcement.id} style={styles.announcementContainer}>
                        <Text>{announcement.title}</Text>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => removeAnnouncement(announcement.id)}>
                                <Icons
                                name={'Delete'}
                                width={30}
                                height={30}
                                fill={'red'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                ))}

            </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'top',
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    tabsContainer: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    announcementContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width:'100%'
    },
    removeButton: {
        alignItems: "center",
        width: 0.2 * screenWidth,
        height: 0.04 * screenHeight,
        borderRadius: 10,
        backgroundColor: sharedColors.primaryColor,
    },
    removeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        padding: 7,
    },
    iconContainer: {
        position: 'absolute',
        marginLeft:315,
    }
});

export default DeleteAnnouncementScreen;
