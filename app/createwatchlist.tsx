import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import MediaTile from '../lib/components/media_tile';
import PlusIcon from '../assets/images/plus.png';
import SearchIcon from '../assets/images/search.png';
import { theme, text } from '../lib/styles';
import { MediaType } from '@/lib/validate';
import SearchBar from '@/lib/components/search_bar';

const screenWidth = Dimensions.get('window').width;
const tileSize = screenWidth / 15;

const CreateWatchlist = () => {
  const [watchlist, setWatchlist] = useState<MediaType[]>([])

  function addToWatchlist(movie: MediaType) {
    if (!watchlist.find(item => item.names === movie.names)) {
      setWatchlist(prev => [...prev, movie]); // Default rating
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Watchlist Name */}
        <Text style={[text.xl, { marginBottom: 20 }]}>Add to your personal watchlist!</Text>

        <SearchBar onSelect={addToWatchlist} />

{/* Add movies from watchlist */}
        {/* Media Tiles
        <View style={styles.tileGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.tileWrapper}>
              <MediaTile title="Frozen II" size={tileSize} />

              <Image source={PlusIcon} style={styles.plusIcon} />
            </View>
          ))}
        </View> */}
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.buttonText}>Submit</Text>
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
  nameInput: {
    borderBottomWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed',
    width: '100%',
    marginBottom: 16,
  },
  

  searchInput: {
    color: 'white',
    flex: 1,
    fontFamily: 'Monomaniac One',
    fontSize: 22
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
  plusIcon: {
    position: 'absolute',
    bottom: 30,
    right: -13,
    width: 24,
    height: 24,
    tintColor: '#CF4747',
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

export default CreateWatchlist;
