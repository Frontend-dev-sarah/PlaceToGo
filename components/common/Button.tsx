import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { fontFamilyStyles } from '@/constants/Styles'

type ButtonProps = {
    btnStyles?: StyleProp<ViewStyle>,
    textStyles?: StyleProp<TextStyle>,
    primary?: boolean,
    title: string,
    iconBtn?: React.ReactNode,
    onPress: () => void,
}

const Button = ({ primary, btnStyles, textStyles, title, iconBtn, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.btnOutline, primary && { backgroundColor: Colors.primary, borderColor: Colors.primary },
                btnStyles]}>
            {iconBtn}
            <Text style={[styles.btnOutlineText, primary && { color: Colors.white }, textStyles]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: fontFamilyStyles.mon_sb,
    },
})