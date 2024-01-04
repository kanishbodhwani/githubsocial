import { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
    createBottomTabNavigator,
  } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import AuthContext from "./src/context/authContext";
import HomeScreen from "./screens/HomeScreen";
import { SCREENS } from "./src/constants/routes";
import ProfileScreen from "./screens/ProfileScreen";
import { RepoProvider } from "./src/context/repoContext";
import RepoScreen from "./screens/RepoScreen";
import { User } from "./src/types/User";
import FollowersScreen from "./screens/FollowersScreen";
import SearchScreen from "./screens/SearchScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const theme: any = {
    colors: {
        background: "transparent",
    },
};

const StackNavigator = ({ user, handleSignOut }: { user: User; handleSignOut: () => any }) => {
    const memoizedUser = useMemo(() => user, [user]);
  return (
    <NavigationContainer>
        {memoizedUser ? (
          <AuthContext.Provider value={{ user: memoizedUser }}>
            <RepoProvider>
              <Stack.Navigator
                  initialRouteName={SCREENS.HOME}
                  screenOptions={{ headerShown: false }}
              > 
                  <Stack.Screen
                    name={SCREENS.HOME}
                  >
                    {(props) => (
                      <HomeScreen
                        {...props}
                        user={memoizedUser}
                        handleSignOut={handleSignOut}
                      />
                    )}
                  </Stack.Screen>
                  <Stack.Screen
                    name={SCREENS.PROFILE}
                    component={ProfileScreen}
                    initialParams={{ user: memoizedUser }}
                  />
                  <Stack.Screen
                    name={SCREENS.REPO}
                    component={RepoScreen}
                    initialParams={{ username: memoizedUser.username }}
                  />
                  <Stack.Screen
                    name={SCREENS.FOLLOWERS}
                    component={FollowersScreen}
                    initialParams={{ username: memoizedUser.username }}
                  />
                  <Stack.Screen
                    name={SCREENS.SEARCH}
                    component={SearchScreen}
                  />
              </Stack.Navigator>
            </RepoProvider>
          </AuthContext.Provider>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
  );
};

// const TabNavigator = ({
//   user,
//   handleSignOut,
// }: {
//   user: any;
//   handleSignOut: () => any;
// }) => {
//   return (
//     <Tab.Navigator
//       tabBar={(props) => {
//         return (
//           <BottomTabBar {...props} style={{ backgroundColor: "#0E1117" }} />
//         );
//       }}
//       sceneContainerStyle={{ backgroundColor: "#0E1117" }}
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           width: "100%",
//           borderTopWidth: 0,
//           alignSelf: "center",
//           elevation: 0,
//           backgroundColor: "#0E1117",
//         },
//         tabBarShowLabel: false,
//         tabBarHideOnKeyboard: true,
//       }}
//       safeAreaInsets={{ top: 0, bottom: 0 }}
//       initialRouteName={SCREENS.HOME}
//     >
//       <Tab.Screen
//         name={SCREENS.HOME}
//         options={{
//           tabBarIcon: ({ focused }) =>
//             !focused ? (
//               <TouchableOpacity style={{
//                 backgroundColor: '#161B22',
//                 borderRadius: 50,
//                 padding: 10,
//                 marginBottom: 40,
//                 width: 60,
//                 height: 60,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//                 <Feather name="search" size={24} color="#fff" />
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity style={{
//                 backgroundColor: '#161B22',
//                 borderRadius: 50,
//                 padding: 10,
//                 marginBottom: 40,
//                 width: 50,
//                 height: 50,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//                 <Feather name="search" size={24} color="#fff" />
//               </TouchableOpacity>
//             ),
//         }}
//       >
//         {(props) => (
//           <HomeScreen {...props} user={user} handleSignOut={handleSignOut} />
//         )}
//       </Tab.Screen>
//       <Tab.Screen
//         name={SCREENS.SEARCH}
//         options={{
//           tabBarIcon: ({ focused }) =>
//             !focused ? (
//               null
//             ) : (
//               null
//             ),
//         }}
//       >
//         {(props) => (
//           <SearchScreen {...props} />
//         )}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// };

export default StackNavigator;
