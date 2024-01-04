import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getUserFollowers } from '../src/services/userServices';
import Follower from '../src/components/Follower';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from "@expo/vector-icons";

const FollowersScreen = ({navigation, route}: {navigation: any, route: any}) => {
  const {username} = route.params;
  const [followers, setFollowers] = useState<any>([]);

  useEffect(() => {
    (async() => {
      const followers = await getUserFollowers(username);
      setFollowers(followers);
    })()
  }, []);

  if(!followers) return null;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", width: '100%', marginBottom: 5 }}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="#E1E1E2"
          onPress={() => navigation.goBack()}
        />
        <Text style={{color: "#fff", fontSize: 22, fontFamily: "Poppins_600SemiBold", paddingHorizontal: 20, marginTop: 2}}>
          {username}'s
          Followers
        </Text>
      </View>
      <FlatList
        style={{width: "100%"}}
        data={followers}
        renderItem={({item}) => <Follower navigation={navigation} item={item}/>}
        keyExtractor={(item) => item.id}
      />      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#0E1117",
    // alignItems: "center",
  }
})

export default FollowersScreen;