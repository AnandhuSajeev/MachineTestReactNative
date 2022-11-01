import {ColorValue} from 'react-native';
//get random colors
export function getUniqueColor(): ColorValue {
  var num = Math.round(Math.random() * Math.pow(10, 7));
  // Converting number to hex string to be read as RGB
  var hexString = '#' + num.toString(16);

  return hexString;
}
