import { StyleSheet, Text, View, Linking, Pressable, Image } from 'react-native';

// define the type 
type Fruit = {
  name: string; 
  image: string;
}

export default function FruitList() {
  const fruit: Fruit[] = [
    { name: 'orange', image:'https://www.allrecipes.com/thmb/y_uvjwXWAuD6T0RxaS19jFvZyFU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1205638014-2000-d0fbf9170f2d43eeb046f56eec65319c.jpg' },
    { name: 'apple', image:'https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBwbGV8ZW58MHx8MHx8fDA%3D'},
    { name: 'mango', image: 'https://media.istockphoto.com/id/1435602229/photo/close-up-of-red-mangoes.jpg?s=612x612&w=0&k=20&c=a2uO7Ly-irGjtfqZC0ZTt9ps_Sh8S3a6ulf-TMRebao='},
  ];



  // Function to open image of the fruit
const openFruitImage = (image: string) => {
  Linking.openURL(image);  // Just open the image URL directly
};


  return (
    <View style={{ padding: 20, paddingTop: 50}}> 
      <Text style={{ fontSize: 24, marginBottom: 20, color: 'pink'}}> Fruit: </Text>

      {/* map over the array  */}
      {fruit.map((oneFruit, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 18, color: 'pink' }}>
            Fruit: {oneFruit.name}
          </Text>
          
          {/* Make image clickable */}
        <Pressable onPress={() => openFruitImage(oneFruit.image)}>
        <Image 
            source={{ uri: oneFruit.image }} 
            style={{ width: 100, height: 100, borderRadius: 8 }}
        />
        </Pressable>
          
    
        </View>
      ))}



    </View>
  );
}