import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const maxHP = 300;
const maxATK = 300;
const maxDEF = 300;
const maxSPD = 300;
const maxEXP = 1000;

export default function StatBars({ selectedPokemon }) {
  const hpPercentage = (selectedPokemon.hp / maxHP) * 100;
  const atkPercentage = (selectedPokemon.atk / maxATK) * 100;
  const defPercentage = (selectedPokemon.def / maxDEF) * 100;
  const spdPercentage = (selectedPokemon.spd / maxSPD) * 100;
  const expPercentage = (selectedPokemon.exp / maxEXP) * 100;

  return (
    <View style={styles.statBarsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.textBar}>HP:</Text>
        <View style={[styles.statBar, { width: `${hpPercentage}%`, backgroundColor: 'rgb(180, 239, 176)' }]} />
      </View>
      <View style={styles.statItem}>
        <Text style={styles.textBar}>ATK:</Text>
        <View style={[styles.statBar, { width: `${atkPercentage}%`, backgroundColor: 'rgb(72, 47, 47)' }]} />
      </View>
      <View style={styles.statItem}>
        <Text style={styles.textBar}>DEF:</Text>
        <View style={[styles.statBar, { width: `${defPercentage}%`, backgroundColor: 'pink' }]} />
      </View>
      <View style={styles.statItem}>
        <Text style={styles.textBar}>SPD:</Text>
        <View style={[styles.statBar, { width: `${spdPercentage}%`, backgroundColor: '#e4ed63' }]} />
      </View>
      <View style={styles.statItem}>
        <Text style={styles.textBar}>EXP:</Text>
        <View style={[styles.statBar, { width: `${expPercentage}%`, backgroundColor: '#8da8c1' }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    statBarsContainer: {
        flexDirection: 'column',
        // alignItems: 'flex-start', 
        marginTop: 30,
        marginLeft: -105,
        gap: 10,
      },
      statItem: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 12, 
      },
      textBar: {
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 8, 
      },
      statBar: {
        height: 10,
        borderRadius: 5,
      },
});
