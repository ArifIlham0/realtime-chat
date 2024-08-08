import AsyncStorage from "@react-native-async-storage/async-storage";

async function set(key, object) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(object));
  } catch (error) {
    console.log("Set item error: ", error);
  }
}

async function get(key) {
  try {
    const data = await AsyncStorage.getItem(key);

    if (data !== null) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log("Get item error: ", error);
  }
}

async function remove(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Remove item error: ", error);
  }
}

async function wipe() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("Wipe item error: ", error);
  }
}

export default { set, get, remove, wipe };
