import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Increment from '../../components/increment';
import Decrement from '../../components/decrement';

export default function Lab3() {
  // State management for the counter
  const [counter, setCounter] = useState<number>(0);

  // Function to increment counter
  const incrementCount = (): void => {
    setCounter(prevCounter => prevCounter + 1);
  };

  // Function to decrement counter
  const decrementCount = (): void => {
    setCounter(prevCounter => prevCounter - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lab 3: Props & State</Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterLabel}>Counter Value</Text>
        <Text style={styles.counterValue}>{counter}</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <Decrement setCount={decrementCount} />
        <Increment setCount={incrementCount} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  counterContainer: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  counterLabel: {
    fontSize: 20,
    color: '#555',
    marginBottom: 10,
  },
  counterValue: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});