import {TouchableOpacity, Text, Platform} from "react-native";
import {isIOS} from "./constants";

export const Button = ({ style, textButton, onPress, textStyle }) => (
    <TouchableOpacity style={style} onPress={onPress}>
        <Text style={isIOS ? textStyle : {backgroundColor: 'Another Style for Android'}}>{textButton}</Text>
    </TouchableOpacity>
);



/*
const stylePlatform = (Platform.OS) => {
    switch (Platform.OS) {
        case "ios":
            return {

            }
    }
}*/
