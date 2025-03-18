import React, {useState, useEffect, useCallback, memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import styles from './style';
import getMovies from '../../utils/constants/apiEndpoints';
import {COLORS} from '../../themes/colors.';
import appRoutes from '../../utils/constants/app.routes';

const MovieListScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigation = useNavigation();

  let searchTimeout = null;

  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);

    if (searchText.trim()) {
      searchTimeout = setTimeout(() => {
        fetchMovies();
      }, 500);
    } else {
      setMovies([]);
      setSearched(false);
    }

    return () => clearTimeout(searchTimeout);
  }, [searchText]);

  const fetchMovies = async () => {
    if (!searchText.trim()) return;
    setLoading(true);
    setSearched(true);

    const netInfo = await NetInfo.fetch();

    if (netInfo.isConnected) {
      try {
        const response = await fetch(getMovies.movieSearch(searchText));
        const data = await response.json();

        if (data.Response === 'True') {
          setMovies(data.Search);

          await AsyncStorage.setItem(`@movies_${searchText}`, JSON.stringify(data.Search));
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('No internet connection - fetching from AsyncStorage');
      loadOfflineData();
    }
  };

  const loadOfflineData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(`@movies_${searchText}`);
      if (cachedData) {
        setMovies(JSON.parse(cachedData));
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemPress = imdbID => {
    navigation.navigate(appRoutes.MovieDetailScreen, {imdbID});
  };

  const RenderItem = memo(({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleItemPress(item.imdbID)}>
      <Image
        source={{
          uri:
            item.Poster !== 'N/A'
              ? item.Poster
              : 'https://m.media-amazon.com/images/M/MV5BNDMxN2FjMjAtNTQ4YS00MWE0LWIzMjktZjc0YTUxOTc5YWFkXkEyXkFqcGdeQXVyOTU3ODk4MQ@@._V1_SX300.jpg',
        }}
        style={styles.image}
      />
      <Text style={styles.title}> {item.Title}</Text>
      <Text style={styles.type}> {item.Type}</Text>
      <Text style={styles.year}> {item.Year}</Text>
    </TouchableOpacity>
  ));

  const keyExtractor = useCallback(item => item.imdbID, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>omdbSearchClient</Text>
      </View>

      <View>
        <Text style={styles.movieSearch}>Search by movie title</Text>
      </View>

      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchButton} onPress={fetchMovies}>
            <Text style={styles.buttonText}>SEARCH</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.underline} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.red} />
      ) : movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={keyExtractor}
          renderItem={({item}) => <RenderItem item={item} />}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
        />
      ) : searched ? (
        <Text style={styles.noMoviesText}>No movies found</Text>
      ) : null}
    </View>
  );
};

export default MovieListScreen;
