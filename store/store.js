import {configureStore} from '@reduxjs/toolkit';
import pokemonSlice from './pokemonSlice';


export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
  },
  middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
