import React, { useContext, useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Animated,
    ScrollView,
    KeyboardAvoidingView, Platform, Image, ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AnnouncementsContext } from '@components/AnnouncementsContext';
import AnnouncementCard from '@components/AnnouncementCard';
import { screenHeight, screenWidth, sharedColors } from '@components/constants';
import { Tabs } from '@components/Tabs';
import Icons from "@components/icons";
import BackGroundImage from '@assets/images/announcements.png';

const AnnouncementsScreen = () => {
    const { announcements, togglePinAnnouncement, markAnnouncementAsRead, user, userPinnedAnnouncements } = useContext(AnnouncementsContext);
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();
    const tabOptions = ['HR', 'IT', 'Retails', 'Security'];

    const scrollY = useRef(new Animated.Value(0)).current;

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

    const userPins = userPinnedAnnouncements[user.id] || [];

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [100, 0],
        extrapolate: 'clamp',
    });

    const searchBarOpacity = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
            <View style={styles.container}>

                <Animated.View style={[styles.header, { height: headerHeight }]}>
                    <Animated.View style={[styles.searchBarContainer, { opacity: searchBarOpacity }]}>
                        <Icons
                            name={'search'}
                            width={16}
                            height={16}
                            fill={sharedColors.primaryColor}
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </Animated.View>
                    <Animated.View style={{ opacity: searchBarOpacity }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <Tabs options={tabOptions} activeTab={activeTab} setActiveTab={setActiveTab} />
                        </ScrollView>
                    </Animated.View>
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
                                onCheckPress={() => handleCheckPress(item.id)}
                                isChecked={item.checkedUsers.includes(user.id)}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={<View style={{ height: 16 }} />}
                    ListEmptyComponent={emptyMessage}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                />
            </View>
            </KeyboardAvoidingView>

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
    header: {
        overflow: 'hidden',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#0b5ada',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 8,
        height: 40,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchBar: {
        flex: 1,
        fontSize:16,
        height: '100%',
        color: '#000',

    },
    itemsContainer: {
        flexGrow: 1,
    },

});

export default AnnouncementsScreen;
