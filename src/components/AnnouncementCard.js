// AnnouncementCard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icons from '@components/icons';
import { sharedColors } from '@components/constants';

const AnnouncementCard = ({ title, description,remainingDays, expireDate, image, pinned, onPinPress, onCheckPress, isChecked }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [read, setRead] = useState(false);
    const getImageSource = () => {
        if (typeof image === 'number') {
            return image;
        }
        return { uri: image };
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
        if (!isChecked) {
            onCheckPress();
            setRead(true);
        }
    };

    return (
        <View style={[styles.card, pinned && styles.pinned]}>
            {image && <Image source={getImageSource()} style={styles.image} />}
            <View style={styles.contentRow}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.icons}>
                    <TouchableOpacity onPress={onPinPress}>
                        {pinned ? (
                            <Icons name={'PinFill'} width={20} height={20}  fill={sharedColors.primaryColor} />
                        ) : (
                            <Icons name={'PinOutline'} width={20} height={20} fill={sharedColors.primaryColor} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.description}>
                {showFullDescription ? description : `${description.slice(0, 100)}...`}
            </Text>
            <TouchableOpacity onPress={toggleDescription}>
                <Text style={styles.showMore}>
                    {showFullDescription ? 'Show less' : 'Show more'}
                </Text>
            </TouchableOpacity>
            <View style={styles.contentRow}>
                <Text style={styles.expireDate}>Expires in {remainingDays} days on {expireDate}</Text>
            <View style={styles.markRead}>
            {isChecked &&
                <Icons name={'Check'} width={20} height={20}  fill={sharedColors.primaryColor} />

            }
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        marginBottom: 8,
    },
    pinned: {
        borderColor: '#5697ff',
        borderWidth: 2,
        borderRadius: 10,
    },
    title: {
        padding: 8,
        width: '85%',
        fontSize: 22,
        fontWeight: 'bold',
        color: sharedColors.primaryColor,
    },
    description: {
        padding: 8,
        fontSize: 14,
        marginVertical: 4,
        color: 'black',
    },
    showMore: {
        padding: 8,
        fontSize: 14,
        color: sharedColors.primaryColor,
        textAlign: 'center',
    },
    expireDate: {
        padding: 8,
        fontSize: 12,
        color: '#EF4A4A',
    },
    icons: {
        alignItems: 'center',
        position: 'absolute',
        marginLeft: 312.5,
        paddingTop: 8,
    },
    contentRow: {
        flexDirection: 'row',
    },
    markRead:{
        alignItems: 'center',
        position:"absolute",
        marginLeft: 312.5,
    },

});

export default AnnouncementCard;
