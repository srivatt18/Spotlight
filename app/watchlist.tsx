import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MediaTile from '@/lib/components/media_tile';
import { theme, text, scaleVert, scaleMin, scale } from '@/lib/styles';
import { MediaType, MovieHistoryType, watchedMoviesSchema, watchlistSchema } from '@/lib/validate';
import SearchBar from '@/lib/components/search_bar';
import { useSession, updateUser } from '@/lib/auth-client';
import { useRouter } from 'expo-router';

const router = useRouter()

function Watchlist() {
  let session = useSession()

  const [watchlist, setWatchlist] = useState<MediaType[]>([])
  const [watchedMovies, setWatchedMovies] = useState<MovieHistoryType[]>([])

  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (!session.data) {
        router.push('/auth/login')
      }
    }, 500)

    if (session.data) {
      console.log("watchlist: " + session.data.user.watchList)
      setWatchlist(watchlistSchema.parse(JSON.parse(session.data.user.watchList)))
      setWatchedMovies(watchedMoviesSchema.parse(JSON.parse(session.data.user.watchedMovies)))
    }
  }, [])

  function addToWatchlist(movie: MediaType) {
    if (!watchlist.find(item => item.names === movie.names)) {
      setWatchlist(prev => [...prev, movie]);
      setSaved(false)
    }
  };

  function setWatched(title: string, rating: number, watched: boolean) {
    if (session.data?.user.watchedMovies.includes(title) && !watched) {
      setWatchedMovies(watchedMovies?.filter(movie => movie.title != title))
    } else if (!session.data?.user.watchedMovies.includes(title) && watched) {
      setWatchedMovies(watchedMovies.concat([{title, rating}]))
    }
  }

  function saveWatchlist() {
    updateUser({
      watchList: JSON.stringify(watchlist)
    })
    setSaved(true)
  }

  return (
    <ScrollView style={{backgroundColor: "#000"}} contentContainerStyle={theme.container}>
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
        <Text style={[theme.button, saved ? { backgroundColor: 'gray' } : null]}>Save changes</Text>
      </TouchableOpacity>
    </ScrollView>
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

export default Watchlist;
