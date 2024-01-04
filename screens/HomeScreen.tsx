import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar'
import { User } from '../src/types/User'
import Header from '../src/components/Header'
import { getUserRepositories } from '../src/services/userServices';
import { useRepoContext } from '../src/context/repoContext';
import RepoItem from '../src/components/RepoItem';
import {
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";

const HomeScreen = ({ navigation, user, handleSignOut }: { navigation: any, user: User, handleSignOut: () => void }) => {
  const { repos, setRepos } = useRepoContext();

  const [poppins] = useFonts({
    Poppins_600SemiBold,
  });

  useEffect(() => {
    const fetchUserRepos = async () => {
      try {
        if (user.username) {
          const repos = await getUserRepositories(user.username);
          setRepos(repos);
        }
      } catch (error) {
        console.error('Error fetching user repositories:', error);
      }
    };

    fetchUserRepos();
  }, [user, setRepos]);

  const memoizedRepos = useMemo(() => repos, [repos]);
  if(!poppins) return null;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#0E1117" />
      <Header navigation={navigation} user={user} />
      <Text style={{ color: "#E1E1E2", fontSize: 20, fontFamily: "Poppins_600SemiBold", paddingHorizontal: 20, marginBottom: 10, marginTop: 10 }}>Repositories</Text>
      <FlatList
        style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 10}}
        data={memoizedRepos}
        keyExtractor={(item) => item.full_name}
        renderItem={({ item }) => <RepoItem navigation={navigation} repo={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#0E1117",
  }
});

export default HomeScreen;