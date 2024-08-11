import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export const Icons = ({ nameIcon, sizeIcon, colorIcon}) => (
    <Icon name={nameIcon} size={sizeIcon} color={colorIcon} />
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-end",
    }
})