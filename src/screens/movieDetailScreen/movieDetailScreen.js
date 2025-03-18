import React, {useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator, ScrollView} from 'react-native';
import styles from './style';
import getMovies from '../../utils/constants/apiEndpoints';
import { COLORS } from '../../themes/colors.';

const MovieDetailScreen = ({route}) => {
  const {imdbID} = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(getMovies.movieDetails(imdbID));
        const data = await response.json();
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          console.error('Error fetching movie details:', data.Error);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.red} />;
  }

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Movie details not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {movie?.Poster !== 'N/A' && (
        <Image source={{uri: movie?.Poster}} style={styles.poster} />
      )}
      
      <View style={styles.labelContainer}>
        {[
          {label: 'Title', value: movie?.Title},
          {label: 'Year', value: movie?.Year},
          {label: 'Director', value: movie?.Director},
          {label: 'Genre', value: movie?.Genre},
          {label: 'Plot', value: movie?.Plot},
          {label: 'IMDB Rating', value: movie?.imdbRating},
          {label: 'Box Office', value: movie?.BoxOffice},
          {
            label: 'Ratings',
            value: movie?.Ratings?.map(r => `${r.Source}: ${r.Value}`).join(', '),
          },
        ].map((item, index) => (
          <View key={index} style={styles.labelView}>
            <Text style={styles.labelText}>
              {item.label}
            </Text>
            <Text style={[styles.info, {flexShrink: 1}]}>{item.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MovieDetailScreen;
