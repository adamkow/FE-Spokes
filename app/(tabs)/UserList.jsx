import { getAllUsers } from "@/api";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from "@/contexts/authContext";

export default function Users() {
  const [userList, setUserList] = useState([]);
  const {newUserId, setNewUserId} = useAuth()

  useEffect(() => {
    getAllUsers().then((users) => {
      setUserList(users);
    });
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      {userList.map((user) => {
        return <Text key={user.username}>{user.username}</Text>;
      })}
    </View>
  );
}
