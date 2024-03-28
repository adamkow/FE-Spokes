import { Text, View } from "react-native";
import '../global.css';
import { ActivityIndicator } from "react-native-paper";

export default function StartPage() {
  return (
    <View className="flex-1 items-center bg-white justify-center">
      <ActivityIndicator size="large" color="gray" />
    </View>
  )
}
