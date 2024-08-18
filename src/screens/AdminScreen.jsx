import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Platform, KeyboardAvoidingView
} from 'react-native';
import { Tabs } from '@components/Tabs';
import { AnnouncementsContext } from '@components/AnnouncementsContext';
import { Button } from '@components/buttons';
import { screenHeight, screenWidth, sharedColors } from '@components/constants';
import * as ImagePicker from 'expo-image-picker';
import { Calendar } from 'react-native-calendars';
import Icons from "@components/icons";

const AdminScreen = ({ navigation }) => {
  const [announcement, setAnnouncement] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(0);
  const [expiryDate, setExpiryDate] = useState('');
  const [image, setImage] = useState(null);
  const { addAnnouncement, announcements } = useContext(AnnouncementsContext);
  const tabOptions = ['HR', 'IT', 'Retails', 'Security'];

  const handleAddAnnouncement = () => {
    const newAnnouncement = {
      id: Date.now(),
      title: announcement,
      description: description,
      category: tabOptions[category],
      expiryDate: expiryDate,
      image: image,
      pinned: false,
    };
    addAnnouncement(newAnnouncement);
    setAnnouncement('');
    setDescription('');
    setExpiryDate('');
    setImage(null);
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const filteredAnnouncements = announcements.filter(
      (announcement) => announcement.category === tabOptions[category]
  );

  return (
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          >
          <View style={styles.container}>
            <Text style={styles.label}>Add Announcement</Text>
            <View style={styles.cardContainer}>
              <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
                <Tabs options={tabOptions} activeTab={category} setActiveTab={setCategory} />
              </ScrollView>
            </View>
            <ScrollView>
              <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={announcement}
                    onChangeText={setAnnouncement}
                    placeholder="Enter announcement"
                    maxLength={40}
                />
                <TextInput
                    style={[styles.input, { height: 100 }]}
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
                    [expiryDate]: { selected: true, marked: true, selectedColor: 'blue' },
                  }}
              />

              <Text style={styles.dateText}>Expiry Date: {expiryDate}</Text>

              <Button
                  style={styles.button}
                  textButton={"Pick Image"}
                  textStyle={styles.text}
                  onPress={pickImage}
              />

              <Button
                  style={styles.button}
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
    padding: 8,
    justifyContent: 'top',
    backgroundColor: '#fff',
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
  button: {
    alignItems: 'center',
    width: 0.92 * screenWidth,
    height: 0.07 * screenHeight,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: sharedColors.primaryColor,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    padding: 15,
  },
});

export default AdminScreen;
