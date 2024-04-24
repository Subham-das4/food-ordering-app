import { View, Text, ScrollView, StyleSheet, Touchable, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Icon from 'react-native-feather'
import { themeColors } from '../theme';

export default function RestaurantScreen() {
  const {params} = useRoute();
  let item = params;
  const navigation = useNavigation()
  const [selectedFilter, setSelectedFilter] = useState('veg')
  const [cartItems, setCartItems] = useState({
    cartids:[2],
    cartitems:{
      2:2
    },
  })
  const calculateTotal = () => {
    let total = 0;
    let dishes = item.dishes;
    dishes.forEach(dish => {
       let {id,price} = dish
       if(cartItems.cartids.includes(id)) {
         total += (price* cartItems.cartitems[id]);
       }
    }); 
    return total;
  }
  return (
    <View>
          {/* Price  and Cart */}
          <View style={styles.priceAndCart} >
            <View style={{ borderRadius: 50, backgroundColor: themeColors.secondaryColor(0.8),padding: 0,aspectRatio: 1,width: 40,display: 'flex',justifyContent: 'center',alignItems: 'center'}}>

            <Text style={{color: 'white',fontSize: 20, fontWeight: 'bold', textAlign: 'center'}} >{cartItems.cartids.length}</Text>
            </View>
            <Text  style={{color:'white'}}>View Cart</Text>
            <Text style={{color:'white'}}>₹{calculateTotal()}</Text>
          </View>
       <ScrollView>
       {/* Image section */}
          <View style={styles.imageContainer} >
              <Image style={styles.restaurantImage} source={item.image}  />
              <TouchableOpacity  style={styles.goBackButton}
                  onPress={()=> navigation.goBack()} >
                  <Icon.ArrowLeft height={25} width={25} strokeWidth={3} stroke={themeColors.bgColor(1)} />
              </TouchableOpacity> 
          </View>
          <View style={styles.mainSection} >
            <View style={styles.restaurantDetails}>
              {/* Restaurant Name */}
                <Text style={{fontSize: 30, fontWeight: 'bold'}} >{item.title}</Text>
                {/* Restaurant Category  */}
                <View style={styles.categories} >
                  <Text style={{fontSize: 15, fontWeight: 'bold', color: 'grey'}} >{item.category}</Text>
                </View>
                {/* Restaurant Rating */}
                <View style={styles.ratingSection} >
                  <Text style={{fontSize: 20, padding: 5,borderRadius: 10, fontWeight: 'bold', color: 'white', backgroundColor:'green'}} >{item.rating} </Text>
                  <Text style={{fontSize: 15, fontWeight: 'bold', color: 'grey'}} > • 12.2K ratings </Text>
                </View>
                {/* time and distance */}
                <View style={styles.timeAndDistance} >
                  <Text style={{fontSize: 15, fontWeight: 'bold', color: 'grey'}} >{item.time} • {item.distance}</Text>
                  <Text style={{fontSize: 15, fontWeight: 'bold', color: 'grey'}} >• {item.address}</Text>
                </View> 
                {/* Filters */}
                <View style={styles.filters} >
                  <TouchableOpacity onPress={()=>setSelectedFilter('veg')}><Text style={styles.filter(selectedFilter==='veg')} >Veg</Text></TouchableOpacity>
                  <TouchableOpacity onPress={()=>setSelectedFilter('non-veg')}><Text style={styles.filter(selectedFilter==='non-veg')} >Non Veg</Text></TouchableOpacity>
                  {/* <TouchableOpacity onPress={()=>setSelectedFilter('egg')}><Text style={styles.filter(selectedFilter==='egg')} >Egg</Text></TouchableOpacity> */}
                  <TouchableOpacity onPress={()=>setSelectedFilter('all')}><Text style={styles.filter(selectedFilter==='all')} > No Filter </Text></TouchableOpacity>
                </View>
                {/* List of dishes */}

            </View>
            {/* Dishes Section */}
            <View style={styles.dishes} >
              {
                item.dishes.filter(dish=>{
                  if(selectedFilter==='veg') {
                    return dish.veg
                  } else if(selectedFilter==='non-veg') {
                    return !dish.veg
                  } else if(selectedFilter==='egg') {
                    return dish.egg
                  } else {
                    return true
                  }
                }).map((dish,index)=>
                  <DishCard dish={dish} 
                  quantity={cartItems.cartitems[dish.id]} 
                  addToCart={setCartItems} inCart={cartItems.cartids.includes(dish.id)} key={index} />
                )
              }
            </View>
          </View>
       </ScrollView>
    </View>
  )
}

const DishCard=({dish,inCart,addToCart,quantity})=>{

  return (
    <View style={styles.dishCard} >
      {/* Dish Details */}
      <View style={styles.dishDetails} >
        <Text>Veg/NonVeg</Text>
        <Text style={{marginTop:'auto',fontSize: 20, fontWeight: 'bold'}} >{dish.name}</Text>
        <Text style={{fontSize: 15, fontWeight: 'bold'}} >₹{dish.price}</Text>
        <Text style={{marginTop:'auto',fontSize: 15, fontWeight: 'bold', color: 'grey'}} >{dish.description}</Text>
      </View>
      {/* Dish Image and Add button */}
      <View style={styles.dishImageAndAdd} >
        <Image source={dish.image} style={styles.dishImage} />
        {
          !inCart?
          <TouchableOpacity 
              onPress={()=>addToCart(val=>({
                cartids: [...val.cartids,dish.id],
                cartitems: {...val.cartitems,[dish.id]:1},
              }))} >
          <View  style={styles.add(inCart)} >
          <Text style={{color: themeColors.text,fontSize: 15, fontWeight: 'bold',textAlign: 'center'}} >Add</Text>
        </View></TouchableOpacity>
        :
        <View  style={styles.add(inCart)} >
        <TouchableOpacity
            onPress={()=>addToCart(val=>({
              cartids: quantity===1? val.cartids.filter(id=>id!==dish.id) 
                  :val.cartids ,
              cartitems: {...val.cartitems,[dish.id]:quantity-1},
            }))}
        ><Text style={{color: 'white',fontSize: 15, fontWeight: 'bold'}} >-</Text></TouchableOpacity>
          <Text style={{color: 'white',fontSize: 15, fontWeight: 'bold',textAlign: 'center'}} >{quantity}</Text>
        <TouchableOpacity
            onPress={()=>addToCart(val=>({
              cartids: val.cartids,
              cartitems: {...val.cartitems,[dish.id]:quantity+1},
            }))}
        ><Text style={{color: 'white',fontSize: 15, fontWeight: 'bold'}}>+</Text></TouchableOpacity>
        </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  restaurantImage:{
    width: '100%',
    height: '100%',
  },
  imageContainer:{
    width: '100%',
    height: 300,
    position: 'relative'
  },
  goBackButton: {
    position: 'absolute',
    top: '15%',
    left: 20,
    zIndex: 2,
    backgroundColor: 'white',
    aspectRatio: 1,
    borderRadius: 50,
    padding: 5,
  },
  mainSection:{
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -30,
    backgroundColor: 'white',
    padding: 20,
  },
  restaurantDetails:{
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: 15,
    alignItems: 'center',
    gap: 10
  },
  ratingSection:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  timeAndDistance:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  filters:{
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems:'flex-end',
    width: '100%',
  },
  filter:(selected)=>({
      padding: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'lightgrey',
      backgroundColor: selected ? 'lightgrey' : 'white'
  }),
  dishes:{

  },
  dishCard:{
    display:"flex",
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 20,
  },
  dishDetails:{
    width: '50%',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  dishImage:{
    width: 150,
    height: 150,
    borderRadius: 10,
    borderColor: 'lightgrey',
    borderWidth: 1
  },
  dishImageAndAdd:{
    width: '50%',
    position: 'relative'
  },
  add:(incart)=>({
    position: 'absolute',
    bottom: -20,
    right: 40,
    padding: 10,
    backgroundColor:incart? themeColors.bgColor(1) : themeColors.secondaryColor(1),
    borderRadius: 10,
    width: 90,
    borderWidth : 1,
    borderColor: !incart? themeColors.bgColor(1) : themeColors.secondaryColor(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }),
  priceAndCart:{
    position:'absolute',
    height: 80,
    width: '80%',
    bottom: 20,
    backgroundColor: themeColors.bgColor(1),
    zIndex: 3,
    borderRadius: 40,
    left: '10%',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  }
})