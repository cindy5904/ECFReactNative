import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import loader from '../asset/images/loader.gif'

export default function Loader() {
  return (
    <Image
      style={styles.gif}
      source={loader}
      resizeMode='contain'
      autoPlay
      loop
    />
  )
}

const styles = StyleSheet.create({
    gif: {
        width: 150,
        height: 150,
        alignItems: 'center'
      },
})