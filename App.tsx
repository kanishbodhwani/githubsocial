import StackNavigator from "./StackNavigator";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getData, storeData } from "./src/utils/asyncStorage";
import {signOut} from "firebase/auth";
import { User } from "./src/types/User";
import { removeData } from "./src/utils/asyncStorage";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user as unknown as User);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    (async() => {
      const storedUser = await getData('@user');
      console.log(storedUser);
      if (storedUser) {
        setUser(storedUser);
      }
      setLoading(false);
    })(); 
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) return null;
  return <StackNavigator user={user as User} handleSignOut={handleSignOut} />;
}