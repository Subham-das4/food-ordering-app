import { View, Text, Image, StyleSheet, Touchable, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function RestaurantCard({title, image,rating,priceForTwo,time,distance,category,description,address,dishes}) {
  const navigation= useNavigation()
  const item = {
      title,
      image,
      rating,
      priceForTwo,
      time,
      distance,
      category,
      description,
      address,
      dishes
    }
  return (
    <TouchableWithoutFeedback
        onPress={()=>navigation.navigate('Restaurant',{...item})}
    
     >
    <View style={styles.restaurantContainer}>
        <View style={styles.restaurantImageWrapper} >
            <Image source={image} style={styles.restaurantBackgroundImage} />
        </View>
        <View style={styles.restaurantDetails}>
        {/* Title and Rating */}
          <View style={styles.nameAndRating}>
            <Text style={{fontSize: 20,fontWeight: 'bold'}} >{title}</Text>
            <Text style={styles.rating} >{rating}</Text>
          </View>
          {/* Categories and price for one */}
          <View style={styles.categoriesAndPrice}>
              <Text style={styles.category}>{category}</Text>
              <Text>•</Text>
              <Text style={styles.category}>{category}</Text>
              <Text>•</Text>
              <Text>₹{priceForTwo} for two</Text>
          </View>
          {/* Time and Kilometers */}
          <View style={styles.timeAndKilometers}>
              <Image style={styles.timer}  source={require('../assets/timer.png')} />
              <Text> {time}</Text>
              <Text>•</Text>
              <Text>{distance}</Text>
          </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  restaurantContainer: {
    width: '90%',
    overflow: 'hidden',
    borderWidth:2,
    borderRadius: 10,
    borderColor: 'lightgrey'
  },
  restaurantImageWrapper:{
    width: '100%',
    aspectRatio: 16/9,
    position:'relative',
  },
  restaurantBackgroundImage:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  restaurantDetails:{
    paddingHorizontal:20,
    
  },
  nameAndRating:{
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  categoriesAndPrice:{
    display: 'flex',
    flexDirection: 'row',
    gap:3
  },
  timeAndKilometers:{
    display : 'flex' ,
    flexDirection: 'row',
    gap: 3,
    paddingVertical:12,
    position:'relative',
    paddingLeft:10
  },
  category:{
    
  },
  timer:{
    position:'absolute',
    height:30,
    width:30,
    left:-9,
    top:4,
  },
  rating:{
    backgroundColor: 'green',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
  }
})