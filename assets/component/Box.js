import {View, Text, StyleSheet} from 'react-native';

export default function Box({children, style}){
    return(
        <View style={[styles.Box, style]}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Box: {
    backgroundColor: "#fff",
        padding: 20,
        height:100,
        width:100,

   
    },
    text: {
        height: 50,
        width: 75,
    fontSize:20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    },

})