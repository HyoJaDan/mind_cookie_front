import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors } from "../../assets/color/color";
import { fontStyle } from "../../assets/font/font";
import DecreaseIcon from "../../assets/icon/addTeam/decrease";
import IncreaseIcon from "../../assets/icon/addTeam/increase";
import MaintainIcon from "../../assets/icon/addTeam/maintain";
import LeftIcon from "../../assets/icon/left.svg";
import { RootStackParamList } from "../../data/team/teamData";
import { addDays, formatDate2 } from "../../uitll/dateConverter";
import { DefaultButton } from "../../uitll/defaultButton";
import { Commonstyles } from "../../uitll/defaultStyle";
import { randomID } from "../../uitll/generateID";

const typeIcons = {
  감량: DecreaseIcon,
  유지: MaintainIcon,
  증량: IncreaseIcon,
};
type ChallengeType = "감량" | "증량" | "유지";

export default function AddChallenge() {
  const [challengeName, setChallengeName] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const [challengeType, setChallengeType] = useState<ChallengeType>("감량");
  const handleTypeSelect = (type: ChallengeType) => {
    setChallengeType(type);
  };
  const pressHandler = async () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // 시간을 00:00:00.000으로 설정하여 오늘 날짜만 비교

    if (selectedDate < now) {
      // 선택된 날짜가 현재 날짜보다 이전인 경우 경고 메시지 표시
      Alert.alert(
        "날짜 선택 오류",
        "현재 선택하신 날짜에는 챌린지를 추가할 수가 없습니다"
      );
    } else {
      const challengeTypeMapping: { [key in ChallengeType]: string } = {
        감량: "reduce",
        증량: "increase",
        유지: "maintain",
      };
      const mappedChallengeType =
        challengeTypeMapping[challengeType as ChallengeType];

      const newTeam = {
        id: randomID(),
        teamName: challengeName,
        maxTeamMemberNumber: 5,
        startDate: selectedDate,
        endDate: addDays(selectedDate, 35),
        challngeType: mappedChallengeType,
        numOfMember: 1,
      };
      navigation.navigate("ChallengeDetail", { currentTeam: newTeam });
    }
  };
  return (
    <SafeAreaView style={Commonstyles.rootContainer}>
      <View style={styles.Wrapper}>
        <View style={styles.SpaceBetween}>
          <View style={Commonstyles.flexRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <LeftIcon />
            </TouchableOpacity>
            <Text style={[fontStyle.BD24, { color: Colors.grayscale.gray900 }]}>
              챌린지 만들기
            </Text>
          </View>
          <View style={styles.headerGap}>
            <Text style={[fontStyle.BD15, { color: Colors.basic.text_light }]}>
              챌린지 이름
            </Text>
            <View style={styles.goalInputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setChallengeName}
                value={challengeName}
                placeholder="챌린지 이름을 입력해주세요"
              />
            </View>
          </View>
          <View style={styles.headerGap}>
            <View style={Commonstyles.flexRow}>
              <Text
                style={[fontStyle.BD15, { color: Colors.basic.text_light }]}
              >
                시작예정일
              </Text>
              <Text
                style={[fontStyle.RG12, { color: Colors.basic.text_light }]}
              >
                *첼린지는 35일 동안 지속됩니다.
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.goalInputContainer]}
              onPress={showDatePicker}
            >
              <View style={styles.input}>
                <Text
                  style={[
                    fontStyle.MD14,
                    { color: Colors.basic.text_extralight },
                  ]}
                >
                  {formatDate2(selectedDate) +
                    "~" +
                    formatDate2(addDays(selectedDate, 35))}
                </Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={styles.headerGap}>
            <Text style={[fontStyle.BD15, { color: Colors.basic.text_light }]}>
              종류
            </Text>
            <View style={styles.typeContainer}>
              {Object.entries(typeIcons).map(([type, IconComponent]) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    challengeType === type && styles.selectedTypeButton,
                  ]}
                  onPress={() => handleTypeSelect(type)}
                >
                  <IconComponent
                    fill={challengeType === type ? "#4F81FF" : "#DDDAD7"}
                  />
                  <Text>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <DefaultButton pressHandler={pressHandler} text="팀 만들기" />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 26,

    flex: 1,
    justifyContent: "space-between",
  },
  goalInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.grayscale.gray300,
    borderRadius: 8,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8,
    marginBottom: 20,
  },
  typeButton: {
    display: "flex",
    flexDirection: "row",
    height: 48,
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.grayscale.gray300,
    backgroundColor: Colors.basic.white,
  },
  selectedTypeButton: {
    backgroundColor: Colors.primary.primary100,
    borderColor: Colors.primary.primary,
  },
  headerGap: {
    gap: 8,
  },
  SpaceBetween: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 40,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
});
