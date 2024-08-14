import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import { AnnouncementsContext } from '@components/AnnouncementsContext';
import { Tabs } from '@components/Tabs';
import Icons from "@components/icons";

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
                    const totalCount = uncheckedCount + checkedCount;
                    const progress = checkedCount / totalCount;
                    const formattedAddDate = new Date(item.id).toLocaleDateString("en-US"); // Assuming id is a timestamp
                    const formattedExpireDate = new Date(item.expiryDate).toLocaleDateString("en-US");

                    return (
                        <View style={styles.statContainer}>
                            <Text style={styles.announcementText}>{item.title}</Text>
                            <Text style={styles.dateText}>Added: {formattedAddDate}</Text>
                            <Text style={styles.dateText}>Expires: {formattedExpireDate}</Text>
                            <View style={styles.iconRow}>
                                <View style={styles.iconWithText}>
                                    <Icons name={"People"} width={30} height={30} fill={"#2196F3"} />
                                    <Text style={styles.statText}>{totalCount}</Text>
                                </View>
                                <View style={styles.iconWithText}>
                                    <Icons name={"EyeOff"} width={30} height={30} fill={"#F44336"}/>
                                    <Text style={styles.statText}>{uncheckedCount}</Text>
                                </View>
                                <View style={styles.iconWithText}>
                                    <Icons name={"EyeOpen"} width={30} height={30} fill={"#4CAF50"} />
                                    <Text style={styles.statText}>{checkedCount}</Text>
                                </View>
                                <View style={styles.iconWithText}>
                                    <Progress.Circle progress={progress} size={100} color="#2196F3" showsText={true} textStyle={{ fontWeight: 'bold', marginBottom: 12 }} />
                                    <Text style={styles.progressText}>Completed</Text>
                                </View>
                            </View>
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
        marginBottom: 8,
    },
    dateText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconWithText: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    statText: {
        fontSize: 16,
        marginLeft: 8,
    },
    progressText: {
        marginTop: 55,
        fontSize: 14,
        color: "#2196F3",
        position: "absolute",
    },
});

export default StatisticsScreen;
