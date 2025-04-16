import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import MediaTile from '@/lib/components/media_tile';
import { theme, text, scale, scaleHoz, scaleVert } from '../lib/styles';

export default function RecommendationPage() {
  return (
    <ScrollView contentContainerStyle={[theme.container, { gap: scaleVert(10) }]}>
      {/* Movies*/}
      <View>
        <Text style={[text.xl, { marginBottom: 20 }]}>Movies:</Text>

        {/* Media Tiles */}
        <View style={styles.tileGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index}>
              <MediaTile size={scaleHoz(35)} />
            </View>
          ))}
        </View>
      </View>


      {/* Shows*/}
      <View>
        <Text style={[text.xl, { marginBottom: 20 }]}>Shows:</Text>

        {/* Media Tiles */}
        <View style={styles.tileGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index}>
              <MediaTile size={scaleHoz(35)} />
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity>
        <Text style={theme.button}>Generate More Recommendations</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: scaleHoz(15),
    width: '100%',
  },
});