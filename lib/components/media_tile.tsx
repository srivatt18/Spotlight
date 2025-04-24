import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Rectangle from '../../assets/images/Rectangle.png';
import PlayButton from '../../assets/images/PlayButton.png';
import Description from '../../assets/images/Description.png';


interface MediaTileProps {
  size?: number;
  title: string;
}


async function searchMovie(title: string) {
  let endpoint = "https://themoviedb.org/3/search/movie?";
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
    .then(json => console.log(json))
    .catch(err => console.error(err));
  


  alert(movie.results[0].poster_path);
  
  return movie.results[0].poster_path;
  


}

const MediaTile: React.FC<MediaTileProps> = ({ size = 100, title }) => {
  return (
    <View style={styles.container}>
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source = {searchMovie(title)}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default MediaTile;


