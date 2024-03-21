import {useDispatch, useSelector} from 'react-redux';
import {fetchPokemons, setSelectedPokemon} from '../store/pokemonSlice';
import { fetchPokemonDetail } from '../store/pokemonSlice';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {setFilteredPokemons} from '../store/pokemonSlice';
import Filter from '../component/Filter';

export default function PokemonList({navigation}) {
  const dispatch = useDispatch();
  const {pokemons} = useSelector(state => state.pokemon);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const filteredPokemons = useSelector(state => state.pokemon.filteredPokemons);

 

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);
  
  
  const filterByName = name => {
    const filtered = pokemons.filter(pokemon =>
      pokemon.name.includes(name.toLowerCase()),
    );
    dispatch(setFilteredPokemons(filtered));
  };
  const filterByType = type => {
    const filtered = pokemons.filter(pokemon =>
      pokemon.types.toLowerCase().includes(type),
    );
    dispatch(setFilteredPokemons(filtered));
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemons = filteredPokemons.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const handlePageChange = page => {
    setCurrentPage(page);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView>
      <Filter onFilterByName={filterByName} onFilterByType={filterByType} />
        
        {currentPokemons.map((pokemon, index) => (
          <TouchableOpacity
            key={pokemon.id}
            style={styles.card}
            onPress={() => {
              navigation.navigate('Detail', {pokemon: pokemon});
            }}
            activeOpacity={0.7}>
            <View style={styles.contourList}>
              <LinearGradient
                colors={['#2c3e50', '#ffffff', '#2c3e50']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradient}>
                <View style={styles.pokemonCard}>
                  <View style={styles.imgPoke}>
                    <LinearGradient
                      colors={['#777979', '#ffffff']}
                      style={styles.gradientImg}>
                      <View style={styles.contourImgList}>
                        <Image
                          style={styles.img}
                          source={{ uri : pokemon.imageUrl }}
                        />
                      </View>
                    </LinearGradient>
                  </View>
                  <View style={styles.textPoke}>
                    <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
                    <Text style={styles.index}>#{startIndex + index + 1}</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.pagination}>
          <Pressable
            onPress={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}>
            <Text style={styles.fleche}>&lt;</Text>
          </Pressable>
          <Text style={styles.currentPage}>{currentPage}</Text>
          <Pressable
            onPress={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
            <Text style={styles.fleche}>&gt;</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 125,
    height: '100%',
    resizeMode: 'cover',
    
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 25,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#333',
  },
  containerCard: {
    width: 360,
    height: 40,
    backgroundColor: '#333',
    padding: 8,
    gap: 20,
    borderRadius: 10,
  },
  card: {
    backgroundColor: 'gray',
    width: 340,
    height: 390,
    textAlign: 'center',
    marginBottom: 38,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contourList: {
    borderRadius: 8,
    padding: 10,
  },
  gradient: {
    borderRadius: 10,
    height: 370,
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
    height: 155,
    borderRadius: 10,
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  contourImgList: {
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#333',
  },
  currentPage: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  fleche: {
    color: '#fff',
  },
  index: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  }
});
