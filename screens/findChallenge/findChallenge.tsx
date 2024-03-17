import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../assets/color/color";
import { fontStyle } from "../../assets/font/font";
import { RenderItemComponent } from "../../components/findChallenge/findChallenge/teamList";
import { ITeams } from "../../data/team/teamData";
import { fetchAllTeamData } from "../../data/team/teamDataHandler";
import { Commonstyles } from "../../uitll/defaultStyle";

type RootStackParamList = {
  FindChallenge: undefined;
  ChallengeDetail: { currentTeam: ITeams };
};

export function FindChallenge() {
  const [teamList, setTeamList] = useState([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchAllTeamData();
      if (data) setTeamList(data);
    };

    loadUserData();
  }, []);

  const renderItem: React.FC<{ item: ITeams }> = ({ item }) => (
    <RenderItemComponent
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
});
