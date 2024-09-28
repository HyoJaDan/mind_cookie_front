import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/color/color";
import { fontStyle } from "../../assets/font/font";
import { accordionStyle } from "./accordionStyle";
import { handlePresentModalPressType } from "./event";

interface ParticipantsProps {
  participants: string[];
  selectedParticipants: string[];
  handleSelection: (participant: string, type: string) => void;
  handlePresentModalPress: (type: handlePresentModalPressType) => void;
}

export const Participants: React.FC<ParticipantsProps> = ({
  participants,
  selectedParticipants,
  handleSelection,
  handlePresentModalPress,
}) => {
  return (
    <View style={accordionStyle.boxContainer}>
      <View
        style={{
          justifyContent: "space-around",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text>누구와 있었던 일인가요? </Text>
        <Text style={[fontStyle.SB10, { color: Colors.grayscale.gray800 }]}>
          *복수 선택 가능
        </Text>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={accordionStyle.participantContainer}
      >
        {participants.map((participant, index) => (
          <TouchableOpacity
            key={index}
            style={[
              accordionStyle.circle,
              selectedParticipants.includes(participant) && {
                backgroundColor: "#BAA9FF",
              },
            ]}
            onPress={() => handleSelection(participant, "참가자")}
          >
            <Text>{participant}</Text>
          </TouchableOpacity>
        ))}
        {/* + 버튼 */}
        <TouchableOpacity
          style={accordionStyle.circle}
          onPress={() => handlePresentModalPress("참가자")}
        >
          <Ionicons name="add" size={20} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
