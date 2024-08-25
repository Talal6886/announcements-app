import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Icons from '@components/icons';
import { sharedColors } from '@components/constants';

const AnnouncementCard = ({ title, description, remainingDays, expireDate, image, pinned, onPinPress, onCheckPress, isChecked }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

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
        }
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <View style={[styles.card, pinned && styles.pinned]}>
            {image && (
                <TouchableOpacity onPress={toggleModal}>
                    <Image source={getImageSource()} style={styles.image} />
                </TouchableOpacity>
            )}
            <Modal visible={isModalVisible} transparent={true}>
                <TouchableOpacity style={styles.modalContainer} onPress={toggleModal}>
                    <Image source={getImageSource()} style={styles.fullScreenImage} />
                </TouchableOpacity>
            </Modal>
            <View style={styles.contentRow}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.icons}>
                    <TouchableOpacity onPress={onPinPress}>
                        {pinned ? (
                            <Icons name={'PinFill'} width={20} height={20} fill={sharedColors.primaryColor} />
                        ) : (
                            <Icons name={'PinOutline'} width={20} height={20} fill={sharedColors.primaryColor} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.description}>
                {showFullDescription ? description : `${description.slice(0, 150)}...`}
            </Text>
            <TouchableOpacity onPress={toggleDescription}>
                <Text style={styles.showMore}>
                    {showFullDescription ? 'Show less' : 'Show more'}
                </Text>
            </TouchableOpacity>
            <View style={styles.contentRow}>
                <Text style={styles.expireDate}>Expires in {remainingDays} days on {expireDate}</Text>
                <View style={styles.markRead}>
                    {isChecked && <Icons name={'Check'} width={15} height={15} fill={sharedColors.primaryColor} />}
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
        borderColor: '#E5E6E5',
        borderWidth: 1,
        shadowOpacity: 0.2,
        opacity:0.9
    },
    image: {
        width: '100%',
        height: 200,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        marginBottom: 8,
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    pinned: {
        borderColor: '#5697ff',
        borderWidth: 1.5,
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
        color: '#4E5D6B',
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
    markRead: {
        alignItems: 'center',
        position: 'absolute',
        marginLeft: 312.5,
    },
});

export default AnnouncementCard;
