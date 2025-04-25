import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MediaThumbnail from './media_thumbnail';
import { scaleHoz, scaleMin, theme } from '@/lib/styles';


interface MediaTileProps {
  size?: number;
  title: string;
}

function MediaTile(props: MediaTileProps) {

  return (
    <View style={styles.container}>
      <MediaThumbnail size={props.size} title={props.title}></MediaThumbnail>
      <Text style={[theme.text, {maxWidth: scaleHoz(40)}]}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scaleMin(4),
    alignItems: 'center',
  },
});

export default MediaTile;


