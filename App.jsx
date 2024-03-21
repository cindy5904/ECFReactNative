import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PokemonList from './screens/PokemonList';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Icon from 'react-native-vector-icons/FontAwesome'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PokemonDetail from './screens/PokemonDetail';
import Home from './screens/Home';
import Macollection from './screens/Macollection';
import Header from './component/Header';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitle: () => <Header />,
              headerStyle: { backgroundColor: '#444' }, 
              headerTintColor: '#fff', 
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Detail" component={PokemonDetail} />
            <Stack.Screen name="Collection" component={Macollection} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333', 
      },
      tabBar: {
        backgroundColor: '#444', 
      },
})