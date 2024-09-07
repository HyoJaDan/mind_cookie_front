import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import DatePicker from "../components/DatePicker";
import State from "../components/state";
import { stateData } from "../data/state/stateData";
import { todoData } from "../data/todoList/todo";
import { memberData } from "../data/user/userData";

export default function MyRecordScreen() {
  const insets = useSafeAreaInsets();
  const [member, setMember] = useRecoilState(memberData);
  console.log("member", member);
  const [todo, setTodo] = useRecoilState(todoData);
  console.log("todo", todo);
  const [state, setState] = useRecoilState(stateData);
  console.log("state", state);
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.rootContainer, { paddingTop: insets.top }]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            backgroundColor: "#FCFCFC", //Colors.backgroundColor,
          }}
          showsVerticalScrollIndicator={false}
        >
          <DatePicker />
          <State />
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
