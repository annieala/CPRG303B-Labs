import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Linking, Pressable, Alert } from 'react-native';

// define the type 
type GroupMember = { 
  name: string; 
  github_repo: string; 
  group_no: string; 
}

export default function App() {
  const groupMembers: GroupMember[] = [
    { name: 'anne marie ala', github_repo: 'annieala', group_no: '1' },
    { name: 'samuel braun', github_repo: 'samuelbraun', group_no: '2' },
    { name: 'merilyn', github_repo: 'merilyn', group_no: '3' },
  ];

  // Function to open GitHub profiles
  const openGithubProfile = (username: string) => {
    Linking.openURL(`https://github.com/${username}`);
  };

  // Function for lab completion alert (required by lab)
  const showLabComplete = () => {
    Alert.alert("Lab 1 done");
  };

  return (
    <View style={{ padding: 20, paddingTop: 50}}> 
      <Text style={{ fontSize: 24, marginBottom: 20}}> Group Members: </Text>

      {/* map over the array  */}
      {groupMembers.map((member, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 18 }}>
            Name: {member.name}
          </Text>
          
          {/* Make GitHub username clickable */}
          <Pressable onPress={() => openGithubProfile(member.github_repo)}>
            <Text style={{ color: 'pink', textDecorationLine: 'underline' }}>
              Github: {member.github_repo}
            </Text>
          </Pressable>
          
          <Text>
            Group No: {member.group_no}
          </Text>
        </View>
      ))}

      {/* Required: Pressable text that displays alert (from lab instructions) */}
      <Pressable onPress={showLabComplete} style={{ marginTop: 20 }}>
        <Text style={{ 
          color: 'blue', 
          textDecorationLine: 'underline', 
          fontSize: 18,
          textAlign: 'center' 
        }}>
          Complete Lab 1
        </Text>
      </Pressable>
      
      <StatusBar style="auto" />
    </View>
  );
}