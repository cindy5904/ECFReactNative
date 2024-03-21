import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {
  fetchPokemonDetail,
  addPokemonToPokedex,
  fetchPokemonEvolution,
} from '../store/pokemonSlice';
import getLogoPath from '../asset/typeImage';
import StatBars from '../component/StatBars';

export default function PokemonDetail({route, navigation}) {
  const dispatch = useDispatch();
  const selectedPokemon = useSelector(state => state.pokemon.selectedPokemon);
  const {pokemon} = route.params;

  useEffect(() => {
    if (pokemon) {
      console.log('id:', pokemon.id);
      console.log('selectedPokemon:', selectedPokemon);

      if (!selectedPokemon || pokemon.id !== selectedPokemon.id) {
        dispatch(fetchPokemonDetail(pokemon.id));
      }
      dispatch(fetchPokemonEvolution(pokemon.id));
    }
  }, [dispatch, pokemon, selectedPokemon]);

  const handleAddToPokedex = () => {
    dispatch(addPokemonToPokedex(pokemon));
  };

  const PokemonType = () => {
    const pokemonTypes = selectedPokemon
      ? selectedPokemon.types.map(type => type.type.name)
      : [];
    return (
      <View style={styles.typeList}>
        {pokemonTypes.map((typeName, index) => (
          <View key={index} style={styles.typeItem}>
            <Image source={getLogoPath(typeName)} style={styles.energy} />
            <Text style={styles.textType}>{typeName}</Text>
          </View>
        ))}
      </View>
    );
  };
  console.log('selectedPokemon:', selectedPokemon);
  console.log('selectedPokemon.chain:', selectedPokemon && selectedPokemon.chain);
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.retourAccueilButton}
        onPress={() => {
          navigation.navigate('Home', {pokemon: pokemon});
        }}>
        <Text style={styles.buttonText}>Retour à l'accueil</Text>
      </Pressable>
      <View style={styles.containerCard}>
        <View style={styles.card}>
          <View style={styles.contourList}>
            <LinearGradient
              colors={['#f5eac7', '#9b8548']}
              start={{x: 1, y: 0.5}}
              end={{x: 0, y: 0.5}}
              style={styles.gradient}>
              <View style={styles.topCard}>
                <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
                <View style={styles.topCardRight}>
                  <Text>PV:</Text>
                  <Text>{selectedPokemon.hp}</Text>
                </View>
              </View>
              <View style={styles.pokemonCard}>
                <View style={styles.imgPoke}>
                  <LinearGradient
                    colors={['#ffffff', '#ffcc66', '#676302']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 0.5}}
                    style={styles.gradientImg}>
                    <View style={styles.contourImgList}>
                      <Image
                        style={styles.img}
                        source={{uri: pokemon.imageUrl}}
                      />
                    </View>
                  </LinearGradient>
                </View>
                <View style={styles.textPoke}>
                  <View>
                    <PokemonType />
                    <View style={styles.taillePoidDetail}>
                      <View style={styles.taille}>
                        <Text style={styles.textTp}>Height:</Text>
                        <Text style={styles.textHW}>
                          {selectedPokemon.height}
                        </Text>
                      </View>
                      <View style={styles.poid}>
                        <Text style={styles.textTp}>Weight:</Text>
                        <Text style={styles.textHW}>
                          {selectedPokemon.weight}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <LinearGradient
                    colors={['#b3904f', '#fff3b6']}
                    style={styles.abilitiesContainer}>
                    <Text style={styles.textAbilities}>Abilities:</Text>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: 'black',
                        marginBottom: 10,
                      }}
                    />
                    <View style={{marginHorizontal: 10}}>
                      {selectedPokemon.abilitiesname.map((ability, index) => (
                        <Text style={styles.text} key={index}>
                          {ability}
                        </Text>
                      ))}
                    </View>
                  </LinearGradient>
                </View>
              </View>
              <View>
              {selectedPokemon && (
        <View>
         {selectedPokemon && selectedPokemon.chain?.evolves_to.map(evolution => (
    <Text key={evolution.species.name}>{evolution.species.name}</Text>
  ))}
        </View>
      )}
              </View>
              <StatBars selectedPokemon={selectedPokemon} />
            </LinearGradient>
          </View>
        </View>
      </View>
      <Pressable onPress={handleAddToPokedex} style={styles.addToPokedexButton}>
        <Text style={styles.addToPokedexButtonText}>Add to Pokedex</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  retourAccueilButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'left',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  img: {
    width: 150,
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#333',
  },
  card: {
    backgroundColor: '#c7b3a6',
    width: 325,
    height: 585,
    textAlign: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 120,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    marginLeft: -20,
  },
  topCardRight: {
    flexDirection: 'row',
    gap: 8,
  },
  contourList: {
    borderRadius: 8,
    padding: 10,
  },
  textHW: {
    textAlign: 'center',
    paddingTop: 10,
  },
  gradient: {
    borderRadius: 10,
    height: 565,
    width: 305,
    alignItems: 'center',
    paddingTop: 15,
  },
  imgPoke: {
    backgroundColor: '#565555',
    width: 270,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 15,
  },
  gradientImg: {
    width: 255,
    height: 160,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contourImgList: {
    textAlign: 'center',
  },
  energy: {
    width: 25,
    height: 25,
  },
  textType: {
    textAlign: 'center',
  },
  typeItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  typeList: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 15,
  },
  textPoke: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taillePoidDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 8,
  },

  textTp: {
    fontWeight: 'bold',
  },
  abilitiesContainer: {
    borderWidth: 5,
    borderColor: 'rgb(210, 196, 92)',
    borderRadius: 8,
    marginTop: 10,
    width: '50%',
    height: '90%',
  },
  textAbilities: {
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 10,
    paddingTop: 3,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  addToPokedexButton: {
    backgroundColor: '#34495e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  addToPokedexButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
