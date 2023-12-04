import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { Link } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { fontFamilyStyles, winWidth } from '@/constants/Styles'
import * as Haptics from 'expo-haptics'
import { categories } from './explore_header_data'
import { ExploreContext } from '@/context/ExploreContext'

const ExploreHeader = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const categoryRef = useRef<Array<TouchableOpacity | null>>([]);
    const scrollRef = useRef<ScrollView | null>(null);

    const { categoriedList } = useContext(ExploreContext);

    const selectCategory = (categoryName: string, index: number) => {
        const selected = categoryRef.current[index];
        setActiveIndex(index);
        selected?.measure((x: number) => {
            scrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true })
        })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        categoriedList(categoryName)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <Link href={'/(modals)/booking'} asChild>
                        <TouchableOpacity
                            style={styles.searchBtn}>
                            <Ionicons name='search' size={24} color={Colors.grey} />
                            <View>
                                <Text style={{ fontFamily: fontFamilyStyles.mon }}>Where to?</Text>
                                <Text style={{ color: Colors.grey, fontFamily: fontFamilyStyles.mon }}>Anywhere · Any week</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name='options-outline' size={24} color={Colors.grey} />
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    ref={scrollRef}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10, gap: 20 }}>
                    {categories.map((category, index) =>
                        <TouchableOpacity
                            key={index}
                            ref={(el) => (categoryRef.current[index] = el)}
                            onPress={() => selectCategory(category.name, index)}
                            style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}>
                            <MaterialIcons key={index} name={category.icon as any} size={24} color={activeIndex === index ? '#000' : Colors.grey} />
                            <Text style={styles.categoryText}>{category.name}</Text>
                        </TouchableOpacity>
                    )}

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ExploreHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        paddingTop: 10,
        height: 130,
        elevation: 2,
        shadowColor: Colors.white,
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16,
        gap: 10
    },
    searchBtn: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        gap: 10,
        padding: 5,
        alignItems: 'center',
        width: winWidth - 100,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
        borderRadius: 30,
        elevation: 2,
        shadowColor: Colors.white,
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 24,
    },
    categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,

    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
    categoryText: {
        fontFamily: fontFamilyStyles.mon,
        textAlign: 'center',
    }
})