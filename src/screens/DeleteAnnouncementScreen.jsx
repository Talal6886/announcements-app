// src/screens/DeleteAnnouncementScreen.js
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { AnnouncementsContext } from "@components/AnnouncementsContext";
import { Button } from "@components/buttons";
import { Tabs } from "@components/Tabs";
import { screenHeight, screenWidth, sharedColors } from "@components/constants";
import Icons from "@components/icons";
import { deleteAnnouncements } from "src/services/announcementAPI";
import { useRoute } from "@react-navigation/native";
import { getAnnouncements } from "src/services/announcementAPI";

const DeleteAnnouncementScreen = () => {
  const route = useRoute();
  const { announcements, removeAnnouncement } =
    useContext(AnnouncementsContext);
  const tabOptions = ["HR", "IT", "Retails", "Security"];
  const [activeTab, setActiveTab] = useState(0);

  const [APIannouncements, setAPIannouncements] = useState([]);
  useEffect(() => {
    const fetchAnnouncement = async () => {
      const response = await getAnnouncements();
      setAPIannouncements(response);
    };
    fetchAnnouncement();
  }, []);

  const filteredAnnouncements = APIannouncements.filter(
    (announcement) => announcement.category === tabOptions[activeTab]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
        <ScrollView horizontal={true}>
          <Tabs
            options={tabOptions}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </ScrollView>
      </View>

      <ScrollView>
        {filteredAnnouncements.map((announcement) => (
          <View key={announcement.id} style={styles.announcementContainer}>
            <Text>{announcement.title}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => deleteAnnouncements(announcement.id)}
              >
                <Icons name={"Delete"} width={30} height={30} fill={"red"} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: "top",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  tabsContainer: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  announcementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
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
    fontWeight: "bold",
    color: "white",
    padding: 7,
  },
  iconContainer: {
    position: "absolute",
    marginLeft: 338,
  },
});

export default DeleteAnnouncementScreen;
