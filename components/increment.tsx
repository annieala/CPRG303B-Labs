import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

// Define the type for the props
interface IncrementProps {
  setCount: () => void;
}

export default function Increment({ setCount }: IncrementProps) {
  return (
    <Pressable style={[styles.button, styles.incrementButton]} onPress={setCount}>
      <Text style={styles.buttonText}>Increment +</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  incrementButton: {
    backgroundColor: '#4CAF50', // Green
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});