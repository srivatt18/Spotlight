import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MediaTile from '@/lib/components/media_tile';
import { theme, text, scaleVert, scaleMin, scale } from '@/lib/styles';
import { MediaType } from '@/lib/validate';
import SearchBar from '@/lib/components/search_bar';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'expo-router';

const router = useRouter()

function CreateWatchlist() {
  let session = useSession()
  useEffect(() => {
    if (!session) {
      router.push('/auth/login')
    }
  }, [])

  const [watchlist, setWatchlist] = useState<MediaType[]>([])
  const [saved, setSaved] = useState(true);

  function addToWatchlist(movie: MediaType) {
    if (!watchlist.find(item => item.names === movie.names)) {
      setWatchlist(prev => [...prev, movie]);
      setSaved(false)
    }
  };

  function saveWatchlist() {
    // Save watchlist
    setSaved(true)
  }

  return (
    <View style={theme.container}>
      {/* Watchlist Name */}
      <Text style={[text.xl, { marginBottom: 20 }]}>Add to your personal watchlist!</Text>

      <SearchBar onSelect={addToWatchlist} />

      {/* Movies in watchlist */}
      <View style={styles.tileGrid}>
        {watchlist.map((media, index) => (
          <View key={index} style={{ flex: 1, flexDirection: "row", padding: scaleVert(4) }}>

            <MediaTile title={media.names} size={scale(40)} />
            <Text style={[text.text, { padding: scaleMin(4) }]}>{media.overview}</Text>

          </View>
        ))}
      </View>
      <TouchableOpacity onPress={saveWatchlist} disabled={saved}>
        <Text style={[theme.button, saved ? { backgroundColor: 'gray'} : null]}>Save changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tileGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    width: '100%',
  },
});

export default CreateWatchlist;
