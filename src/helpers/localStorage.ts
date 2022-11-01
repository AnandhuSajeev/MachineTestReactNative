import AsyncStorage from '@react-native-async-storage/async-storage';
import keys from './keys';
//local storage data handle
async function get(key: string) {
  return AsyncStorage.getItem(key);
}

async function set(key: string, value: string) {
  AsyncStorage.setItem(key, `${value}`);
  return;
}

async function remove(key: string) {
  AsyncStorage.removeItem(key);
  return;
}

async function clear() {
  const keysArray = Object.keys(keys).map(key => key);
  await AsyncStorage.multiRemove(keysArray);
  return true;
}
export default {clear, remove, set, get};
