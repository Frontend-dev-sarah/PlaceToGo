import { FlatList, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { ExploreContext } from '@/context/ExploreContext';
import ListRow from './ListRow';

const ListingSection = () => {
    const { categoriedList } = useContext(ExploreContext);

    return (
        <View style={styles.container}>
            <FlatList
                data={categoriedList}
                renderItem={({ item }) => <ListRow listItem={item} />}
                keyExtractor={(item) => item.id.toString()} />
        </View>
    )
}

export default ListingSection

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})