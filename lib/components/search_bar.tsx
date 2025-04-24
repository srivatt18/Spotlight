// components/SearchBar.tsx
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Pressable, StyleSheet} from 'react-native';
import media from '@/backend/imdb_movies.json'; 
import { theme, text } from '../styles';

type mediatitle = {
  names: string;
  genre: string;
  score: number;
};

type Props = {
  onSelect: (movie: mediatitle) => void;
};

export default function SearchBar({ onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<mediatitle[]>([]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = media.filter(media =>
      media.names.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <View>
      <TextInput
        placeholder="Search for a movie/show..."
        value={query}
        onChangeText={handleSearch}
        style={[theme.textInput, styles.input]}
      />
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => onSelect(item)} style={styles.result}>
            <Text style={[text.md]}>{item.names}</Text>
            <Text style={[text.light]}>{item.genre}</Text>
            <Text style={[text.light]}>Score: {item.score}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  result: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF'
  },
  genre: {
    color: '#777',
  },
  score: {
    marginTop: 4,
    color: '#555',
  },
});
