import {Text, TouchableOpacity, View, StyleSheet, ScrollView} from "react-native";
import { screenHeight, screenWidth, sharedColors } from "@components/constants";
import React from "react";

export const Tabs = ({ options, activeTab, setActiveTab }) => {
  return (
      <View style={styles.switchContainer}>
        <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}>
          {options.map((item, index) => (
              <TouchableOpacity
                  key={index}
                  style={[
                    styles.switchButton,
                    activeTab === index && styles.switchButtonActive,
                  ]}
                  onPress={setActiveTab.bind(this, index)}
              >
                <Text
                    style={[
                      styles.switchButtonText,
                      activeTab === index && styles.activeText,
                    ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
  );
};

const styles = StyleSheet.create({

  switchContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    padding:2.5,
    borderWidth:1,
    borderColor: sharedColors.primaryColor,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 64,
    marginBottom: 16,
  },
  switchButton: {
    padding: 10,
    borderRadius: 64,
    width: 90, // Consistent width
    height: 0.044 * screenHeight,
    alignItems: "center",
  },
  switchButtonActive: {
    backgroundColor: "#ccc",
    width: 90, // Consistent width
    height: 0.044 * screenHeight,
    alignItems: "center",
  },
  switchButtonText: {
    fontSize: 13,
    color: 'black',
    fontFamily:'IBMPlexSansSemiBold',
  },
  activeText: {
    color: sharedColors.primaryColor, // Active text color
  },
});
