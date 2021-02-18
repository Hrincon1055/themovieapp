import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';
import {
  getNewsMoviesApi,
  getAllGenresApi,
  getGenreMoviesApi,
} from '../api/movies';
import {map} from 'lodash';

const Home = props => {
  const {navigation} = props;
  const [newMovies, setNewMovies] = useState(null);
  const [genresList, setGenresList] = useState([]);
  const [genreSelected, setgenreSelected] = useState(28);
  const [genreMovies, setGenreMovies] = useState(null);

  useEffect(() => {
    getNewsMoviesApi().then(response => {
      setNewMovies(response.results);
    });
  }, []);
  useEffect(() => {
    getAllGenresApi().then(response => {
      setGenresList(response.genres);
    });
  }, []);
  useEffect(() => {
    getGenreMoviesApi(genreSelected).then(response => {
      setGenreMovies(response.results);
    });
  }, [genreSelected]);
  const onChangeGenre = newGenreId => {
    setgenreSelected(newGenreId);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas Películas</Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      )}
      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Películas por genero</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genreList}>
          {map(genresList, genre => (
            <Text
              key={genre.id}
              style={[
                styles.genre,
                // eslint-disable-next-line react-native/no-inline-styles
                {color: genre.id !== genreSelected ? '#8697a5' : '#fff'},
              ]}
              onPress={() => onChangeGenre(genre.id)}>
              {genre.name}
            </Text>
          ))}
        </ScrollView>
        {genreMovies && (
          <CarouselMulti data={genreMovies} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genreList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});
