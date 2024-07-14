import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Today } from "../components/myRecord/Date";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDataInMyRecord, userId } from "../data/user/userData";

export default function MyRecordScreen() {
  const insets = useSafeAreaInsets();
  const id = useRecoilValue(userId);
  const [user, setUser] = useRecoilState(userDataInMyRecord);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.rootContainer, { paddingTop: insets.top }]}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            backgroundColor: Colors.backgroundColor,
            paddingVertical: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Today />
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    gap: 24,
    backgroundColor: Colors.backgroundColor,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
