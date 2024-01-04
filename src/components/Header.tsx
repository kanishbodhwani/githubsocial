import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { User } from '../types/User';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';

const Header = ({ navigation, user }: {navigation: any, user: User}) => {
  return (
    <View style={styles.navbar}>
        <Feather onPress={() => navigation.navigate("Search")} name="search" size={30} color="#fff" />
        <FontAwesome5 name="github" size={30} color="#fff" />
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Profile", {username: user?.username || ""})}>
          <Image style={{width: 30, height: 30, borderRadius: 12}} source={{uri: user.photoURL}} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    navbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        paddingHorizontal: 20,
        height: 60,
    },
})

export default Header;