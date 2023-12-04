import React, { createContext, useMemo } from 'react'
import listing from '@/assets/data/airbnb-listings.json'

type ExploreProviderProps = {
    children: React.ReactNode
}

type ExploreContextProps = {
    categoriedList: (category: string) => void
}


export const ExploreContext = createContext<ExploreContextProps>({} as ExploreContextProps);

const ExploreProvider = ({ children }: ExploreProviderProps) => {
    const listingData = useMemo(() => listing as any, [])
    const categoriedList = (category: string) => {
        console.log(category)
        return listingData.filter((item) => item.category === category)
    }
    console.log(listingData[0])
    return (
        <ExploreContext.Provider value={{
            listingData,
            categoriedList
        }}>
            {children}
        </ExploreContext.Provider>
    )
}

export default ExploreProvider