import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const NavbarHaut = () => {
    const [selectedText, setSelectedText] = useState("All");

    const handlePress = (text: any) => {
        setSelectedText(text);
    };

    return (
        <View style={styles.navContainer}>
            {
                ["All", "Romance", "Sport", "Kids", "Horror"].map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                        <Text style={[styles.textStyle, selectedText === item && styles.selectedTextStyle]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    navContainer: {
        position: 'absolute',
        top: 50,
        backgroundColor: 'rgba(66, 66, 63, 0.65)',
        borderRadius: 90,
        opacity: 100,
        height: 47,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textStyle: {
        color: 'white',
        fontSize: 17
    },
    selectedTextStyle: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 90,
        padding: 10,
    }
});

export default NavbarHaut;