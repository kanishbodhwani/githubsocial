import * as SecureStore from 'expo-secure-store';

export const saveSecure = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
}

export const getSecure = async (key: string) => {
    return await SecureStore.getItemAsync(key);
}

export const removeSecure = async (key: string) => {
    await SecureStore.deleteItemAsync(key);
}