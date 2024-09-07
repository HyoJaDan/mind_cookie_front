import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import DatePicker from "../components/DatePicker";
import { todayStatusState } from "../data/todoList/todo";
import { memberData } from "../data/user/userData";

export default function MyRecordScreen() {
  const insets = useSafeAreaInsets();
  const [member, setMember] = useRecoilState(memberData);
  console.log("HELLO", member);
  const [todayStatus, setTodayStatus] = useRecoilState(todayStatusState);
  console.log(todayStatus, "FF");

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.rootContainer, { paddingTop: insets.top }]}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            backgroundColor: "white", //Colors.backgroundColor,
            paddingVertical: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          <DatePicker />
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    gap: 24,
    backgroundColor: "white", //Colors.backgroundColor,
  },
});
