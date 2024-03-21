import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import pokeball from '../asset/images/modalLogo.png'
import { addPokemonToPokedex, fetchPokemons } from '../store/pokemonSlice';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
 const navigation = useNavigation();
 const pokedexCount = useSelector((state) => state.pokemon.pokedex);
  return (
    <TouchableOpacity
    onPress={() => {
      navigation.navigate('Collection', { pokedex: pokedexCount });
    }}
    style={{ flexDirection: 'row', alignItems: 'center' }}
  >
    <Image
      source={pokeball}
      style={{ width: 30, height: 30, marginLeft: 308 }}
    />
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{pokedexCount.length}</Text>
    </View>
  </TouchableOpacity>
);
  
}

const styles = StyleSheet.create({
    badgeContainer: {
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        
      },

      badgeText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
      },
})