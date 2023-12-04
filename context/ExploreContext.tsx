import React, { createContext, useMemo } from 'react'
import listing from '@/assets/data/airbnb-listings.json'
import { ListingProps } from '@/interfaces/listing'

type ExploreProviderProps = {
    children: React.ReactNode
}

type ExploreContextProps = {
    selectCategoriedList: (category: string) => void,
    listingData: ListingProps[],
    categoriedList: ListingProps[]
}


export const ExploreContext = createContext<ExploreContextProps>({} as ExploreContextProps);

const ExploreProvider = ({ children }: ExploreProviderProps) => {
    const listingData = useMemo(() => listing as any, []);

    const [categoriedList, setCategoriedList] = React.useState<ListingProps[]>([]);

    const selectCategoriedList = (category: string) => {
        const filteredList = listingData.filter((item: ListingProps) => item.property_type === category)
        setCategoriedList(filteredList)
        return filteredList
    }
    return (
        <ExploreContext.Provider value={{
            listingData,
            selectCategoriedList,
            categoriedList
        }}>
            {children}
        </ExploreContext.Provider>
    )
}

export default ExploreProvider