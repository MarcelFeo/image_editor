import React, { useState, useEffect } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
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

  // const cropImage = async () => {
  //   const manipResult = await manipulateAsync(
  //     image.localUri || image.uri,
  //     [
  //       { resize: { height: 50, width: 50 } },
  //     ],
  //     { compress: 1, format: SaveFormat.JPEG }
  //   );
  //   setImage(manipResult);
  // };

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
        <Button title="Resize" onPress={resizeImage} color="#ff304f" />
      </View>
      {/* <View style={styles.buttonContainer}>
        <Button title="Crop" onPress={cropImage} color="#ff304f" />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 200,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
  }
});
