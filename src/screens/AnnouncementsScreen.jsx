import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, TextInput, FlatList, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AnnouncementsContext } from '@components/AnnouncementsContext';
import AnnouncementCard from '@components/AnnouncementCard';
import { screenHeight, screenWidth, sharedColors } from '@components/constants';
import { Tabs } from '@components/Tabs';
import Icons from "@components/icons";

const AnnouncementsScreen = () => {
    const { announcements, togglePinAnnouncement, markAnnouncementAsRead, user, userPinnedAnnouncements } = useContext(AnnouncementsContext);
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const [scrollY] = useState(new Animated.Value(0)); // Add Animated.Value for scroll position
    const navigation = useNavigation();
    const tabOptions = ['HR', 'IT', 'Retails', 'Security'];

    useEffect(() => {
        if (!user) {
            navigation.navigate('Login');
        }
    }, [user]);

    if (!user) {
        return null;
    }

    const filteredAnnouncements = announcements
        .filter(
            (announcement) =>
                announcement.category === tabOptions[activeTab] &&
                new Date(announcement.expiryDate) > new Date() &&
                (announcement.title ? announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) : false)
        )
        .sort((a, b) => {
            const userPinsA = userPinnedAnnouncements[user.id] || [];
            const userPinsB = userPinnedAnnouncements[user.id] || [];
            const isPinnedA = userPinsA.includes(a.id);
            const isPinnedB = userPinsB.includes(b.id);
            return isPinnedB - isPinnedA;
        });


    const calculateRemainingDays = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const timeDiff = expiry - today;
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    };

    const handlePinPress = (id) => {
        togglePinAnnouncement(id, user.id);
    };

    const handleCheckPress = (id) => {
        markAnnouncementAsRead(id, user.id);
    };

    const handleSearchIconPress = () => {
        setIsSearchBarVisible(true);
    };

    const handleScroll = (event) => {
        Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
        })(event);
    };

    const searchBarTranslate = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0, -50],
        extrapolate: 'clamp',
    });

    const tabsTranslate = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0, -50],
        extrapolate: 'clamp',
    });

    const userPins = userPinnedAnnouncements[user.id] || [];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.searchBarContainer,
                        { transform: [{ translateY: searchBarTranslate }] },
                    ]}
                >
                    {!isSearchBarVisible ? (
                        <TouchableOpacity onPress={handleSearchIconPress}>
                            <Icons
                                name={'anb'}
                                width={35}
                                height={35}
                                fill={sharedColors.primaryColor}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search announcements..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    )}
                </Animated.View>

                <Animated.View
                    style={[
                        styles.tabsContainer,
                        { transform: [{ translateY: tabsTranslate }] },
                    ]}
                >
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Tabs options={tabOptions} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </ScrollView>
                </Animated.View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filteredAnnouncements}
                    renderItem={({ item }) => (
                        <View style={styles.itemsContainer}>
                            <AnnouncementCard
                                title={item.title}
                                description={item.description}
                                remainingDays={calculateRemainingDays(item.expiryDate)}
                                expireDate={new Date(item.expiryDate).toLocaleDateString("en-US")}
                                image={item.image}
                                pinned={userPins.includes(item.id)}
                                onPinPress={() => handlePinPress(item.id)}
                                onCheckPress={() => handleCheckPress(item.id)} // No longer needed
                                isChecked={item.checkedUsers.includes(user.id)}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={<View style={{ height: 16 }} />}
                    ListEmptyComponent={emptyMessage}
                    onScroll={handleScroll}
                />
            </View>
        </SafeAreaView>
    );
};

const emptyMessage = () => {
    return (
        <Text>No announcements found.</Text>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,

    },
    tabsContainer: {
        backgroundColor: '#f9f9f9',
        marginBottom: 8,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        width: screenWidth - 32,

    },
    itemsContainer: {
        flexGrow: 1,

    },
});

export default AnnouncementsScreen;
