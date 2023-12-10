import { StyleSheet } from 'react-native';
import React, { useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import ListingSection from './ListingSection';
import MapButton from './MapButton';


const ListingBottomSheet = () => {
    const snapPoints = useMemo(() => ['15%', '100%'], []);
    const [refresh, setRefresh] = React.useState<number>(0);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const onShowMap = () => {
        bottomSheetRef.current?.collapse()
        setRefresh(refresh + 1)
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            //set inital snap point, listing sheet is openend by default
            index={1}
            snapPoints={snapPoints}
        >
            <ListingSection refresh={refresh} />
            <MapButton onShowMap={onShowMap} />
        </BottomSheet>
    )
}

export default ListingBottomSheet

const styles = StyleSheet.create({})