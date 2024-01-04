import { View, ActivityIndicator } from 'react-native';

const Loader = () => {
  return (
    <View style={{flex: 1, backgroundColor: "#0E1117", justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#fff" />
    </View>
  )
}

export default Loader;