import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import SearchBar from '@/lib/components/search_bar';
import { theme, text } from '@/lib/styles';
import { MediaType } from '@/lib/validate';
import { updateUser } from '@/lib/auth-client';
import { serializeWatchHistory } from '@/lib/convert';

export default function InitialRank() {
  const [selected, setSelected] = useState<{ media: MediaType, rating: number }[]>([]);

  function submitRatings() {
    let ratings = selected.map(item => ({
      title: item.media.names,
      rating: item.rating
    }));

    updateUser({
      watchedMovies: serializeWatchHistory(ratings)
    })
  }

  function onSearchSelect(movie: MediaType) {
    if (!selected.find(item => item.media.names === movie.names)) {
      setSelected(prev => [...prev, { media: movie, rating: 50 }]); // Default rating
    }
  };

  function updateRating(index: number, rating: string) {
    const copy = [...selected];
    copy[index].rating = parseInt(rating) || 0;
    setSelected(copy);
  };

  return (
    <View style={styles.container}>
      <Text style={[text.xl, { marginBottom: 20 }]}>Please rate 5 Movies from 0-100, so we can find your next watch!</Text>
      <SearchBar onSelect={onSearchSelect} />

      <FlatList
        data={selected}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.ratingItem}>
            <Text style={[text.md]}> {item.media.names}</Text>
            <TextInput
              style={[theme.textInput, styles.input, { marginLeft: 10 }]}
              keyboardType="numeric"
              value={item.rating.toString()}
              onChangeText={(val) => updateRating(index, val)}
            />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        disabled={selected.length < 5}
        onPress={submitRatings}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#000000' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  ratingItem: { marginLeft: 10, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 5,
    width: 60,
    marginTop: 5,
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

