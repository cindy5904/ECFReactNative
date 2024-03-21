import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { clearPokedex } from '../store/pokemonSlice';
import pikachu from '../asset/images/pikachu.png'

export default function Macollection({route, navigation}) {
    
    const pokedex = useSelector((state) => state.pokemon.pokedex);
    const dispatch = useDispatch()

    const clearThePokedex = () => {
        dispatch(clearPokedex());
      };

  return (
    <View style={styles.containerP}>
    <Text style={styles.title}>Ma collection</Text>
    <View style={styles.container}>
        {pokedex.length === 0 ? (
           <View style={styles.empty}>
             <Image style={styles.pikachu} source={pikachu}/>
            <Text style={styles.emptyMessage}>Vous n'avez capturé aucun Pokémon</Text>
           </View>
        ) : (
            pokedex.map((pokemon, index) => (
                <LinearGradient
                    key={index}
                    colors={['#ffffff', '#84c478', '#148764']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}>
                    <View style={styles.pokemonContainer}>
                        <Image style={styles.img} source={{ uri: pokemon.sprites.front_default }} />
                        <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
                    </View>
                </LinearGradient>
            ))
        )}
    </View>
   <View style={styles.btn}>
   <Pressable onPress={clearThePokedex} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Clear The pokedex</Text>
    </Pressable>
    <Pressable 
  style={styles.retourAccueilButton}
  onPress={() => {
    navigation.navigate('Home');
  }}
>
  <Text style={styles.buttonText}>Retour à l'accueil</Text>
</Pressable>
   </View>
</View>
  )
}

const styles = StyleSheet.create({
    containerP: {
        flex: 1,
        alignItems: 'center', 
        backgroundColor: '#333', 
    },
    title: {
        fontSize: 35,
        color: '#fff',
        marginTop: 25,
    },
    container: {
        textAlign: 'center',
        gap: 10,
        width: 400,
        justifyContent: 'center',
        paddingVertical: 20,
        
    },
    pokemonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20, 
        borderRadius: 20,
      },
      gradient: {
        borderRadius: 20
      },
    img: {
        width: 150,
        height: 150,
    },
    name: {
        fontSize: 21,
        marginLeft: 20,
    },
    emptyMessage: {
        fontSize: 19,
        marginTop: 20,
        textAlign: 'center',
        color: '#fff'
    },
    empty: {
        alignItems: 'center'
    },
    clearButton: {
        backgroundColor: '#ff0000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    clearButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    retourAccueilButton: {
        backgroundColor: '#555', 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
        
      },
      buttonText: {
        color: '#fff',  
        textAlign: 'center', 
        fontSize: 18,
      },
      btn:{
        flexDirection: 'row', 
        gap: 15,
      },
      pikachu: {
        width: 100,
        height: 100,
        alignItems: 'center'
      }
})