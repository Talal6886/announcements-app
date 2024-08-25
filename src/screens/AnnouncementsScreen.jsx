import React, { useContext, useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    Animated,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator, TouchableOpacity, ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AnnouncementsContext } from '@components/AnnouncementsContext';
import AnnouncementCard from '@components/AnnouncementCard';
import { screenHeight, screenWidth, sharedColors } from '@components/constants';
import { Tabs } from '@components/Tabs';
import Icons from "@components/icons";
import BGImage from "@assets/images/BGImage.png";
import BottomImage from "@assets/images/BBGImage.png";

const AnnouncementsScreen = () => {
    const { announcements, togglePinAnnouncement, markAnnouncementAsRead, user, userPinnedAnnouncements } = useContext(AnnouncementsContext);
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const tabOptions = ['HR', 'IT', 'Retails', 'Security'];

    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!user) {
            navigation.navigate('Login');
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 300); // 0.3 seconds
        }
    }, [user, navigation]);

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


    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={sharedColors.primaryColor} />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <ImageBackground source={BGImage} style={{position:'absolute', width: 400, height:400, top: -40, left: 0,right:0,bottom: 0,}}/>
                    <ImageBackground source={BottomImage} style={{position:'absolute', width: 400, height:400, top: 340, left: -30, }}/>
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
                        ListHeaderComponent={
                            <View>

                                <View style={styles.searchBarContainer}>

                                    <Icons
                                        name={'search'}
                                        width={20}
                                        height={20}
                                        fill={sharedColors.primaryColor}
                                        style={styles.searchIcon}
                                    />
                                    <TextInput
                                        style={styles.searchBar}
                                        placeholder="Search announcements..."
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                    />
                                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                                    <Icons
                                        name={'XIcon'}
                                        width={15}
                                        height={15}
                                        fill={sharedColors.primaryColor}
                                        style={styles.searchIcon}
                                    />
                                    </TouchableOpacity>
                                </View>
                                <Tabs options={tabOptions} activeTab={activeTab} setActiveTab={setActiveTab} />
                            </View>
                        }
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const emptyMessage = () => {
    return (
        <View style={styles.container}>
            <Icons name={'NoResults'} width={150} height={150} fill={sharedColors.primaryColor} style={{ position: 'absolute', top: 100, left: 100 }} />
            <View style={{ position: 'absolute', top: 275, left: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>No Results!</Text>
                <Text style={{ fontSize: 15 }}>No announcements found.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F2F2F2',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: sharedColors.primaryColor,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
        height: 40,

    },
    searchIcon: {
        marginRight: 8,
    },
    searchBar: {
        flex: 1,
        height: '100%',
        color: '#181B1E',

    },
    itemsContainer: {
        flexGrow: 1,
    },
});

export default AnnouncementsScreen;