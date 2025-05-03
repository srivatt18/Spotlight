// components/SearchBar.tsx
import React, { useState } from 'react';
import { View, Image, TextInput, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import media from '@/assets/movies';
import SearchIcon from '@/assets/images/search.png';
import { theme, text } from '@/lib/styles';
import { MediaType } from '@/lib/validate';
import MediaThumbnail from '@/lib/components/media_thumbnail';

type Props = {
  onSelect: (movie: MediaType) => void;
};

export default function SearchBar({ onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MediaType[]>();

  function handleSearch(text: string) {
    console.log(text)
    setQuery(text);
    if (text.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = media.filter(media =>
      media.names.toLowerCase().includes(text.toLowerCase())
    ).slice(0, 9);
    setResults(filtered);
  };

  return (
    <View>
      <View style={styles.searchBar}>
        <Image source={SearchIcon} style={styles.searchIcon} />
        <TextInput
          placeholder="Search for a movie..."
          value={query}
          onChangeText={handleSearch}
          style={theme.text}
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => {onSelect(item); setQuery(""); setResults([])}} style={styles.result}>
            <MediaThumbnail size={100} title={item.names}></MediaThumbnail>
            <View>
              <Text style={[text.md]}>{item.names}</Text>
              <Text style={[text.light]}>{item.genre}</Text>
              <Text style={[text.light]}>Score: {item.score}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  result: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: "row",
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#CF4747',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 15,
    marginBottom: 24,
    marginTop: 18,
    width: '100%',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});
