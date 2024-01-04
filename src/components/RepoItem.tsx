import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Repository } from "../types/Repository";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

// colors
// E1E1E2
// B1B2B5
// 878A8B

const RepoItem = ({ navigation, repo }: { navigation: any, repo: Repository }) => {
  const [poppins] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!poppins) return null;
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.repo_item} onPress={() => navigation.navigate("Repo", {
      repo: repo.name
    })}>
      <Text style={styles.repo_name}>{repo.name}</Text>
      <Text numberOfLines={2} style={styles.repo_des}>{repo.description}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
        <Text style={styles.repo_lang}>{repo.language}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.repo_stars}>
            <AntDesign name="staro" size={16} color="#878A8B" />
            {repo.stargazers_count}
            </Text>
            <Text style={styles.repo_forks}>
            <FontAwesome name="code-fork" size={16} color="#878A8B" />
            {repo.forks_count}
            </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  repo_item: {
    padding: 20,
    backgroundColor: "#161B22",
    width: "100%",
    height: 150,
    marginBottom: 20,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  repo_name: {
    color: "#E1E1E2",
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  repo_des: {
    color: "#878A8B",
    fontSize: 14,
    marginTop: 5,
    fontFamily: "Poppins_500Medium",
  },
  repo_lang: {
    color: "#878A8B",
    fontSize: 14,
    marginTop: 5,
    marginRight: 10,
    fontFamily: "Poppins_400Regular",
  },
  repo_stars: {
    color: "#878A8B",
    fontSize: 14,
    marginTop: 5,
    marginRight: 10,
    fontFamily: "Poppins_400Regular",
  },
  repo_forks: {
    color: "#878A8B",
    fontSize: 14,
    marginTop: 5,
    marginRight: 10,
    fontFamily: "Poppins_400Regular",
  },
});

export default RepoItem;
