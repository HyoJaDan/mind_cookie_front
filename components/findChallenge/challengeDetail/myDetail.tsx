import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SetterOrUpdater } from "recoil";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import { IUserInProfile } from "../../../data/user/userData";
import { fetchUserDataInProfile } from "../../../data/user/userDataHandler";
import { GoalItem } from "../../../screens/findChallenge/ChallengeDetail";
import { Commonstyles } from "../../../uitll/defaultStyle";
import { AddGoalModal } from "./addGoalModal";
import { AddProfileModal } from "./addProfileModal";

interface IProps {
  id: number;
  user: IUserInProfile;
  setUser: SetterOrUpdater<IUserInProfile>;
  goals: GoalItem[];
  setGoals: React.Dispatch<React.SetStateAction<GoalItem[]>>;
}
export default function MyDetail({
  id,
  user,
  setUser,
  goals,
  setGoals,
}: IProps) {
  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserDataInProfile(id as number);
      if (data) setUser(data);
    };

    loadUserData();
  }, []);

  const [modalContent, setModalContent] = useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["70%"], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

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
  // 내 프로필 변경 버튼을 누를 때 실행될 핸들러
  const handlePresentProfileModalPress = useCallback(() => {
    setModalContent("profile");
    bottomSheetModalRef.current?.present();
  }, []);

  // 내 목표 변경 버튼을 누를 때 실행될 핸들러
  const handlePresentGoalsModalPress = useCallback(() => {
    setModalContent("goals");
    bottomSheetModalRef.current?.present();
  }, []);
  const handleClosePress = () => bottomSheetModalRef.current?.close();

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
              {user.userName}
            </Text>
          </View>
          <TouchableOpacity onPress={handlePresentProfileModalPress}>
            <Text
              style={[fontStyle.MD16, { color: Colors.basic.text_extralight }]}
            >
              변경
            </Text>
          </TouchableOpacity>
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
          <TouchableOpacity onPress={handlePresentGoalsModalPress}>
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
        {modalContent === "goals" && (
          <AddGoalModal
            handlePresentModalPress={handleClosePress}
            goals={goals}
            setGoals={setGoals}
          />
        )}
        {modalContent === "profile" && (
          <AddProfileModal
            handlePresentModalPress={handleClosePress}
            user={user}
            setName={setUser}
            // ProfileChangeModal에 전달할 추가적인 프롭스
          />
        )}
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
