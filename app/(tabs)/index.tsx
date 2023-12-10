import { View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/explore/ExploreHeader'
import ListingMap from '@/components/explore/ListingMap'
import ListingBottomSheet from '@/components/explore/ListingBottomSheet'

const Explore = () => {

    return (
        <View style={{ flex: 1, marginTop: 80 }}>
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader />
                }}
            />

            {/* <Listing /> */}
            <ListingMap />
            <ListingBottomSheet />
        </View>
    )
}

export default Explore

