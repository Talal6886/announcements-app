import {Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { screenHeight, screenWidth, sharedColors } from "@components/constants";

export const Tabs = ({ options, activeTab, setActiveTab }) => {
  return (
      <View style={styles.switchContainer}>
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
      </View>
  );
};

const styles = StyleSheet.create({

  switchContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    padding:2.5,
    borderWidth:1,
    borderColor: '#0b5ada',
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,

  },
  switchButton: {
    padding: 10,
    borderRadius: 5,
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
    fontWeight: "bold",
  },
  activeText: {
    color: sharedColors.primaryColor, // Active text color
  },
});
