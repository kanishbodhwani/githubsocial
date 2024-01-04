import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser } from "../src/services/userServices";
import { getData, removeData } from "../src/utils/asyncStorage";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import Loader from "../src/components/Loader";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const ProfileScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { username } = route.params;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [noUser, setNoUser] = useState(false);

  const [poppins] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    setNoUser(false);
    (async () => {
      try {
        if (!username || username === "") {
          const storedUser = await getData("@user");
          const fetchedUser = await getUser(storedUser.username);
          setUser(fetchedUser);
        } else {
          const fetchedUser = await getUser(username);
          if (!fetchedUser) {
            setNoUser(true);
            return;
          }
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle specific errors here
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  if (!poppins || loading) return <Loader />;

  const signout = async () => {
    await signOut(auth);
    await removeData("@user");
  }

  if (noUser) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.goBackContainer}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="#E1E1E2"
            onPress={() => navigation.goBack()}
          />
        </View>
        <StatusBar style="light" backgroundColor="#0E1117" />
        <Text style={styles.errorMessage}>User not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.goBackContainer}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="#E1E1E2"
          onPress={() => navigation.goBack()}
        />
      </View>
      <StatusBar style="light" backgroundColor="#0E1117" />
      <Image style={styles.avatar} source={{ uri: user?.avatar_url }} />
      <Text style={styles.username}>{user?.name}</Text>
      <Text style={styles.bio}>{user?.bio}</Text>
      <View style={styles.followContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Followers", { username: user?.login })
          }
        >
          <Text style={styles.followText}>{user?.followers} followers</Text>
        </TouchableOpacity>
        <Text style={styles.followText}>{user?.following} following</Text>
      </View>
      <Text style={styles.info}>{user?.html_url}</Text>
      <Text style={styles.info}>{user?.email}</Text>
      <Text style={styles.info}>{user?.blog}</Text>
      <Text style={styles.info}>Public Repos: {user?.public_repos}</Text>
      <Text style={styles.info}>Public Gists: {user?.public_gists}</Text>
      <Text style={styles.info}>
        Private Repos: {user?.total_private_repos}
      </Text>
      <Text style={styles.info}>Location: {user?.location}</Text>
      <TouchableOpacity onPress={() => signout()}>
        <Text style={styles.logout}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#0E1117",
    alignItems: "center",
  },
  goBackContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  errorMessage: {
    color: "#fff",
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 200,
    marginTop: 50,
  },
  username: {
    color: "#fff",
    fontSize: 24,
    marginTop: 20,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  bio: {
    color: "#fff",
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  followContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  followText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
    backgroundColor: "#161B22",
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 10,
  },
  info: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  logout: {
    color: "#FF6A6A",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  }
});

export default ProfileScreen;
