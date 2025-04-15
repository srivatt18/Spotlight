import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import NavBar from '../lib/components/navbar';
import MediaTile from '../lib/components/media_tile';
import { theme, text } from '../lib/styles';

const screenWidth = Dimensions.get('window').width;
const tileSize = screenWidth / 15;

const RecommendationPage = () => {
  return (
    <View style={styles.container}>
      <NavBar />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Movies*/}
        <Text style={[text.xl, { marginBottom: 20 }]}>Movies:</Text>

        {/* Media Tiles */}
        <View style={styles.tileGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.tileWrapper}>
              <MediaTile size={tileSize} />
            </View>
          ))}
        </View>
        
        {/* Shows*/}
        <Text style={[text.xl, { marginBottom: 20 }]}>Shows:</Text>

        {/* Media Tiles */}
        <View style={styles.tileGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.tileWrapper}>
              <MediaTile size={tileSize} />
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.buttonText}>Generate More Recommendations</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    padding: 16,
    marginTop: 120,
    alignItems: 'flex-start',
  },
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    width: '100%',
  },
  tileWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#cf4747',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 24,
    zIndex: 10,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Monomaniac One',
    fontSize: 18,
  },
});

export default RecommendationPage;
