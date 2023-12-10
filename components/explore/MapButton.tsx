import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

type MapButtonProps = {
    onShowMap: () => void
}

const MapButton = ({ onShowMap }: MapButtonProps) => {
    return (
        <View style={styles.absoluteView}>
            <TouchableOpacity onPress={onShowMap} style={styles.btn}>
                <Text style={{ fontFamily: 'mon-sb', color: '#fff' }}>Map</Text>
                <Ionicons name="map" size={20} style={{ marginLeft: 10 }} color={'#fff'} />
            </TouchableOpacity>
        </View>
    )
}

export default MapButton

const styles = StyleSheet.create({
    absoluteView: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 14,
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
        marginHorizontal: 'auto',
        alignItems: 'center',
    },
});