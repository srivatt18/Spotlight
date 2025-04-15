import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Rectangle from '../../assets/images/Rectangle.png';
import PlayButton from '../../assets/images/PlayButton.png';
import Description from '../../assets/images/Description.png';

interface MediaTileProps {
  size?: number;
}

const MediaTile: React.FC<MediaTileProps> = ({ size = 100 }) => {
  return (
    <View style={styles.container}>
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={Rectangle}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
        <Image
          source={PlayButton}
          style={{
            position: 'absolute',
            width: size * 0.5,
            height: size * 0.5,
          }}
          resizeMode="contain"
        />
      </View>
      <Image
        source={Description}
        style={{ width: size, height: size * 0.4, marginTop: 8 }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default MediaTile;

