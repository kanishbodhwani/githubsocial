import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

const Follower = ({navigation, item }: { navigation: any, item: any }) => {
  const [poppins] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!poppins) return null;
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profile", {username: item.login})} style={styles.container}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 50 }}
        source={{ uri: item.avatar_url }}
      />
      <Text style={styles.text}>{item.login}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
    backgroundColor: "#161B22",
    marginBottom: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  text: {
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
    fontSize: 16,
    marginLeft: 30,
    marginTop: 10,
  },
});

export default Follower;
