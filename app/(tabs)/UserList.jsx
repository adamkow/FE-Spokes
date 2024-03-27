import { getAllUsers } from "@/api";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Users() {
  const [userList, setUserList] = useState([]);

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
