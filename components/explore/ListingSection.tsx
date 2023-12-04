import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ListingSection = () => {
    return (
        <View style={styles.container}>
            <Text>ListingView</Text>
        </View>
    )
}

export default ListingSection

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})