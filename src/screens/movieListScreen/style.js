import {StyleSheet} from 'react-native';
import {Width} from '../../themes/dimension';
import {COLORS} from '../../themes/colors.';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Width * 0.05,
    backgroundColor: COLORS.movieHeader,
  },
  headerText: {color: COLORS.white},
  movieSearch: {
    fontSize: Width * 0.025,
    marginHorizontal: Width * 0.05,
    paddingTop: Width * 0.035,
    color: COLORS.red,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: Width * 0.05,
    fontSize: Width * 0.05,
  },
  searchButton: {
    backgroundColor: COLORS.lightGrey,
    padding: Width * 0.04,
    marginRight: Width * 0.05,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: Width * 0.03,
    fontWeight: 500,
  },
  underline: {
    height: Width * 0.005,
    backgroundColor: COLORS.red,
    marginTop: Width * -0.01,
    width: Width * 0.64,
    marginLeft: Width * 0.05,
  },
  card: {
    backgroundColor: COLORS.backGround,
    borderRadius: 5,
    marginBottom: Width * 0.025,
    width: Width * 0.425,
    elevation: 1,
    marginLeft: Width * 0.05,
    marginTop: Width * 0.025,
  },
  image: {
    width: Width * 0.425,
    height: Width * 0.6,
    marginBottom: Width * 0.03,
    objectFit: 'fill',
  },
  title: {
    fontWeight: 'bold',
    fontSize: Width * 0.035,
    paddingLeft: Width * 0.03,
  },
  year: {
    color: '#777',
    fontSize: Width * 0.032,
    paddingLeft: Width * 0.03,
    fontWeight: 300,
  },
  type: {
    color: '#777',
    fontSize: Width * 0.032,
    paddingLeft: Width * 0.03,
    fontWeight: 300,
  },
  noMoviesText: {textAlign: 'center', marginTop: Width * 0.05, color: COLORS.red},
});
export default styles;
