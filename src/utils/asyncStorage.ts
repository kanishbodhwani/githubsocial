import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (itemName: string, value: Object) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(itemName, jsonValue);
    } catch (e) {
        console.log(e);
    }
}

export const getData = async (itemName: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(itemName);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
        console.log(e);
    }
}

export const removeData = async (itemName: string) => {
    try {
        await AsyncStorage.removeItem(itemName);
    } catch (e) {
        console.log(e);
    }
}