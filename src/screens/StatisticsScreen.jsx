// src/screens/StatisticsScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { AnnouncementsContext } from '@components/AnnouncementsContext';
import { Tabs } from '@components/Tabs';

const StatisticsScreen = () => {
    const { announcements, validUsers } = useContext(AnnouncementsContext);
    const [activeTab, setActiveTab] = useState(0);
    const tabOptions = ['HR', 'IT', 'Retails', 'Security'];

    const filteredAnnouncements = announcements.filter(
        (announcement) => announcement.category === tabOptions[activeTab]
    );

    const getAnnouncementStats = (announcement) => {
        const checkedCount = announcement.checkedUsers.length;
        const uncheckedCount = validUsers.filter(user => user.role === 'employee').length - checkedCount;
        return { checkedCount, uncheckedCount };
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Announcement Statistics</Text>
            <View style={styles.tabsContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <Tabs options={tabOptions} activeTab={activeTab} setActiveTab={setActiveTab} />
                </ScrollView>
            </View>
            <FlatList
                data={filteredAnnouncements}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const { checkedCount, uncheckedCount } = getAnnouncementStats(item);
                    return (
                        <View style={styles.statContainer}>
                            <Text style={styles.announcementText}>{item.title}</Text>
                            <Text style={styles.statText}>Checked: {checkedCount}</Text>
                            <Text style={styles.statText}>Not Checked: {uncheckedCount}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    tabsContainer: {
        marginBottom: 16,
    },
    statContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    announcementText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statText: {
        fontSize: 16,
    },
});

export default StatisticsScreen;
