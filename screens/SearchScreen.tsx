import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const SearchScreen = ({ navigation }: { navigation: any }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    if (searchText === "") return;
    navigation.navigate("Profile", { username: searchText });
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="#161B22" />
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            color="#eee"
            size={24}
            style={styles.searchIcon}
          />
          <AntDesign
            onPress={() => handleSearch()}
            name="check"
            color="#eee"
            size={24}
            style={styles.checkIcon}
          />
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder="Search"
            placeholderTextColor="#eee"
            autoFocus={true}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E1117",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 20,
    zIndex: 1,
  },
  checkIcon: {
    position: 'absolute',
    right: 20,
  },
  input: {
    height: 60,
    width: "100%",
    borderRadius: 10,
    paddingLeft: 50,
    paddingRight: 10,
    paddingTop: 4,
    backgroundColor: "#161B22",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    zIndex: -1,
    color: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export default SearchScreen;