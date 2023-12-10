import { Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ExploreContext } from '@/context/ExploreContext';
import Colors from '@/constants/Colors';
import Animated, { SlideInDown, interpolate, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles, winHeight, winWidth } from '@/constants/Styles';

const ListDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { listItem } = useContext(ExploreContext);
    const navigation = useNavigation();

    const { xl_picture_url, bedrooms, name, smart_location, room_type, guests_included, bathrooms, beds, number_of_reviews, review_scores_rating, host_since, host_name, price, host_picture_url, description, listing_url } = listItem(id);

    const scrollRef = React.useRef<Animated.ScrollView>(null);
    const scrollOffset = useScrollViewOffset(scrollRef);
    const shareListing = async () => {
        try {
            await Share.share({
                title: name,
                url: listing_url,
            });
        } catch (err) {
            console.log(err);
        }
    };
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, winHeight / 2.5 / 1.5], [0, 1]),
        };
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerTransparent: true,
            headerBackground: () => (
                <Animated.View style={[headerAnimatedStyle, styles.header]}></Animated.View>
            ),
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
                        <Ionicons name="share-outline" size={22} color={'#000'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons name="heart-outline" size={22} color={'#000'} />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={'#000'} />
                </TouchableOpacity>
            ),
        });
    }, []);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-winHeight / 2.5, 0, winHeight / 2.5],
                        [winHeight / 5, 0, winHeight / 2.5 * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-winHeight / 2.5, 0, winHeight / 2.5],
                        [2, 1, 1])
                }
            ],

        }
    })

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                ref={scrollRef}
                scrollEventThrottle={16}>
                <Animated.Image
                    source={{ uri: xl_picture_url }}
                    style={[styles.image, imageAnimatedStyle]}
                    resizeMode="cover"
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.location}>
                        {room_type} in {smart_location}
                    </Text>
                    <Text style={styles.rooms}>
                        {guests_included} guests · {bedrooms} bedrooms · {beds} bed ·{' '}
                        {bathrooms} bathrooms
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Ionicons name="star" size={16} />
                        <Text style={styles.ratings}>
                            {review_scores_rating / 20} · {number_of_reviews} reviews
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.hostView}>
                        <Image source={{ uri: host_picture_url }} style={styles.host} />
                        <View>
                            <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by {host_name}</Text>
                            <Text>Host since {host_since}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.description}>{description}</Text>
                </View>
            </Animated.ScrollView>
            <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.footerText}>
                        <Text style={styles.footerPrice}>€{price}</Text>
                        <Text>night</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}>
                        <Text style={defaultStyles.btnText}>Reserve</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        height: winHeight / 2.5,
        width: winWidth,
    },
    infoContainer: {
        padding: 24,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'mon-sb',
    },
    location: {
        fontSize: 18,
        marginTop: 10,
        fontFamily: 'mon-sb',
    },
    rooms: {
        fontSize: 16,
        color: Colors.grey,
        marginVertical: 4,
        fontFamily: 'mon',
    },
    ratings: {
        fontSize: 16,
        fontFamily: 'mon-sb',
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.grey,
        marginVertical: 16,
    },
    host: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.grey,
    },
    hostView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    footerText: {
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    footerPrice: {
        fontSize: 18,
        fontFamily: 'mon-sb',
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.primary,
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    header: {
        backgroundColor: '#fff',
        height: 100,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
    },

    description: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: 'mon',
    },
});

export default ListDetails
