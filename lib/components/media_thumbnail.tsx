import React, { useState } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import Rectangle from '../../assets/images/Rectangle.png';

interface Props {
  size?: number;
  title: string;
}

async function searchMovie(title: string) {
  let endpoint = "https://api.themoviedb.org/3/search/movie?";
  let url = endpoint + new URLSearchParams({ query: title, include_adult: "false", language: "en-US", page: "1" }).toString()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOThjYTI5OTg1NWViZGFhZGNlNzNmYWU3M2NlYTllZiIsIm5iZiI6MTc0NTUxNTc2Mi4wOTc5OTk4LCJzdWIiOiI2ODBhNzRmMjhiY2VhNjZhODZhYWFjMTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FNZ9jA9gvHBKZ4ouI8HgtvQ9MRnl5zWS14uEC8IAssg'
    }
  };

  let movie = await fetch(url, options)
    .then(res => res.json())
  
  return "https://image.tmdb.org/t/p/w500/" + movie.results[0].poster_path;
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


