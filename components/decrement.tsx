import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

// Define the type for the props
interface DecrementProps {
  setCount: () => void;
}

export default function Decrement({ setCount }: DecrementProps) {
  return (
    <Pressable style={[styles.button, styles.decrementButton]} onPress={setCount}>
      <Text style={styles.buttonText}>Decrement -</Text>
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
  decrementButton: {
    backgroundColor: '#F44336', // Red
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});