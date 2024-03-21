import React, { useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Filter({ onFilterByName, onFilterByType }) {
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name..."
        onChangeText={(text) => {
          setNameFilter(text);
          onFilterByName(text);
        }}
        value={nameFilter}
      />
      <TextInput
        style={styles.input}
        placeholder="Filter by type..."
        onChangeText={(text) => {
          setTypeFilter(text);
          onFilterByType(text);
        }}
        value={typeFilter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
});
