import React, { useState } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import Rectangle from '@/assets/images/Rectangle.png';

interface Props {
  size?: number;
  title: string;
}

async function searchMovie(title: string) {
  let endpoint = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/images/movie?`;
  let url = endpoint + new URLSearchParams({ query: title, include_adult: "false", language: "en-US", page: "1" }).toString()

  let movie = await fetch(url)
    .then(res => res.json())
  
  return "https://image.tmdb.org/t/p/w500/" + movie.results[0]?.poster_path;
}

function MediaThumbnail(props: Props) {
  const [posterUri, setPosterUri] = useState<string>("");

  searchMovie(props.title).then((res)=>setPosterUri(res))
  return (
    <View>
      {posterUri
          ? <Image
              source={{ uri: posterUri }}
              style={{ width: props.size, height: props.size }}
              resizeMode="contain"
            />
          : <Image
              source={Rectangle}  // placeholder
              style={{ width: props.size, height: props.size }}
              resizeMode="contain"
            />
      }
    </View>
  );
};
export default MediaThumbnail;


