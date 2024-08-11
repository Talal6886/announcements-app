import { Dimensions, Platform } from "react-native";

// Dimensions
export const screenHeight = Dimensions.get("window").height;
export const screenWidth = Dimensions.get("window").width;

//Colors
export const sharedColors = {
  primaryColor: "#0072DA",
  secondaryColor: "#002858",
};


export const isIOS = Platform.OS === "ios"