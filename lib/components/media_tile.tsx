import React, { useState } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import Rectangle from '../../assets/images/Rectangle.png';
import MediaThumbnail from './media_thumbnail';
import { theme } from '@/lib/styles';


interface MediaTileProps {
  size?: number;
  title: string;
}

function MediaTile(props: MediaTileProps) {

  return (
    <View style={styles.container}>
      <View style={{ width: props.size, height: props.size, justifyContent: 'center', alignItems: 'center' }}>
        <MediaThumbnail size={props.size} title={props.title}></MediaThumbnail>
      </View>
      <Text style={theme.text}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default MediaTile;


