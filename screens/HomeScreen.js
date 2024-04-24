import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from 'react-native-feather'
import { themeColors } from '../theme'
import Categories from '../components/Categories'
import { restaurants } from '../constants/index2'
import RestaurantCard from '../components/RestaurantCard'


export default function HomeScreen() {
  return (
    <SafeAreaView>
       <StatusBar backgroundColor={themeColors.bgColor(1)} />
      <View style={styles.container}>
          <View style={styles.searchWrapper}>
            <Icon.Search height={25} width={25} stroke={'grey'} />
            <TextInput styles={styles.searchInput} placeholder='Restaurants' width={'90%'} padding={10} />
          </View>
      </View>

      {/* Main */}
      <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingBottom: 20}}
             >
          {/* Categories */}
          <Categories />
          {/* Featured Row */}
          <View style={styles.restaurantsContainer} >
            {restaurants.map((item,index)=>{
                return (
                    <RestaurantCard 
                    key={index}
                    title = {item.name}
                    image = {item.image}
                    rating={item.stars}
                    time= {item.time}
                    distance= {item.distance}
                    category= {item.category}
                    description= {item.description}
                    address= {item.address}
                    dishes= {item.dishes}
                    priceForTwo={200}

                    
                     />
                )
            })}
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  searchWrapper: {
    width: '90%',
    backgroundColor: 'white',
    height: 50,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchInput: {
    // flex:1,
  },
  restaurantsContainer:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap:25,
    paddingVertical: 20,
    marginBottom: 50
  }
})