import React, { useState } from 'react';
import { Button, Image, StyleSheet, View, TextInput } from 'react-native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [originX, setOriginX] = useState(0);
  const [originY, setOriginY] = useState(0);
  const [widthResize, setWidthResize] = useState(0);
  const [heightResize, setHeightResize] = useState(0);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const rotate90andFlip = async () => {
    const manipResult = await manipulateAsync(
      image.localUri || image.uri,
      [
        { rotate: 90 },
        { flip: FlipType.Vertical },
      ],
      { compress: 1, format: SaveFormat.JPEG }
    );
    setImage(manipResult);
  };

  const mirrorImage = async () => {
    const manipResult = await manipulateAsync(
      image.localUri || image.uri,
      [
        { rotate: 180 },
        { flip: FlipType.Vertical },
      ],
      { compress: 1, format: SaveFormat.JPEG || SaveFormat.PNG }
    );
    setImage(manipResult);
  };

  const resizeImage = async () => {
    const manipResult = await manipulateAsync(
      image.localUri || image.uri,
      [
        { resize: { width: parseFloat(widthResize), height: parseFloat(heightResize) } },
      ],
      { compress: 1, format: SaveFormat.JPEG || SaveFormat.PNG }
    );
    setImage(manipResult);
  };

  const cropImage = async () => {
    const manipResult = await manipulateAsync(
      image.localUri || image.uri,
      [
        { crop: { height: parseFloat(height), originX: parseFloat(originX), originY: parseFloat(originY), width: parseFloat(width) } },
      ],
      { compress: 1, format: SaveFormat.JPEG }
    );
    setImage(manipResult);
  };

  const renderImage = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderImage()}
      <View style={styles.buttonContainer}>
        <Button title="Rotate and Flip" onPress={rotate90andFlip} color="#ff304f" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Mirror Image" onPress={mirrorImage} color="#ff304f" />
      </View>
      <View style={styles.buttonContainer}>
        <TextInput style={styles.input} placeholder="Height" onChange={e => setHeight(e.target.value)} value={height || ''} keyboardType="numeric"></TextInput>
        <TextInput style={styles.input} placeholder="Width" onChange={e => setWidth(e.target.value)} value={width || ''} keyboardType="numeric"></TextInput>
        <TextInput style={styles.input} placeholder="originX" onChange={e => setOriginX(e.target.value)} value={originX || ''} keyboardType="numeric"></TextInput>
        <TextInput style={styles.input} placeholder="originY" onChange={e => setOriginY(e.target.value)} value={originY || ''} keyboardType="numeric"></TextInput>
        <Button title="Crop" onPress={cropImage} color="#ff304f"/>
      </View>
      <View style={styles.buttonContainer}>
        <TextInput style={styles.input} placeholder="Height" onChange={setHeightResize(value)} value={heightResize || ''} keyboardType="numeric"></TextInput>
        <TextInput style={styles.input} placeholder="Width" onChange={setWidthResize(value)} value={widthResize || ''} keyboardType="numeric"></TextInput>
        <Button title="Resize" onPress={resizeImage} color="#ff304f" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  image: {
    width: 250,
    height: 200,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 350,
    borderWidth: 3,
    justifyContent: 'center',
    padding: 10,

    borderColor: '#61121e',
  },
  input: {
    width: 75,
    backgroundColor: '#fff',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 2,
    padding: 5,
  },
});
