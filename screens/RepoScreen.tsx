import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  getUserRepoDetails,
  getUserRepoReadme,
} from "../src/services/repoServices";
import { User } from "../src/types/User";
import HTML from "react-native-render-html";
import { getData } from "../src/utils/asyncStorage";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../src/components/Loader";

const RepoScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { repo } = route.params as { username: string; repo: string };

  const  [poppins] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [repoDetails, setRepoDetails] = useState<any>();
  const [readme, setReadme] = useState<any>();
  const [htmlReadme, setHtmlReadme] = useState<any>();

  async function getUser() {
    const user = await getData("@user");
    return user;
  }

  useEffect(() => {
    (async () => {
      const user: User = await getUser();
      const repoDetails = await getUserRepoDetails(user.username, repo);
      const readme = await getUserRepoReadme(
        user.username,
        repoDetails.name,
        repoDetails.default_branch
      );
      if (!readme) {
        setReadme("No README.md file found");
      }
      setRepoDetails(repoDetails);
      setReadme(readme);

      const isHTML = /<[a-z][\s\S]*>/i.test(readme);
      if (!isHTML) {
        const b = `<div style="width: 100%; padding: 10px; margin: 0;">
            <pre style="width: 100%; white-space: pre-wrap; word-wrap: break-word; font-family: Arial, sans-serif; font-size: 18px; user-scalable: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; margin: 0;">${readme.trim()}</pre>
          </div>`;
        setHtmlReadme(b);
      } else {
        setHtmlReadme(readme);
      }
    })();
  }, []);

  if (!poppins || !repoDetails) return <Loader />;
  return (
    <SafeAreaView style={styles.repo}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="#E1E1E2"
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: "#E1E1E2",
            fontSize: 20,
            fontFamily: "Poppins_600SemiBold",
            marginLeft: 10,
            marginTop: 5,
          }}
        >
          {repo}
        </Text>
      </View>
      <ScrollView>
        <Text style={styles.repo_des}>{repoDetails.description}</Text>
        <Text style={styles.repo_lang}>{repoDetails.language}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.repo_stars}>
            <AntDesign name="staro" size={24} color="#E1E1E2" />
            <Text style={{ marginLeft: 20 }}>
              {" "}
              {repoDetails.stargazers_count}{" "}
            </Text>
          </Text>
          <Text style={styles.repo_forks}>
            <FontAwesome name="code-fork" size={24} color="#E1E1E2" />
            <Text style={{ marginLeft: 20 }}> {repoDetails.forks_count} </Text>
          </Text>
        </View>
        <View style={styles.repo_readme}>
          {/* <Text style={styles.repo_readme_text}>{readme}</Text> */}
          <HTML
            defaultTextProps={{
              style: {
                color: "#E1E1E2",
                fontFamily: "Poppins_400Regular",
              },
            }}
            contentWidth={100}
            source={{ html: htmlReadme }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  repo: {
    padding: 20,
    backgroundColor: "#161B22",
    width: "100%",
    height: "100%",
  },
  repo_name: {
    color: "#E1E1E2",
    fontSize: 24,
    marginTop: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  repo_des: {
    color: "#E1E1E2",
    fontSize: 18,
    marginTop: 20,
    fontFamily: "Poppins_500Medium",
  },
  repo_lang: {
    color: "#E1E1E2",
    fontSize: 14,
    marginTop: 20,
    marginRight: 10,
    fontFamily: "Poppins_400Regular",
    backgroundColor: "#0E1117",
    padding: 7,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  repo_stars: {
    color: "#E1E1E2",
    fontSize: 18,
    marginTop: 20,
    marginRight: 10,
    fontFamily: "Poppins_400Regular",
  },
  repo_forks: {
    color: "#E1E1E2",
    fontSize: 18,
    marginTop: 20,
    marginRight: 10,
    fontFamily: "Poppins_400Regular",
  },
  repo_readme: {
    backgroundColor: "#0E1117",
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
    color: "#E1E1E2",
  },
});

export default RepoScreen;
