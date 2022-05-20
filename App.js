import React, { useState, useEffect } from 'react';
import { Button, Image, StyleSheet, View, TextInput } from 'react-native';
import { Asset } from 'expo-asset';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

export default function App() {
  const [ready, setReady] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const image = Asset.fromModule(require('./assets/test_image2.jpg'));
      await image.downloadAsync();
      setImage(image);
      setReady(true);
    })();
  }, []);

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
      { compress: 1, format: SaveFormat.JPEG }
    );
    setImage(manipResult);
  };

  const resizeImage = async () => {
    const manipResult = await manipulateAsync(
      image.localUri || image.uri,
      [
        { resize: { height: 50, width: 50 } },
      ],
      { compress: 1, format: SaveFormat.JPEG }
    );
    setImage(manipResult);
  };

  const cropImage = async () => {
    const manipResult = await manipulateAsync(
      image.localUri || image.uri,
      [
        { crop: { height: 200, originX: 180, originY: 180, width: 250 } },
      ],
      { compress: 1, format: SaveFormat.JPEG }
    );
    setImage(manipResult);
  };

  const renderImage = () => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: image.localUri || image.uri }}
        style={styles.image}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {ready && image && renderImage()}
      <View style={styles.buttonContainer}>
        <Button title="Rotate and Flip" onPress={rotate90andFlip} color="#ff304f" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Mirror Image" onPress={mirrorImage} color="#ff304f" />
      </View>
      <View style={styles.buttonContainer}>
        <TextInput style={styles.input} placeholder="Height" ></TextInput>
        <TextInput style={styles.input} placeholder="Width"></TextInput>
        <TextInput style={styles.input} placeholder="originX"></TextInput>
        <TextInput style={styles.input} placeholder="originY"></TextInput>
        <Button title="Resize" onPress={resizeImage} color="#ff304f"/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Crop" onPress={cropImage} color="#ff304f" />
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
