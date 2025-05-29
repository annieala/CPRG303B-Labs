import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import FruitList from '../components/Fruits';

export default function Index() {
  const welcomeMessage = "Welcome to Lab 2!";

  const showLabComplete = () => {
    Alert.alert("Lab 2 done");
  };

  return (
    <View style={{ padding: 20, paddingTop: 50}}>
      <Text style={{ fontSize: 24, marginBottom: 20, color: 'pink'}}>
        {welcomeMessage}
      </Text>
      
      <FruitList />
      
      <Pressable onPress={showLabComplete} style={{ marginTop: 20 }}>
        <Text style={{ 
          color: 'blue', 
          textDecorationLine: 'underline', 
          fontSize: 18,
          textAlign: 'center' 
        }}>
          Complete Lab 2
        </Text>
      </Pressable>
      
      <StatusBar style="auto" />
    </View>
  );
}