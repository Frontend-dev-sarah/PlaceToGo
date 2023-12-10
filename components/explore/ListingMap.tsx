import { StyleSheet, Text, View } from 'react-native';
import React, { memo, useContext } from 'react';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { ExploreContext } from '@/context/ExploreContext';
import { ListingMapProps } from '@/interfaces/listingMap';
import { useRouter } from 'expo-router';
import { fontFamilyStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const ListingMap = memo(() => {
    const { listingMapData } = useContext(ExploreContext);
    const router = useRouter();

    const INITIAL_REGION = {
        latitude: 52.4929,
        longitude: 13.3285,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const onMarkerSelected = (item: ListingMapProps) => {
        router.push(`/listing/${item.properties.id}`)
    }

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster;

        const points = properties.point_count;
        return (
            <Marker
                key={`cluster-${id}`}
                coordinate={{
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1],
                }}
                onPress={onPress}>
                <View style={styles.marker}>
                    <Text
                        style={{
                            color: '#000',
                            textAlign: 'center',
                            fontFamily: 'mon-sb',
                        }}>
                        {points}
                    </Text>
                </View>
            </Marker>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <MapView
                animationEnabled={false}
                clusterTextColor='#000'
                clusterColor='#fff'
                clusterFontFamily={fontFamilyStyles.mon}
                renderCluster={(cluster: any) => (<Marker
                    key={`cluster-${cluster.id}`}
                    onPress={cluster.onPress}
                    coordinate={{ longitude: cluster.geometry.coordinates[0], latitude: cluster.geometry.coordinates[1] }}>
                    <View style={[styles.marker, { backgroundColor: Colors.grey }]}>
                        <Text style={styles.markerText}>{cluster.properties.point_count}</Text>
                    </View>
                </Marker>)}
                showsUserLocation
                showsMyLocationButton
                provider={PROVIDER_GOOGLE}
                style={StyleSheet.absoluteFillObject}
                initialRegion={INITIAL_REGION}
            >
                {listingMapData.map((item) => (
                    <Marker
                        key={item.properties.id}
                        onPress={() => onMarkerSelected(item)}
                        coordinate={{ latitude: +item.properties.latitude, longitude: +item.properties.longitude }}
                    >
                        <View style={styles.marker}>
                            <Text
                                style={{
                                    color: '#000',
                                    textAlign: 'center',
                                    fontFamily: 'mon-sb',
                                }}>
                                {item.properties.price}€
                            </Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    )
})

export default ListingMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontFamily: fontFamilyStyles.mon,
        color: Colors.white,
    },
    locateBtn: {
        position: 'absolute',
        top: 70,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
});