import React, { createContext, useMemo } from 'react'
import listing from '@/assets/data/airbnb-listings.json'
import listingMap from '@/assets/data/airbnb-listings.geo.json'
import { ListingProps } from '@/interfaces/listing'
import { ListingMapProps } from '@/interfaces/listingMap'

type ExploreProviderProps = {
    children: React.ReactNode
}

type ExploreContextProps = {
    selectCategoriedList: (category: string) => void,
    listingData: ListingProps[],
    categoriedList: ListingProps[],
    listItem: (itemId: string) => ListingProps,
    listingMapData: ListingMapProps[]
}


export const ExploreContext = createContext<ExploreContextProps>({} as ExploreContextProps);

const ExploreProvider = ({ children }: ExploreProviderProps) => {
    const listingData = useMemo(() => listing as any, []);

    const listingMapData = useMemo(() => listingMap.features as any, [])

    const [categoriedList, setCategoriedList] = React.useState<ListingProps[]>([]);

    const selectCategoriedList = (category: string) => {
        const filteredList = listingData.filter((item: ListingProps) => item.property_type === category)
        setCategoriedList(filteredList)
        return filteredList
    }

    const listItem = (itemId: string) => listingData.find((item: ListingProps) => item.id === itemId)

    return (
        <ExploreContext.Provider value={{
            listingData,
            selectCategoriedList,
            categoriedList,
            listItem,
            listingMapData
        }}>
            {children}
        </ExploreContext.Provider>
    )
}

export default ExploreProvider