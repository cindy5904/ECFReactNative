import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import title from '../asset/Monpokedex.png'
import PokemonList from './PokemonList';
import { useNavigation } from '@react-navigation/native';
export default function Home() {
    const navigation = useNavigation();
  
  return (
    <View style={{ flex: 1 }}> 
      <ScrollView style={styles.container}>
        <View style={styles.imgContainer}>
          <View style={styles.imgWrapper}>
            <Image style={styles.img} source={title} />
          </View>
        </View>
        <PokemonList navigation={navigation} />
      </ScrollView>
    
  </View>
  )
}

const styles = StyleSheet.create({
    container:{
        textAlign: 'center',
        backgroundColor: '#333'
    },
    imgContainer: {
        width: '100%',
        height: 90,
        marginTop: 25,
        marginBottom: 20,
        textAlign: 'center',
        justifyContent: 'center',
    },
    
    img: {
      alignItems: 'center',
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})