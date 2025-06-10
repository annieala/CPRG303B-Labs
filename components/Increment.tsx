import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface IncrementProps {
  count: number;
  onIncrement: () => void;
}

export default function Increment({ count, onIncrement }: IncrementProps) {
  return (
    <Pressable style={styles.button} onPress={onIncrement}>
      <Text style={styles.buttonText}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});