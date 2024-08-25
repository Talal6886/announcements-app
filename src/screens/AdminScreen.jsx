import React, {useState, useContext} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Platform, KeyboardAvoidingView, Alert
} from 'react-native';
import {Tabs} from '@components/Tabs';
import {AnnouncementsContext} from '@components/AnnouncementsContext';
import {Button} from '@components/buttons';
import {screenHeight, screenWidth, sharedColors} from '@components/constants';
import * as ImagePicker from 'expo-image-picker';
import {Calendar} from 'react-native-calendars';
import Icons from "@components/icons";

const AdminScreen = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [expiryDate, setExpiryDate] = useState('');
    const [image, setImage] = useState(null);
    const {addAnnouncement, announcements} = useContext(AnnouncementsContext);
    const tabOptions = ['HR', 'IT', 'Retails', 'Security'];

    const handleAddAnnouncement = () => {
        const newAnnouncement = {
            id: Date.now(),
            title: title,
            description: description,
            category: tabOptions[category],
            expiryDate: expiryDate,
            image: image,
            pinned: false,
        };
        addAnnouncement(newAnnouncement);
        setTitle('');
        setDescription('');
        setExpiryDate('');
        setImage(null);
        Alert.alert("added announcement");
    };


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <View style={styles.container}>
                    <Tabs options={tabOptions} activeTab={category} setActiveTab={setCategory}/>


                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Enter announcement"
                                maxLength={40}
                            />
                            <TextInput
                                style={[styles.input, {height: 100}]}
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Enter description"
                                multiline
                            />
                        </View>
                        <Text style={styles.dateText}>Select Date</Text>
                        <Calendar
                            onDayPress={(day) => setExpiryDate(day.dateString)}
                            markedDates={{
                                [expiryDate]: {selected: true, marked: true, selectedColor: 'blue'},
                            }}

                        />

                        <Text style={styles.dateText}>Expiry Date: {expiryDate}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Button
                                style={styles.buttonUpload}
                                textButton={"Upload an image"}
                                textStyle={styles.textUpload}
                                onPress={pickImage}
                            />
                            <Icons name={'AttachIcon'} width={20} height={20} color={sharedColors.primaryColor}
                                   style={{ position: 'absolute', top: 35, left: 300 }}/>
                        </View>
                        <Button
                            style={styles.buttonAdd}
                            textButton={"Add Announcement"}
                            textStyle={styles.text}
                            onPress={handleAddAnnouncement}
                        />
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'top',
        backgroundColor: '#f9f9f9',
    },
    cardContainer: {
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    inputContainer: {
        paddingTop: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#0b5ada',
        padding: 10,
        marginBottom: 16,
        borderRadius: 4,
    },
    dateText: {
        marginVertical: 12,
        fontSize: 16,
    },
    buttonUpload: {
        flex: 1,
        alignItems: 'center',
        width: 0.915 * screenWidth,
        height: 0.07 * screenHeight,
        marginTop: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#E1E6EB',

    },
    buttonAdd: {
        alignItems: 'center',
        width: 0.915 * screenWidth,
        height: 0.07 * screenHeight,
        marginTop: 16,
        borderRadius: 10,
        backgroundColor: sharedColors.primaryColor,

    },
    textUpload: {
        fontSize: 16,
        color: '#5B6167',
        padding: 16,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        padding: 15,
    },
});

export default AdminScreen;
