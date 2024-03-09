import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/color/color";
import { fontStyle } from "../../assets/font/font";
import { Commonstyles } from "../../uitl/defaultStyle";
import { generateID } from "../../uitl/generateID";
import { AddGoalModal } from "./addGoalModal";

export interface GoalItem {
  id: string;
  value: string;
}
export default function MyDetail() {
  const [goals, setGoals] = useState<GoalItem[]>([
    { id: generateID(), value: "식단 기록" },
    { id: generateID(), value: "운동 기록" },
  ]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["70%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const handleClosePress = () => bottomSheetModalRef.current?.close();
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0} // 이거 추가
        disappearsOnIndex={-1} // 이거 추가
      />
    ),
    []
  );
  return (
    <View style={styles.Wrapper}>
      <View style={styles.boxWrapper}>
        <Text style={[fontStyle.SB12, { color: Colors.basic.text_extralight }]}>
          내 프로필
        </Text>
        <View style={Commonstyles.SpaceBetween}>
          <View style={Commonstyles.flexGap}>
            <View style={styles.Circle} />
            <Text style={[fontStyle.RG14, { color: Colors.basic.text_light }]}>
              userName
            </Text>
          </View>
          <Text
            onPress={handlePresentModalPress}
            style={[fontStyle.MD16, { color: Colors.basic.text_extralight }]}
          >
            변경
          </Text>
        </View>
      </View>
      <View style={Commonstyles.line} />
      <View style={styles.boxWrapper}>
        <Text style={[fontStyle.SB12, { color: Colors.basic.text_extralight }]}>
          내 목표
        </Text>
        <View style={Commonstyles.SpaceBetweenAndAlignTop}>
          <View>
            {goals.length > 0 ? (
              goals.map((goal) => (
                <View key={goal.id} style={styles.goalItem}>
                  <Text
                    style={[fontStyle.MD14, { color: Colors.basic.text_light }]}
                  >
                    {goal.value}
                  </Text>
                </View>
              ))
            ) : (
              <Text
                style={[fontStyle.MD14, { color: Colors.basic.text_light }]}
              >
                목표 없음
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={handlePresentModalPress}>
            <Text
              style={[fontStyle.MD16, { color: Colors.basic.text_extralight }]}
            >
              변경
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={Commonstyles.line} />
      <View>
        <Text style={[fontStyle.RG12, styles.Text]}>
          한번 참가하면 챌린지를 다시 선택 할 수 없으니 신중하게 선택 후
          참가해주세요
        </Text>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        keyboardBehavior="interactive"
      >
        <AddGoalModal
          handlePresentModalPress={handleClosePress}
          goals={goals}
          setGoals={setGoals}
        />
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: 16,

    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.basic.bachground,
  },
  boxWrapper: {
    gap: 10,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    gap: 8,
  },
  Circle: {
    borderRadius: 48,
    backgroundColor: Colors.grayscale.gray400,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  goalItem: {
    marginTop: 2,
  },
  Text: {
    color: Colors.basic.text_light,
    textAlign: "center",
    marginHorizontal: 45,
  },
});
