import { View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/explore/ExploreHeader'
import Listing from '@/components/explore/ListingSection'

const Explore = () => {
    return (
        <View style={{ flex: 1, marginTop: 140 }}>
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader />
                }}
            />
            <Listing />
        </View>
    )
}

export default Explore

