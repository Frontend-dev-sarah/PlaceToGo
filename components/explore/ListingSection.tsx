import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

import { ExploreContext } from '@/context/ExploreContext';
import ListRow from './ListRow';

type ListingSectionProps = {
    refresh: number
}

const ListingSection = ({ refresh }: ListingSectionProps) => {
    const { categoriedList } = useContext(ExploreContext);

    const bottomFlatListRef = React.useRef<BottomSheetFlatListMethods>(null);

    useEffect(() => {
        if (refresh) {
            bottomFlatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }
    }, [refresh]);

    return (
        <View style={styles.container}>
            <BottomSheetFlatList
                ref={bottomFlatListRef}
                ListHeaderComponent={() => <View style={{ height: 20, }}>
                    <Text style={{ textAlign: 'center' }}>{categoriedList.length} homes</Text>
                </View>}
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