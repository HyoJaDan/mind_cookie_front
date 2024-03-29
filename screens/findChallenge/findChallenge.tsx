import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilState } from "recoil";
import { fontStyle } from "../../assets/font/font";
import AddIcon from "../../assets/icon/plus.svg";
import { AddTeamModel } from "../../components/findChallenge/challengeDetail/addTeamModel";
import { TeamListComponent } from "../../components/findChallenge/findChallenge/teamList";
import {
  ITeams,
  RootStackParamList,
  everyTeamData,
} from "../../data/team/teamData";
import { fetchAllTeamData } from "../../data/team/teamDataHandler";
import { Commonstyles } from "../../uitll/defaultStyle";
export function FindChallenge() {
  const [teamList, setTeamList] = useRecoilState(everyTeamData);
  const [updateTrigger, setUpdateTrigger] = useState<number>(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchAllTeamData();
      if (data) setTeamList(data);
      setUpdateTrigger((prev) => prev + 1);
    };

    loadUserData();
  }, []);
  useEffect(() => {
    if (teamList) {
      // 현재 날짜를 기준으로 정렬
      const now = new Date().getTime();
      const sortedTeams = [...teamList].sort((a: ITeams, b: ITeams) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        if (dateA > now && dateB > now) {
          return dateA - dateB; // 둘 다 미래인 경우
        } else if (dateA < now && dateB < now) {
          return dateB - dateA; // 둘 다 과거인 경우, 역순으로 정렬
        } else {
          return dateA < now ? 1 : -1; // 한 개만 과거인 경우
        }
      });
      setTeamList(sortedTeams);
    }
  }, [updateTrigger]);

  const [modalContent, setModalContent] = useState<boolean>(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["80%"], []);
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
  const onAddPress = () => {
    setModalContent(true);
    bottomSheetModalRef.current?.present();
  };
  const handleClosePress = () => bottomSheetModalRef.current?.close();

  const renderItem: React.FC<{ item: ITeams }> = ({ item }) => (
    <TeamListComponent
      item={item}
      onPress={() =>
        navigation.navigate("ChallengeDetail", { currentTeam: item })
      }
    />
  );

  return (
    <SafeAreaView style={Commonstyles.rootContainer}>
      <View style={styles.Wrapper}>
        <Text style={fontStyle.BD20}>챌린지 찾기</Text>
      </View>
      <FlatList
        data={teamList}
        renderItem={renderItem}
        keyExtractor={(item) => item.teamName}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <AddIcon />
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        keyboardBehavior="interactive"
      >
        {modalContent === true && (
          <AddTeamModel
            handlePresentModalPress={handleClosePress}
            setTeamList={setTeamList}
            setUpdateTrigger={setUpdateTrigger}
          />
        )}
      </BottomSheetModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007bff", // 버튼 색상 설정
    width: 56, // 버튼 크기 설정
    height: 56,
    borderRadius: 28, // 버튼 둥글게 설정
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // 안드로이드용 그림자 효과
    shadowOpacity: 0.3, // iOS용 그림자 효과
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
