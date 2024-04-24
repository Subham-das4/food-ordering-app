import { View, Text, ScrollView, TouchableOpacity , Image, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { categories } from '../constants'

export default function Categories() {
    const [activeCategory, setActiveCategory] = useState(null)
    useEffect(() => {
    }, [activeCategory])
    
  return (
    <View>
      <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddinhgHorizontal: 15}}
             >
             {categories.map((category,index)=>{
                return (
                    <View key={index} style={styles.categoryView}>
                        <TouchableOpacity
                        onPress={()=> setActiveCategory(category.id)}
                            style={{
                                
                            }}
                        >
                        <Image style={styles.categoryImage(activeCategory,category.id)} source={category.image} height={20} width={20} />
                        <Text style={{fontWeight: activeCategory == category.id ? "900":"normal", fontSize: 10, textAlign: 'center'}}>{category.name}</Text>
                        </TouchableOpacity>
                    </View>
                )
             })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    categoryView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        
    },
    categoryImage: (activeCategory, index) => ({
        aspectRatio: 1,
        borderRadius: 50,
        backgroundColor: activeCategory==index ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)',
        marginHorizontal:2,
    })

})