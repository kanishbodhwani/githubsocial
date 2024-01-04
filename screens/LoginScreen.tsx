import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GithubAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase";
import { storeData } from "../src/utils/asyncStorage";  
import * as WebBrowser from "expo-web-browser";
import { saveSecure } from "../src/utils/secureStorage";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { NavigationProp } from "@react-navigation/native";
import { getTokenWithCode } from "../src/utils/getTokenWithCode";
import { FontAwesome5 } from '@expo/vector-icons';
import { User } from "../src/types/User";
import { getUserUsernameWithAccessToken } from "../src/services/userServices";
import TypeWriterEffect from 'react-native-typewriter-effect';
import { StatusBar } from "expo-status-bar";

WebBrowser.maybeCompleteAuthSession();

interface LoginScreenProps {
  navigation: NavigationProp<{}>;
}

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
      scopes: ["user", "identity"],
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  useEffect(() => {
    handleResponse();
  }, [response]);

  async function handleResponse() {
    try {
      if (!response || response.type !== "success") {
        return;
      }
  
      const { code } = response.params;
      if (!code) {
        console.error("Authorization code is missing in the response parameters.");
        return;
      }
      const { scope, token_type, access_token } = await getTokenWithCode(code);
      if (!access_token) {
        console.error("Failed to retrieve access token.");
        alert("Something went wrong");
        return;
      }
      await saveSecure("access_token", access_token);
      const credential = await GithubAuthProvider.credential(access_token);
      const data = await signInWithCredential(auth, credential);
  
      const username = await getUserUsernameWithAccessToken(access_token);
      if (!username) {
        console.error("Failed to retrieve GitHub username.");
        alert("Something went wrong");
        return;
      }
  
      const user: User = {
        displayName: data.user?.displayName || "",
        email: data.user?.email || "",
        photoURL: data.user?.photoURL || "",
        uid: data.user?.uid,
        providerId: data.user?.providerId,
        createdAt: data.user?.metadata.creationTime || "",
        lastLoginAt: data.user?.metadata.lastSignInTime || "",
        username: username,
      };
  
      await storeData("@user", user);
      navigation.navigate("Home" as never);
    } catch (error: any) {
      console.error("handleResponse error:", error.message);
      alert("An unexpected error occurred. Please try again.");
    }
  }

  const [fontsLoaded] = useFonts({
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_600SemiBold
  });

  if (!fontsLoaded || loading) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#0E1117"/>
      <View style={styles.inside}>
        <View>
          <TypeWriterEffect content="Hello 👋" minDelay={20} style={{
              color: "#fff", 
              fontSize: 18, 
              fontFamily: "Poppins_500Medium",
              textAlign: "center",
              marginLeft: 10,
              marginTop: 5,
            }}/>
          <TypeWriterEffect content="Welcome to GitSocial!" minDelay={20} style={{
              color: "#fff", 
              fontSize: 18, 
              fontFamily: "Poppins_500Medium",
              textAlign: "center",
              marginLeft: 10,
              marginTop: 5,
            }}/>
          <TouchableOpacity onPress={() => promptAsync()} activeOpacity={0.8} style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5 name="github" size={24} color="#fff" />
            <Text style={styles.text}></Text>
            <TypeWriterEffect content="Sign in with Github" style={{
              color: "#fff", 
              fontSize: 18, 
              fontFamily: "Poppins_500Medium",
              textAlign: "center",
              marginLeft: 10,
              marginTop: 5,
            }}/>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#0E1117",
    padding: 10,
  },
  inside: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#fff", 
    fontSize: 28, 
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  text: {
    color: "#fff", 
    fontSize: 18, 
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    marginLeft: 10,
    marginTop: 5,
  },
});
