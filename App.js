import React, { useState } from 'react';
import { Button, Image, StyleSheet, View, TextInput } from 'react-native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [originX, setOriginX] = useState('');
  const [originY, setOriginY] = useState('');
  const [widthResize, setWidthResize] = useState('');
  const [heightResize, setHeightResize] = useState('');

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
      <View style={styles.buttonContainer}>
        <Button title="Pick an image" onPress={pickImage} color="#ff304f" />
      </View>
      {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderImage()}
      <View style={styles.functionContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Rotate and Flip" onPress={rotate90andFlip} color="#ff304f" />
        </View>
      </View>
      <View style={styles.functionContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Mirror Image" onPress={mirrorImage} color="#ff304f" />
        </View>
      </View>
      <View style={styles.functionContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Height" onChangeText={setHeight} value={height} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Width" onChangeText={setWidth} value={width} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="originX" onChangeText={setOriginX} value={originX} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="originY" onChangeText={setOriginY} value={originY} keyboardType="numeric" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Crop" onPress={cropImage} color="#ff304f"/>
        </View>
      </View>
      <View style={styles.functionContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Height" onChangeText={setHeightResize} value={heightResize} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Width" onChangeText={setWidthResize} value={widthResize} keyboardType="numeric" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Resize" onPress={resizeImage} color="#ff304f" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  functionContainer: {
    // borderBottomColor: '#ff304f',
    // borderWidth: 3,
    // borderBottomLeftRadius: 5,
    // borderBottomRightRadius: 5,
    padding: 10,
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
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
