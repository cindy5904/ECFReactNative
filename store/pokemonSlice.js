import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=70');
    const pokemonDetails = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const detailsResponse = await axios.get(pokemon.url);
        const  id  = detailsResponse.data.id;
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

   ;
        return {
          id: detailsResponse.data.id, 
          name: pokemon.name,
          imageUrl : imageUrl,
          sprites: detailsResponse.data.sprites,

        };
      })
    );
    return pokemonDetails;
  } catch (error) {
    throw error;
  }
});

export const fetchPokemonDetail = createAsyncThunk('pokemon/fetchPokemonDetail', async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log('fetchPokemonDetail response:', response.data); 
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchPokemonEvolution = createAsyncThunk('pokemon/fetchPokemonEvolution', async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
    console.log('fetchPokemonEvolution response:', response.data); 
    return response.data;
  } catch (error) {
    throw error;
  }
});
  
const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
      pokemons: [],
      selectedPokemon: null, 
      pokedex: [], 
      pokedexCount: 0,
      filteredPokemons: [],
      sprites: {},
      baseExperience: null,
      abilities: [],
      selectedPokemonImageUrl: null,
      types: [],
      hp: null,
      atk: null,
      def: null,
      spd: null,
      exp: null,
      error: null,
      evolutionChain: null,
    },
    reducers: {
      setSelectedPokemon: (state, action) => {
        state.selectedPokemon = action.payload;
      },
      addPokemonToPokedex: (state, action) => {
        state.pokedex.push({
          id: action.payload.id,
          name: action.payload.name,
          sprites: action.payload.sprites || {},
        });
        state.pokedexCount += 1;
      },
      clearPokedex: (state) => {
        state.pokedex = [];
      },
      setFilteredPokemons: (state, action) => {
        state.filteredPokemons = action.payload;
      },
      setSelectedPokemonImageUrl: (state, action) => {
        state.selectedPokemonImageUrl = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPokemons.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.pokemons = action.payload;
          state.filteredPokemons = action.payload;
          
         
        })
        .addCase(fetchPokemonEvolution.fulfilled, (state, action) => {
          state.evolutionChain = action.payload;
        })
        .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
          const pokemonData = action.payload;
          const existingPokemon = state.pokemons.find(pokemon => pokemon.id === pokemonData.id);
          console.log(pokemonData.stats);
          if (existingPokemon) {
            existingPokemon.id = pokemonData.id;
            existingPokemon.name = pokemonData.name;
            existingPokemon.sprites = pokemonData.sprites;
            existingPokemon.weight = pokemonData.weight;
            existingPokemon.height = pokemonData.height;
            existingPokemon.exp = pokemonData.base_experience;
            existingPokemon.abilities = pokemonData.abilities;
            existingPokemon.types = pokemonData.types;
            existingPokemon.hp = pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat;
            existingPokemon.atk = pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat;
            existingPokemon.def = pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat;
            existingPokemon.spd = pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat;
            existingPokemon.abilities = pokemonData.abilities.map(ability => ability.ability.name);
            existingPokemon.types = pokemonData.types.map(type => type.type.name);
           
          } else {
            state.pokemons.push({
              id: pokemonData.id,
              name: pokemonData.name,
              sprites: pokemonData.sprites,
              weight: pokemonData.weight,
              height: pokemonData.height,
              exp: pokemonData.base_experience,
              abilities: pokemonData.abilities,
              types: pokemonData.types,
              abilitiesname: pokemonData.abilities.map(ability => ability.ability.name),
              typesname: pokemonData.types.map(type => type.type.name),
              hp: pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat,
              atk: pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat,
              def: pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat,
              spd: pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat,
               
            });
          }
        
          if (!state.selectedPokemon || state.selectedPokemon.id !== pokemonData.id) {
            state.selectedPokemon = {
              id: pokemonData.id,
              name: pokemonData.name,
              sprites: pokemonData.sprites,
              weight: pokemonData.weight,
              height: pokemonData.height,
              exp: pokemonData.base_experience,
              abilities: pokemonData.abilities,
              types: pokemonData.types,
              abilitiesname: pokemonData.abilities.map(ability => ability.ability.name),
              typesname: pokemonData.types.map(type => type.type.name),
              hp: pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat,
              atk: pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat,
              def: pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat,
              spd: pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat,
            };
          }
        })
        
    },
          
        })
export const { setSelectedPokemon, addPokemonToPokedex, setFilteredPokemons, clearPokedex, setSelectedPokemonImageUrl} = pokemonSlice.actions;
export default pokemonSlice.reducer;