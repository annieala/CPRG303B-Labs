import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Increment from '../../CPRG303B-Labs/components/Increment'
import Decrement from '../../CPRG303B-Labs/components/Decrement';

export default function Lab3() {
  const [counter, setCounter] = useState<number>(0);

  const incrementCount = (): void => {
    setCounter(prevCount => prevCount + 1);
  };

  const decrementCount = (): void => {
    setCounter(prevCount => prevCount - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Lab 3!</Text>
      
      <Text style={styles.counterText}>Counter: {counter}</Text>
      
      <View style={styles.buttonContainer}>
        <Increment count={counter} onIncrement={incrementCount} />
        <Decrement count={counter} onDecrement={decrementCount} />
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  counterText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});