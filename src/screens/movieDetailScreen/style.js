import {StyleSheet} from 'react-native';
import {Width} from '../../themes/dimension';
import { COLORS } from '../../themes/colors.';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelContainer: {
    marginHorizontal: Width * 0.09,
    marginVertical: Width * 0.03,
  },
  poster: {
    width: '100%',
    height: Width * 0.94,
    objectFit: 'cover',
  },
  info: {
    fontSize: Width * 0.035,
    color: COLORS.black,
  },
  labelView: {flexDirection: 'row', marginBottom: Width * 0.025},
  labelText: {fontWeight: 'bold', width: Width * 0.3, fontSize:Width * 0.035},
});
export default styles;
